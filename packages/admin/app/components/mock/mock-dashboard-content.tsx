import { Outlet } from 'react-router';
import { css } from 'styled-system/css';
import { useMockSidebar } from '~/hooks/use-mock-sidebar';
import MockDashboardHeader from './mock-dashboard-header';

export default function MockDashboardContent() {
  const { isCollapsed, isMobile, sidebarWidthSizes } = useMockSidebar();
  const { contentLeft } = sidebarWidthSizes(isCollapsed);
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        ml: isCollapsed ? 20 : 64,
        transition: 'margin-left 0.3s ease-in-out',
      })}
    >
      <MockDashboardHeader />
      <Outlet />
    </div>
  );
}
