import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '~/hooks/use-auth';

export default function NoAuthLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/mock-dashboard');
    }
  }, [isAuthenticated]);

  return <Outlet />;
}
