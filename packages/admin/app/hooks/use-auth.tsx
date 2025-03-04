import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useAxios } from './use-axios';
import type { LoginUserSchemaType } from '~/lib/schema/login-schema';
import { decodeArrayBuffer } from '~/lib/utils/decode-array-buffer';
import type { ResponseObject } from '~/lib/types';
import type { SessionUserType } from '~/lib/types/session';
import { extractAxiosError } from '~/lib/utils/extract-axios-error';
import { useLocation } from 'react-router';

type CallbackOptions<Data = unknown> = {
  onSuccess?: (data: Data) => void | Promise<void>;
  onError?: (error: string) => void | Promise<void>;
};

// Define the context type
interface AuthContextType {
  user: SessionUserType | null;
  isAuthenticated: boolean;
  loginUser: (
    values: LoginUserSchemaType,
    options?: CallbackOptions
  ) => Promise<void>;
  logout: () => Promise<void>;
  getSession: (flush?: boolean) => Promise<void>;
  setUserCurrentOrganization: (
    organizationId: string,
    options?: CallbackOptions
  ) => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUserType | null>(null);
  const axios = useAxios();
  const location = useLocation();

  const isAuthenticated = useMemo(() => user !== null, [user]);

  // Fetch session details
  const getSession = useCallback(
    async (flush = false) => {
      if (user && !flush) return;
      try {
        const resp = await axios.get<ArrayBuffer>('/auth/session', {
          responseType: 'arraybuffer',
        });
        setUser(
          decodeArrayBuffer<ResponseObject<SessionUserType>>(resp.data).data
        );
      } catch {
        setUser(null);
      }
    },
    [user, axios]
  );

  // Login function
  const loginUser = async (
    values: LoginUserSchemaType,
    options?: CallbackOptions
  ) => {
    try {
      await axios.post<ArrayBuffer>('/auth/login', values, {
        headers: { 'Content-Type': 'application/json' },
      });
      await getSession(true);
    } catch (error) {
      options?.onError?.(extractAxiosError(error)!);
    }
  };

  // Logout function
  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
  };

  // Set user organization
  const setUserCurrentOrganization = async (
    organizationId: string,
    options?: CallbackOptions
  ) => {
    try {
      await axios.post('/auth/set-org', { organization_id: organizationId });
      options?.onSuccess?.(null);
    } catch (error) {
      options?.onError?.(extractAxiosError(error)!);
    }
  };

  // Fetch session on route change
  useEffect(() => {
    getSession();
  }, [location.pathname, getSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loginUser,
        logout,
        getSession,
        setUserCurrentOrganization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
