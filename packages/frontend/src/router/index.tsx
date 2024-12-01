/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LoginPage = lazy(() => import('@/pages/login-page'));
const Homepage = lazy(() => import('@/pages/homepage'));
const RegisterPage = lazy(() => import('@/pages/register-page'));
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
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
]);
