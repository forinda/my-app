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
  ]),
] satisfies RouteConfig;
