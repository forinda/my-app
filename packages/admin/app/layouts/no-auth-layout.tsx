import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '~/hooks/use-auth';

export default function NoAuthLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const queryParams = new URLSearchParams(useLocation().search);
  const redirect = queryParams.get('redirect');
  useEffect(() => {
    if (isAuthenticated) {
      if (redirect) {
        navigate(decodeURIComponent(redirect));
      } else {
        navigate('/mock-dashboard');
      }
    }
  }, [isAuthenticated]);

  return <Outlet />;
}
