import { useCallback, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '~/hooks/use-auth';

export default function AuthLayout() {
  const { isAuthenticated, getSession } = useAuth();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  useEffect(() => {
    if (!isAuthenticated) {
      const encodedPath = encodeURIComponent(currentPath);
      navigate(`/auth/login?redirect=${encodedPath}`);
      // navigate('/auth/login');
    }
  }, [isAuthenticated]);

  return <Outlet />;
}
