import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('auth', [
    route('login', 'routes/login.tsx'),
    route('register', 'routes/register.tsx'),
    route('forgot-password', 'routes/forgot-password.tsx'),
  ]),
  route('dashboard', 'routes/dashboard-layout.tsx', [
    route('', 'routes/dashboard.tsx'),
  ]),
] satisfies RouteConfig;
