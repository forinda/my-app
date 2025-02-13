import useAuth from '@/hooks/use-auth';

export default function LogoutPage() {
  const auth = useAuth();
  auth.dispatch(auth.actions.logout());
  return <></>;
}
