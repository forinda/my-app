import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layouts/default-layout.vue'),
      children: [
        {
          path: '',
          name: 'index-page',
          component: () => import('@/views/index-page.vue'),
        },
      ],
    },
    {
      path: '/organizations',
      name: 'organizations',
      component: () => import('@/layouts/org-layout.vue'),
      children: [
        {
          path: '',
          name: 'organizations-list',
          component: () => import('@/views/org/index-organizations.vue'),
        },
      ],
    },
    {
      path: '/organizations/:id',
      name: 'organization-id-layout',
      component: () => import('@/layouts/single-org-layout.vue'),
      children: [
        {
          path: '',
          name: 'organization-id',
          component: () => import('@/views/org/single-organization-id.vue'),
        },
        {
          path: 'settings',
          name: 'organization-settings',
          component: () => import('@/views/org/organizations-id-settings.vue'),
        },
        {
          path: 'members',
          name: 'organization-members',
          component: () => import('@/views/org/organizations-id-members.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('@/layouts/empty-layout.vue'),
      children: [
        {
          name: 'auth-login',
          path: 'login',
          component: () =>
            import(/* webpackChunkName: "auth-login" */ '@/views/auth/auth-login.vue'),
        },
        {
          name: 'auth-register',
          path: 'register',
          component: () =>
            import(/* webpackChunkName: "auth-register" */ '@/views/auth/auth-register.vue'),
        },
      ],
    },
  ],
})

export default router
