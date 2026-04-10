import {
  createFileRoute,
  ErrorComponent,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { getProfileQuery } from '@/api/get-profile';
import { Header } from '@/components/header';
import { ApiError } from '@/lib/api';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  errorComponent: ({ error }) => (
    <AppLayout>
      <ErrorComponent error={error} />
    </AppLayout>
  ),
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const user = await queryClient.ensureQueryData({
        ...getProfileQuery({
          skipAuthRedirect: true,
        }),
        retry: false,
        revalidateIfStale: true,
      });

      if (!user) {
        throw redirect({
          to: '/sign-in',
        });
      }
    } catch (error) {
      if (error instanceof ApiError) {
        const status = error.status;

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
  return (
    <div className="flex min-h-screen flex-col">
      <Header hideAccountMenu={!!children} />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        {children || <Outlet />}
      </div>
    </div>
  );
}
