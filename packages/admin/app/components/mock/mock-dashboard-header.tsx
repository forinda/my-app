import { css } from 'styled-system/css';
import { Menu } from '../ui/menu';
import DashboardHeaderNotification from './dashboard-header-notification';
import DashboardHeaderUserProfile from './dashboard-header-user-profile';
import DashboardHeaderDarkmodeToggle from './dashboard-header-darkmode-toggle';
import { useMockSidebar } from '~/hooks/use-mock-sidebar';
import { Icon } from '@iconify/react';
import { Text } from '../ui/text';
import { Button } from '../ui/button';
export default function MockDashboardHeader() {
  const { toggleSidebar, isCollapsed, sidebarWidthSizes } = useMockSidebar();
  const { contentLeft } = sidebarWidthSizes(isCollapsed);
  return (
    <div
      className={css({
        p: 4,
        backgroundColor: 'var(--primary-color)',
        color: 'var(--light-color)',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeft: '1px solid var(--light-color)',
        zIndex: '60000',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
        })}
      >
        <div className={css({ display: 'flex', alignItems: 'center' })}>
          <Button
            onClick={toggleSidebar}
            className={css({
              background: 'none',
              border: 'none',
              color: 'var(--light-color)',
              cursor: 'pointer',
              fontSize: '1.5rem',
            })}
          >
            <Icon icon={'tabler:layout-sidebar-right-collapse'} />
          </Button>
        </div>

        <Text as={'span'}>Dashboard</Text>
      </div>
      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <DashboardHeaderDarkmodeToggle />
        <DashboardHeaderNotification />
        <DashboardHeaderUserProfile />
      </div>
    </div>
  );
}
