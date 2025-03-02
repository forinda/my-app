import { css } from 'styled-system/css';
import { Menu } from '../ui/menu';
import DashboardHeaderNotification from './dashboard-header-notification';
import DashboardHeaderUserProfile from './dashboard-header-user-profile';
import React from 'react';
import { Switch } from '@ark-ui/react';
import { Icon } from '@iconify/react';
import DashboardHeaderDarkmodeToggle from './dashboard-header-darkmode-toggle';
export default function MockDashboardHeader() {
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
      })}
    >
      <div></div>
      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <DashboardHeaderDarkmodeToggle />
        <DashboardHeaderNotification />
        <DashboardHeaderUserProfile />
      </div>
    </div>
  );
}
