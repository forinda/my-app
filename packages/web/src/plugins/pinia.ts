import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import type { Router } from 'vue-router'

export function usePiniaStore(router: Router) {
  const pinia = createPinia()
  pinia.use(({ store }) => {
    store.router = markRaw(router)
  })
  return pinia
}
declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
  }
}
