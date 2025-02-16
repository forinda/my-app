import { useAuthStore } from '@/stores/auth-store'
import type { RouteMetaType } from '@/types/session'
import type {
  NavigationFailure,
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import {storeToRefs} from "pinia";

export function routeAfterEach(
  _to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedLoadedGeneric,
  failure: void | NavigationFailure | undefined,
) {
  // console.log('[router.afterEach]')
  if (failure) {
    console.error(`[router.afterEach:[${_to.fullPath}]] ${failure}`)
  }
}

export async function routeBeforeEach(
  to: RouteLocationNormalizedGeneric,
  _from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  const { requiresAuth } = to.meta as RouteMetaType
  const auth = useAuthStore()
  const {isAuthenticated } = storeToRefs(auth)
  await auth.getSession()

  if (requiresAuth && !isAuthenticated.value) {
    return next({ name: 'auth-login' })
  }
  next()
}
