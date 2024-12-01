import { AuthState, AuthUser } from '@/types/state';

export const authActions = {
  login: (user: AuthUser, access_token: string, refresh_token: string) =>
    ({
      type: 'LOGIN',
      payload: { user, access_token, refresh_token },
    }) as const,
  logout: () => ({ type: 'LOGOUT' }) as const,
  refreshToken: (access_token: string, refresh_token: string) =>
    ({
      type: 'REFRESH_TOKEN',
      payload: { access_token, refresh_token },
    }) as const,
  initializeAuth: (state: AuthState | null) =>
    ({
      type: 'INITIALIZE_AUTH',
      payload: state,
    }) as const,
};
