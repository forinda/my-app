import './assets/main.css'

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'


import App from './App.vue'
import router from './router'
import { usePiniaStore } from './stores'

const app = createApp(App)

app.use(usePiniaStore(router))
app.use(router)

  app.use(VueQueryPlugin)

app.mount('#app')
