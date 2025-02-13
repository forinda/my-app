import { ThemeState } from "@/types/state";

export const themeActions = {
    changeTheme: (theme: ThemeState) =>
      ({
        type: 'CHANGE_THEME',
        payload: theme,
      }) as const,
    initializeTheme: (state: ThemeState = 'system') =>
      ({
        type: 'INITIALIZE_THEME',
        payload: state,
      }) as const,
  };
  