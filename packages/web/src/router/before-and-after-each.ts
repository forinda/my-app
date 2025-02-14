import { useAuthStore } from '@/stores/auth-store'
import type { RouteMetaType } from '@/types/session'
import type {
  NavigationFailure,
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'

export function routeAfterEach(
  _to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedLoadedGeneric,
  failure: void | NavigationFailure | undefined,
) {
  // console.log('[router.afterEach]')
  if (failure) {
    console.error(failure)
  }
}

export async function routeBeforeEach(
  to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  // console.log('[router.beforeEach] to:', to.path)
  const { requiresAuth } = to.meta as RouteMetaType
  const auth = useAuthStore()
  await auth.getSession()
  if (requiresAuth && !auth.isAthenticated) {
    return next({ name: 'auth-login' })
  }
  next()
}
