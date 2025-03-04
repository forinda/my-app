import { useMemo, useState } from 'react';
import { useAxios } from './use-axios';
import type { LoginUserSchemaType } from '~/lib/schema/login-schema';
import { decodeArrayBuffer } from '~/lib/utils/decode-array-buffer';
import type { ResponseObject } from '~/lib/types';
import type { SessionUserType } from '~/lib/types/session';
import { extractAxiosError } from '~/lib/utils/extract-axios-error';

export const useAuth = () => {
  const [user, setUser] = useState<SessionUserType | null>(null);
  const isAuthenticated = useMemo(() => user !== null, [user]);

  const axios = useAxios();

  type CallbackOptions<Data = unknown, Err = Error> = {
    onSuccess?: (data: Data) => void | Promise<void>;
    onError?: (error: string) => void | Promise<void>;
  };
  const loginUser = async (
    values: LoginUserSchemaType,
    options: CallbackOptions<any> = {},
  ) => {
    try {
      const { data } = await axios.post<ArrayBuffer>('/auth/login', values, {
        // responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const decodedData =
        decodeArrayBuffer<ResponseObject<SessionUserType>>(data);
      // setUser(decodedData.data)

      if (options.onSuccess && typeof options.onSuccess === 'function') {
        await options.onSuccess(decodedData);
      }
      return;
    } catch (error: any) {
      // console.log(error)

      if (options.onError && typeof options.onError === 'function') {
        await options.onError(extractAxiosError(error)!);
      }
    }
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
  };

  const getSession = async (flush = false) => {
    if (user && !flush) return;
    try {
      const resp = await axios.get<ArrayBuffer>('/auth/session', {
        method: 'GET',
        responseType: 'arraybuffer',
      });
      setUser(
        decodeArrayBuffer<ResponseObject<SessionUserType>>(resp.data).data,
      );
    } catch (_error: unknown) {
      setUser(null);
      // console.log({ error })

      // await router.push({ name: 'auth-logout' })
    }
  };

  const setUserCurrentOrganization = async (
    organizationId: string,
    options?: CallbackOptions,
  ) => {
    try {
      const feed = await axios.post('/auth/set-org', {
        organization_id: organizationId,
      });
      if (options!.onSuccess && typeof options!.onSuccess === 'function') {
        await options!.onSuccess(feed);
      }
    } catch (error: unknown) {
      if (options!.onError && typeof options!.onError === 'function') {
        await options!.onError(extractAxiosError(error)!);
      }
    }
  };

  return {
    user,
    setUser,
    isAuthenticated,
    loginUser,
    logout,
    getSession,
    setUserCurrentOrganization,
  };
};
