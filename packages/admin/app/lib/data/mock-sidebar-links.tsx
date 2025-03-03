export type MockSidebarLinkItem = {
  title: string;
  href: string;
  icon: string;
  children?: MockSidebarLinkItem[];
};

export const mockSidebarLinks: MockSidebarLinkItem[] = [
  // { title: 'Navigation', href: '#', icon: 'navigation' },
  {
    title: 'Dashboard',
    href: '/mock-dashboard',
    icon: 'uit:airplay',
    children: [
      { title: 'Dashboard', href: '/mock-dashboard', icon: 'uit:airplay' },
      {
        title: 'Analytics',
        href: '/mock-dashboard/mock-analytics',
        icon: 'bx:bxs-bar-chart-alt-2',
      },
    ],
  },
  {
    title: 'Setup',
    href: '#',
    icon: 'qlementine-icons:page-setup-16',
    children: [
      {
        title: 'Designations',
        href: '#',
        icon: 'bx:bxs-category',
        children: [
          {
            title: 'Add',
            href: '/mock-dashboard/designations/add',
            icon: 'carbon:add-alt',
          },
          {
            title: 'List',
            href: '/mock-dashboard/designations',
            icon: 'carbon:list',
          },
        ],
      },
      {
        title: 'Departments',
        href: '#',
        icon: 'bx:bxs-building-house',
        children: [
          {
            title: 'Titles',
            href: '/mock-dashboard/departments/titles',
            icon: 'carbon:badge',
          },
          {
            title: 'Add Title',
            href: '/mock-dashboard/departments/titles/add',
            icon: 'carbon:add-alt',
          },
          {
            title: 'Add',
            href: '/mock-dashboard/departments/add',
            icon: 'carbon:add-alt',
          },
          {
            title: 'List',
            href: '/mock-dashboard/departments',
            icon: 'carbon:list',
          },
        ],
      },

      {
        title: 'Categories',
        href: '#',
        icon: 'carbon:collapse-categories',
        children: [
          {
            title: 'Add',
            href: '/mock-dashboard/categories/add',
            icon: 'carbon:add-alt',
          },
          {
            title: 'List',
            href: '/mock-dashboard/categories',
            icon: 'carbon:list',
          },
        ],
      },
      {
        title: 'Projects',
        href: '#',
        icon: 'ph:projector-screen-chart-thin',
        children: [
          {
            title: 'Add',
            href: '/mock-dashboard/projects/add',
            icon: 'carbon:add-alt',
          },
          {
            title: 'List',
            href: '/mock-dashboard/projects',
            icon: 'carbon:list',
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
      {
        title: 'Add',
        href: '/mock-dashboard/workspaces/add',
        icon: 'carbon:add-alt',
      },
      {
        title: 'List',
        href: '/mock-dashboard/workspaces',
        icon: 'carbon:list',
      },
    ],
  },
  {
    title: 'HR',
    href: '#',
    icon: 'bx:bxs-user-detail',
    children: [
      {
        title: 'Employees',
        href: '/mock-dashboard/hr/employees',
        icon: 'bx:bxs-user-detail',
      },
      {
        title: 'Attendance',
        href: '/mock-dashboard/hr/attendance',
        icon: 'bx:bxs-calendar',
      },
      {
        title: 'Leaves',
        href: '/mock-dashboard/hr/leaves',
        icon: 'bx:bxs-calendar-minus',
      },
      {
        title: 'Holidays',
        href: '/mock-dashboard/hr/holidays',
        icon: 'bx:bxs-calendar-event',
      },
    ],
  },
  {
    title: 'Payroll',
    href: '#',
    icon: 'bx:bxs-dollar-circle',
    children: [
      {
        title: 'Pay Records',
        href: '/mock-dashboard/payroll/pay-records',
        icon: 'bx:bxs-dollar-circle',
      },
      {
        title: 'Payslips',
        href: '/mock-dashboard/payroll/payslips',
        icon: 'bx:bxs-receipt',
      },
    ],
  },
  {
    title: 'Budget',
    href: '#',
    icon: 'bx:bxs-wallet',
    children: [
      {
        title: 'Financial Year',
        href: '/mock-dashboard/budget/financial-year',
        icon: 'bx:bxs-calendar',
      },
      {
        title: 'Quarters',
        href: '/mock-dashboard/budget/quarters',
        icon: 'bx:bxs-calendar',
      },
      {
        title: 'Budgets',
        href: '/mock-dashboard/budget/budgets',
        icon: 'bx:bxs-wallet',
      },
      {
        title: 'Expenses',
        href: '/mock-dashboard/budget/expenses',
        icon: 'bx:bxs-credit-card',
      },
    ],
  },
  { title: 'Settings', href: '/mock-dashboard/settings', icon: 'bx:bxs-cog' },
];
