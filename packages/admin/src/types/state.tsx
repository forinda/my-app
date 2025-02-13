import { appActions } from '@/context/actions';
import { authActions } from '@/context/actions/auth-actions';
import { themeActions } from '@/context/actions/theme-actions';

export type AuthActions = ReturnType<
  (typeof authActions)[keyof typeof authActions]
>;
export type ThemeActions = ReturnType<
  (typeof themeActions)[keyof typeof themeActions]
>;

export type AppActions = AuthActions | ThemeActions;
export type GenderType = 'Male' | 'Female' | 'Other';
export type AuthUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: GenderType;
  username: string;
  is_active: boolean;
  needs_to_reset_password: boolean;
  last_password_reset_at: string;
};

export type ThemeState = 'light' | 'dark' | 'system';
export type AuthState = {
  user: AuthUser | null;
  access_token: string;
  refresh_token: string;
  is_authenticated: boolean;
  session_id?: number;
};

export type AppState = {
  theme: ThemeState;
  auth: AuthState;
};

export type AuthThemeContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppActions> | null;
  actions: typeof appActions;
};
