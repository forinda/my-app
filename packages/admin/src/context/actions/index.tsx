import { authActions } from "./auth-actions";
import { themeActions } from "./theme-actions";

export const appActions = { ...authActions, ...themeActions };
