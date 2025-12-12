import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { pageTitleTemplate } from '@/lib/page-title-template';

export const Route = createFileRoute('/_app/')({
  component: IndexPage,
  head: () => ({
    meta: [{ title: 'Dashboard' }],
  }),
});

function IndexPage() {
  return (
    <>
      <title>{pageTitleTemplate('Dashboard')}</title>

      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Dashboard</p>
        <Button asChild>
          <Link to="/sign-in">Go to Sign In</Link>
        </Button>
      </div>
    </>
  );
}
