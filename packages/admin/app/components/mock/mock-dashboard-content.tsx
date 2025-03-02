import { Outlet } from 'react-router';
import { css } from 'styled-system/css';
import { useMockSidebar } from '~/hooks/use-mock-sidebar';
import MockDashboardHeader from './mock-dashboard-header';

export default function MockDashboardContent() {
  const { isCollapsed, isMobile } = useMockSidebar();
  return (
    <div
      className={
        css({
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          ml: isMobile ? 0 : 64,
          transition: 'margin-left 0.3s ease',
        }) + (isCollapsed ? ' collapsed' : '')
      }
    >
      <MockDashboardHeader />
      <Outlet />
    </div>
  );
}
