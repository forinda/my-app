import type { SessionUserType } from "~/types/session";

export const useAuthUser = () => {
    const user = useState<SessionUserType | null>("auth:user", () => null);
    const setUser = (newUser: SessionUserType | null) => {
        user.value = newUser;
    };
    return { user, setUser };
};
