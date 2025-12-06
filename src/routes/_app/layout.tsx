import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div>
      <p>Hello from App Layout!</p>
      <Outlet />
    </div>
  );
}
