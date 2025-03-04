import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router';
import { AuthProvider } from '~/hooks/use-auth';
const queryClient = new QueryClient();
export default function BaseLayout() {
  Response;
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
