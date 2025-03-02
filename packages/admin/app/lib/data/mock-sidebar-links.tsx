export type MockSidebarLinkItem = {
  title: string;
  href: string;
  icon?: string;
  children?: MockSidebarLinkItem[];
};

export const mockSidebarLinks: MockSidebarLinkItem[] = [
  { title: 'Navigation', href: '#', icon: 'navigation' },
  {
    title: 'Dashboard',
    href: '/mock-dashboard',
    icon: 'uit:airplay',
    children: [
      { title: 'Dashboard', href: '/mock-dashboard' },
      { title: 'Analytics', href: '/mock-dashboard/mock-analytics' },
    ],
  },
  {
    title: 'Departments',
    href: '#',
    icon: 'uit:align-left',
    children: [
      { title: 'Engineering', href: '/mock-dashboard/departments/engineering' },
      { title: 'Marketing', href: '/mock-dashboard/departments/marketing' },
      {
        title: 'Sales',
        href: '/mock-dashboard/departments/sales',
        icon: 'game-icons:chart',
        children: [
          {
            title: 'Sales 1',
            href: '/mock-dashboard/departments/sales/sales-1',
          },
          {
            title: 'Sales 2',
            href: '/mock-dashboard/departments/sales/sales-2',
          },
          {
            title: 'Sales 3',
            href: '/mock-dashboard/departments/sales/sales-3',
          },
        ],
      },
      {
        title: 'H/R',
        href: '/mock-dashboard/departments/hr',
        icon: 'ph:users-four-thin',
        children: [
          {
            title: 'Engineering',
            href: '/mock-dashboard/departments/hr/engineering',
          },
          {
            title: 'Marketing',
            href: '/mock-dashboard/departments/hr/marketing',
          },
          { title: 'Sales', href: '/mock-dashboard/departments/hr/sales' },
          {
            title: 'Human Resources',
            href: '/mock-dashboard/departments/hr/hr',
          },
        ],
      },
    ],
  },
  {
    title: 'Workspaces',
    href: '#',
    icon: 'ion:cube-outline',
    children: [
      { title: 'Project Alpha', href: '/mock-dashboard/workspaces/alpha' },
      { title: 'Project Beta', href: '/mock-dashboard/workspaces/beta' },
      { title: 'Project Gamma', href: '/mock-dashboard/workspaces/gamma' },
    ],
  },
  {
    title: 'Categories',
    href: '#',
    icon: 'bx:bxs-category',
    children: [
      { title: 'Products', href: '/mock-dashboard/categories/products' },
      { title: 'Services', href: '/mock-dashboard/categories/services' },
      { title: 'Resources', href: '/mock-dashboard/categories/resources' },
    ],
  },
  {
    title: 'Designation',
    href: '#',
    icon: 'bx:bxs-category',
    children: [
      { title: 'Products', href: '/mock-dashboard/categories/products' },
      { title: 'Services', href: '/mock-dashboard/categories/services' },
      { title: 'Resources', href: '/mock-dashboard/categories/resources' },
    ],
  },
  {
    title: 'Payroll',
    href: '#',
    icon: 'bx:bxs-dollar-circle',
    children: [
      { title: 'Salary', href: '/mock-dashboard/payroll/salary' },
      { title: 'Employee', href: '/mock-dashboard/payroll/employee' },
      { title: 'Payslip', href: '/mock-dashboard/payroll/payslip' },
    ],
  },
  { title: 'Settings', href: '/mock-dashboard/settings', icon: 'bx:bxs-cog' },
  {
    title: 'Components',
    href: '/mock-dashboard/components',
    icon: 'bx:bxs-collection',
  },
  {
    title: 'Forms',
    href: '/mock-dashboard/forms',
    icon: 'bx:bxs-check-shield',
  },
  {
    title: 'Tables',
    href: '/mock-dashboard/tables',
    icon: 'bx:bxs-table',
  },
  {
    title: 'Modals',
    href: '/mock-dashboard/modals',
    icon: 'bx:bxs-window-alt',
  },
  {
    title: 'Pages',
    href: '/mock-dashboard/pages',
    icon: 'bx:bxs-file',
  },
  {
    title: 'Charts',
    href: '/mock-dashboard/charts',
    icon: 'bx:bxs-bar-chart-alt-2',
  },
  {
    title: 'Errors',
    href: '/mock-dashboard/errors',
    icon: 'bx:bxs-error',
  },
  {
    title: 'Authentication',
    href: '/mock-dashboard/authentication',
    icon: 'bx:bxs-user-pin',
  },
];
