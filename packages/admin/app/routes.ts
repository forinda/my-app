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
        route('designations', 'routes/mock-designations.tsx'),
        route('designations/add', 'routes/mock-add-designation.tsx'),
        route('*', 'routes/mock-catch-all-routes.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
