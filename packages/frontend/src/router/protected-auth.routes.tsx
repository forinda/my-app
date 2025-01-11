/* eslint-disable react-refresh/only-export-components */
import DashboardLayout from '@/layout/dashboard-layout';
import ProtectedLayout from '@/layout/protected-layout';
import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

const LogoutPage =lazy(() => import('@/pages/logout-page'));
const DashboardPage =lazy(() => import('@/pages/dashboard/dashboard'));
const NotFoundPage =lazy(() => import('@/pages/errors/not-found-page'));

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
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: '/dashboard',
          element: <DashboardPage />,
        },
        {
          path:"*",
          element:<NotFoundPage/>
        }
      ],
    },


  ],
};
