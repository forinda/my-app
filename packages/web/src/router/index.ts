import SuspenseLayout from '@/layouts/suspense-layout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routeAfterEach, routeBeforeEach } from './before-and-after-each'
import OrgLayout from '@/layouts/org-layout.vue'
import SingleOrgLayout from '@/layouts/single-org-layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'base',
      component: SuspenseLayout,
      children: [
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
          component: OrgLayout,
          children: [
            {
              path: '',
              name: 'organizations-list',
              meta: { title: 'Organizations', requiresAuth: true },
              component: () => import('@/views/org/index-organizations.vue'),
            },
          ],
        },
        {
          path: '/organizations/:id',
          name: 'organization-id-layout',
          component: SingleOrgLayout,
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
            {
              name: 'organization-not-found',
              path: ':pathMatch(.*)*',
              component: () => import('@/views/org/org-not-found.vue'),
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
            {
              name: 'auth-logout',
              path: 'logout',
              component: () =>
                import(/* webpackChunkName: "auth-logout" */ '@/views/auth/auth-logout.vue'),
            },
          ],
        },
      ],
    },
  ],
})

router.beforeEach(routeBeforeEach)
router.afterEach(routeAfterEach)

export default router
