import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_app/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p>Dashboard</p>
      <Button asChild>
        <Link to="/sign-in">Go to Sign In</Link>
      </Button>
    </div>
  );
}
