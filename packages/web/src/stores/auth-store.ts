import { useAxios } from '@/composables/use-axios'
import type { LoginUserSchemaType } from '@/schema/login-schema'
import type { SessionUserType } from '@/types/session'
import type { ResponseObject } from '@/types/utils'
import { decodeArrayBuffer } from '@/utils/resp-decode'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth:user', () => {
  const user = ref<SessionUserType | null>(null)
  const isAthenticated = computed(() => user.value !== null)
  const setUser = (newUser: SessionUserType | null) => {
    // console.warn('[useAuthUser] Setting user:', newUser)
    user.value = newUser
  }
  const axios = useAxios()

  type LoginOptions<Data = any, Err = Error> = {
    onSuccess?: (data: Data) => void
    onError?: (error: string) => void
  }
  const loginUser = async (values: LoginUserSchemaType, options: LoginOptions<any> = {}) => {
    try {
      const { data } = await axios.post<ArrayBuffer>('/auth/login', values, {
        // responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const decodedData = decodeArrayBuffer<ResponseObject<SessionUserType>>(data)
      // setUser(decodedData.data)

      if (options.onSuccess && typeof options.onSuccess === 'function') {
        options.onSuccess(decodedData)
      }
      return
    } catch (error: any) {
      console.log(error)

      if (options.onError && typeof options.onError === 'function') {
        options.onError(error?.response?.data?.message ?? error.message)
      }
    }
  }

  const logout = async () => {
    await axios.post('/auth/logout')
    setUser(null)
  }

  const getSession = async () => {
    if (user.value) return
    try {
      const resp = await axios.get<ArrayBuffer>('/auth/session', {
        method: 'GET',
        responseType: 'arraybuffer',
      })
      setUser(decodeArrayBuffer<ResponseObject<SessionUserType>>(resp.data).data)
    } catch (error: any) {
      setUser(null)
    }
  }

  return { user, setUser, isAthenticated, loginUser, logout, getSession }
})
