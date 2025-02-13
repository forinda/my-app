/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { openAuthRoutes } from './open-auth.routes';
import { protectedAuthRoutes } from './protected-auth.routes';


const Homepage = lazy(() => import('@/pages/homepage'));
const BaseErrorPage = lazy(() => import('@/pages/errors/base-error-page'));
const AppContextLayout = lazy(() => import('@/layout/context-layout'));
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContextLayout />,
    errorElement: <BaseErrorPage />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      openAuthRoutes,
      protectedAuthRoutes,
    ],
  },
]);
