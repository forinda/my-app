import { AuthActions, AuthState } from "@/types/state";

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload.user,
          access_token: action.payload.access_token,
          refresh_token: action.payload.refresh_token,
          is_authenticated: true,
        };
      case 'LOGOUT':
        return {
          user: null,
          access_token: '',
          refresh_token: '',
          is_authenticated: false,
        };
      case 'REFRESH_TOKEN':
        return {
          ...state,
          access_token: action.payload.access_token,
          refresh_token: action.payload.refresh_token,
        };

      case 'INITIALIZE_AUTH':
        return action.payload ?? state;
      default:
        return state;
    }
  };
