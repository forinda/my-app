import useAuth from '@/hooks/use-auth';
import { Link } from 'react-router-dom';
import MaxWidth from './max-width';

export default function Header() {
  const is_authenticated = useAuth().is_authenticated;
  return (
    <header className="flex border-b p-4 border-primary">
      <MaxWidth className="flex w-full justify-between gap-4">
        <div>
          <Link
            to="/"
            className="flex text-primary  items-center gap-2 font-bold"
          >
            <img src="/logo-512x512.png" alt="logo" className="h-8 rounded" />
            <span>Payroll System</span>
          </Link>
        </div>
        <div>
          {is_authenticated ? (
            <div>
              <Link to={'/auth/logout'}>Logout</Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to={'/auth/login'}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
              <Link to={'/auth/register'}>Register</Link>
            </div>
          )}
        </div>
      </MaxWidth>
    </header>
  );
}
