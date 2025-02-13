import DefaultLayout from '@/layouts/default-layout.vue'
import EmptyLayout from '@/layouts/empty-layout.vue'
import IndexPage from '@/views/IndexPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: IndexPage,
        },
      ],
    },
    // {
    //   path: '/auth',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    {
      path: '/auth',
      component: EmptyLayout,
      children: [
        {
          name: 'auth-login',
          path: 'login',
          component: () => import('@/views/AuthLogin.vue'),
        },
        {
          name: 'auth-register',
          path: 'register',
          component: () => import('@/views/AuthRegister.vue'),
        },
      ],
    },
  ],
})

export default router
