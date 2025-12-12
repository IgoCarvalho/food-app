import { createFileRoute, Outlet } from '@tanstack/react-router';
import { PizzaIcon } from 'lucide-react';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-foreground/5 border-r bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-foreground text-lg">
          <PizzaIcon className="size-5" />
          <span className="font-semibold">food.app</span>
        </div>
        <footer>
          Painel de parceiro &copy; food.app - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
