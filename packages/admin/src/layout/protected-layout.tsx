import useAuth from '@/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  const { state, should_reset_password } = useAuth();
  const { is_authenticated } = state.auth;
  return (
    // If the user is not authenticated, redirect them to the login page
    <>
      {is_authenticated && !should_reset_password ? (
        <Outlet />
      ) : is_authenticated && should_reset_password ? (
        <Navigate to="/reset-password" />
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
}
