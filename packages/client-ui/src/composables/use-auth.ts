import type { ILoginFormData } from "~/lib/form-schema/login-form-schema";
import type {
    LoginResponseType,
    UserSessionResponseType,
} from "~/types/response";

export async function useAuth() {
    const { setUser, user } = useAuthUser();
    const {
        public: { API_URL },
    } = useRuntimeConfig();
    type LoginOptions<Data = any, Err = Error> = {
        onSuccess?: (data: Data) => void;
        onError?: (error: Err) => void;
    };
    const loginUser = async (
        values: ILoginFormData,
        options: LoginOptions<LoginResponseType> = {},
    ) => {
        try {
            const data = await $fetch<ArrayBuffer>(API_URL + "/auth/login", {
                method: "POST",
                body: JSON.stringify(values),
                responseType: "arrayBuffer",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const decodedData = decodeArrayBuffer<LoginResponseType>(data);
            setUser(decodedData.data.user);

            if (options.onSuccess && typeof options.onSuccess === "function") {
                options.onSuccess(decodedData);
            }
            return;
        } catch (error: any) {
            if (options.onError && typeof options.onError === "function") {
                options.onError(error.response._data);
            }
        }
    };

    const logout = async () => {
        await $fetch<{}>(API_URL + "/auth/logout", {
            method: "POST",
        });
        setUser(null);
    };

    const getSession = async () => {
        if (user.value) return;
        try {
            const data = await $fetch<ArrayBuffer>(API_URL + "/auth/session", {
                method: "GET",
                headers: useRequestHeaders(["cookie"]) as HeadersInit,
            });
            setUser(
                decodeArrayBuffer<UserSessionResponseType>(data).data as any,
            );
        } catch (error: any) {
            setUser(null);
        }
    };
    return { loginUser, logout, getSession, sessionUser: user };
}
