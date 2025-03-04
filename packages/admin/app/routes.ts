import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

const matchAllRegex = /(.*)/;
export default [
  layout('routes/base-layout.tsx', [
    index('routes/home.tsx'),
    ...prefix('auth', [
      route('login', 'routes/login.tsx'),
      route('register', 'routes/register.tsx'),
      route('forgot-password', 'routes/forgot-password.tsx'),
    ]),
    route('dashboard', 'routes/dashboard-layout.tsx', [
      route('', 'routes/dashboard.tsx'),
    ]),
    ...prefix('mock-dashboard', [
      layout('routes/mock-layout.tsx', [
        index('routes/mock-dashboard.tsx'),
        // Designations
        route('designations', 'routes/mock-designations.tsx'),
        route('designations/add', 'routes/mock-add-designation.tsx'),
        // Department Titles
        route('department-titles', 'routes/mock-department-titles.tsx'),
        route('department-titles/add', 'routes/mock-add-department-title.tsx'),
        // Departments
        route('departments', 'routes/mock-departments.tsx'),
        route('departments/add', 'routes/mock-add-department.tsx'),
        // Categories
        route('categories', 'routes/mock-project-categories.tsx'),
        route('categories/add', 'routes/mock-add-project-category.tsx'),
        // Catch all
        route('*', 'routes/mock-catch-all-routes.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
