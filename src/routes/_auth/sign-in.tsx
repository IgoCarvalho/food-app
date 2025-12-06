import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Sign In</h1>

      <Button asChild>
        <Link to="/">Go to Home</Link>
      </Button>
    </div>
  );
}
