import {
  createFileRoute,
  ErrorComponent,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { getProfileQuery } from '@/api/get-profile';
import { Header } from '@/components/header';
import { api } from '@/lib/axios';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  errorComponent: ({ error }) => (
    <AppLayout>
      <ErrorComponent error={error} />
    </AppLayout>
  ),
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const user = await queryClient.ensureQueryData(getProfileQuery());

      if (!user) {
        throw redirect({
          to: '/sign-in',
        });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401) {
          throw redirect({
            to: '/sign-in',
          });
        }
      }

      throw error;
    }
  },
});

function AppLayout({ children }: React.ComponentProps<'div'>) {
  const navigate = Route.useNavigate();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.status === 401) {
          navigate({ to: 'sign-in', replace: true });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header hideAccountMenu={!!children} />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        {children || <Outlet />}
      </div>
    </div>
  );
}
