import { AuthThemeContextProvider } from '@/context/auth-theme-context';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Loading = React.lazy(() => import('@/components/loading'));

export default function AppContextLayout() {
  return (
    <React.Suspense fallback={<Loading />}>
      <AuthThemeContextProvider>
        <Outlet />
      </AuthThemeContextProvider>
    </React.Suspense>
  );
}
