import { useCallback, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '~/hooks/use-auth';

export default function AuthLayout() {
  const { isAuthenticated, getSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated]);

  return <Outlet />;
}
