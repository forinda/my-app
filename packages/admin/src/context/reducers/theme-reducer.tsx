import { ThemeActions, ThemeState } from '@/types/state';

export const themeReducer = (
  state: ThemeState,
  action: ThemeActions,
): ThemeState => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return action.payload;
    case 'INITIALIZE_THEME':
      return state ?? action.payload;
    default:
      return state;
  }
};
