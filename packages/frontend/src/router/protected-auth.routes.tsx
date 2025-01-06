import ProtectedLayout from '@/layout/protected-layout';
import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

const LogoutPage =lazy(() => import('@/pages/logout-page'));


export const protectedAuthRoutes: RouteObject = {
  path: '/',
  element: <ProtectedLayout />,
  children: [
    {
      path: '/auth',
      element: <Outlet />,
      children: [
        {
          path: '/auth/logout',
          element: <LogoutPage />,
        },
      ],
    },
  ],
};
