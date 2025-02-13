import type { SessionUserType } from '@/types/session'
import { ref } from 'vue'

export const useAuthUser = () => {
  const user = ref<SessionUserType | null>(null)

  const setUser = (newUser: SessionUserType | null) => {
    user.value = newUser
  }
  return { user, setUser }
}
