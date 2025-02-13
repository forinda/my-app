import DefaultLayout from '@/layouts/default-layout.vue'
import EmptyLayout from '@/layouts/empty-layout.vue'
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
          component: () => import('@/views/index-page.vue'),
        },
      ],
    },{
      path: '/organizations',
      name: 'organizations',
      component: () => import('@/layouts/org-layout.vue'),
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
          component: () => import('@/views/auth-login.vue'),
        },
        {
          name: 'auth-register',
          path: 'register',
          component: () => import('@/views/auth-register.vue'),
        },
      ],
    },
  ],
})

export default router
