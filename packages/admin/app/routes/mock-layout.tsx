import React from 'react';
import { Outlet } from 'react-router';
import { css } from 'styled-system/css';
import MockDashboardContent from '~/components/mock/mock-dashboard-content';
import MockDashboardSidebar from '~/components/mock/mock-dashboard-sidebar';
import { MockSidebarProvider, useMockSidebar } from '~/hooks/use-mock-sidebar';

export default function mockLayout() {
  return (
    <MockSidebarProvider>
      <div>
        <MockDashboardSidebar />
        <MockDashboardContent />
      </div>
    </MockSidebarProvider>
  );
}
