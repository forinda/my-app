import useAuth from '@/hooks/use-auth'
import { Navigate, Outlet } from 'react-router-dom'

// type NonAuthLayoutProps = {
//   children: React.ReactNode
// }


export default function NonAuthLayout() {
  const is_authenticated = useAuth().is_authenticated
  return (
    <>
      {is_authenticated ? (
        <Navigate to="/" />
      ) : (
        <Outlet />
      )}
    </>
  )
}
