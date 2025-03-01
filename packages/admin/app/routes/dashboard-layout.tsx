import React from 'react';
import { Outlet } from 'react-router';
import { css } from 'styled-system/css';
import { DashboardHeader } from '~/components/dashboard/dashboard-header';
import { DashboardSidebar } from '~/components/dashboard/dashboard-sidebar';
import { SidebarProvider } from '~/providers/sidebar-context';

export default function dashboarLayout() {
  return (
    <SidebarProvider>
      <div className={css({ display: 'flex', minHeight: '100vh' })}>
        <DashboardSidebar />
        <main
          className={css({ flex: 1, display: 'flex', flexDirection: 'column' })}
        >
          <DashboardHeader />
          <div className={css({ p: 4, flex: 1 })}>
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
