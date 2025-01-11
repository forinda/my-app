import {
  AppActions,
  AppState,
  AuthActions,
  AuthThemeContextType,
  ThemeActions,
  ThemeState,
} from '@/types/state';
import { createContext, useCallback, useEffect, useReducer } from 'react';
import { appActions } from './actions';
import { themeReducer } from './reducers/theme-reducer';
import { authReducer } from './reducers/auth-reducer';
import { secureStorage } from '@/utils/crypto';

const PERSISTED_AUTH_THEME_KEY = '_skY_00043_kl';
const initialAppState = {
  theme: 'system' as ThemeState,
  auth: {
    user: null,
    access_token: '',
    refresh_token: '',
    is_authenticated: false,
  },
};

const AuthThemeContext = createContext<AuthThemeContextType>({
  state: initialAppState,
  dispatch: null,
  actions: appActions,
});

type ProviderProps = {
  children: React.ReactNode;
};

const combinbedReducer = (
  { theme, auth }: AppState,
  action: AppActions,
): AppState => {
  return {
    theme: themeReducer(theme, action as ThemeActions),
    auth: authReducer(auth, action as AuthActions),
  };
};

const AuthThemeContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(combinbedReducer, initialAppState);

  const initializeState = useCallback(async () => {
    const initialState = await secureStorage.getItem(PERSISTED_AUTH_THEME_KEY);
    return ((initialState ? JSON.parse(initialState) : null) ||
      initialAppState) as AppState;
  }, []);

  useEffect(() => {
    initializeState().then((initialState) => {
      dispatch(appActions.initializeAuth(initialState.auth));
      dispatch(appActions.initializeTheme(initialState.theme));
    });
  }, [initializeState]);

  const syncState = useCallback(async () => {
    const stateToPersist = JSON.stringify(state);
    await secureStorage.setItem(PERSISTED_AUTH_THEME_KEY, stateToPersist);
  }, [state]);

  useEffect(() => {
    syncState();
  }, [state, syncState]);
// console.log({state});

  return (
    <AuthThemeContext.Provider value={{ state, dispatch, actions: appActions }}>
      {children}
    </AuthThemeContext.Provider>
  );
};

export { AuthThemeContextProvider, AuthThemeContext };
