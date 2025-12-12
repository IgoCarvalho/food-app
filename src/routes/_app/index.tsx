import { createFileRoute } from '@tanstack/react-router';
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

      <p>Dashboard</p>
    </>
  );
}
