/* eslint-disable react-refresh/only-export-components */
import NonAuthLayout from "@/layout/non-auth-layout";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import('@/pages/login-page'));
const RegisterPage = lazy(() => import('@/pages/register-page'));


export const openAuthRoutes: RouteObject = {
  path: '/auth',
  element: <NonAuthLayout />,
  children: [
    {
      path: '/auth/login',
      element: <LoginPage />,
    }, {
      path: '/auth/register',
      element: <RegisterPage />,
    }
  ],
  
}
