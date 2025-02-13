import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div>
        <DashboardSidebar />
        <div className='ml-64'>
            <DashboardHeader />
            <Outlet />
        </div>
    </div>
  )
}
