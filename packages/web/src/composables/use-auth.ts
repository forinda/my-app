import { decodeArrayBuffer } from '@/utils/resp-decode'
import axios from 'axios'
import { useAuthUser } from './use-user-auth'
import { API_URL } from '@/lib/constants/api'

export function useAuth() {
  const { setUser, user } = useAuthUser()

  type LoginOptions<Data = any, Err = Error> = {
    onSuccess?: (data: Data) => void
    onError?: (error: Err) => void
  }
  const loginUser = async (values: any, options: LoginOptions<any> = {}) => {
    try {
      const { data } = await axios.post<ArrayBuffer>(API_URL + '/auth/login', values, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const decodedData = decodeArrayBuffer<any>(data)
      setUser(decodedData.data.user)

      if (options.onSuccess && typeof options.onSuccess === 'function') {
        options.onSuccess(decodedData)
      }
      return
    } catch (error: any) {
      if (options.onError && typeof options.onError === 'function') {
        options.onError(error.response._data)
      }
    }
  }

  const logout = async () => {
    await axios.post(API_URL + '/auth/logout', {
      withCredentials: true,
    })
    setUser(null)
  }

  const getSession = async () => {
    if (user.value) return
    try {
      const resp = await axios.get<ArrayBuffer>(API_URL + '/auth/session', {
        method: 'GET',
        responseType: 'arraybuffer',
        withCredentials: true,
      })
      setUser(decodeArrayBuffer<any>(resp.data).data as any)
    } catch (error: any) {
      setUser(null)
    }
  }
  return { loginUser, logout, getSession, sessionUser: user }
}
