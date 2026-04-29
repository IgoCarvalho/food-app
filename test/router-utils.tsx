import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import React from 'react';

type RenderOptions = {
  pathPattern: string;
  initialEntry?: string;
  queryClient?: QueryClient;
  routes?: ReturnType<typeof createRoute>[];
  wrapper?: React.ElementType;
};

export const rootRoute = createRootRoute();

export async function renderWithRouter(
  Component: React.ComponentType,
  {
    pathPattern,
    initialEntry = pathPattern,
    queryClient,
    wrapper,
    routes = [],
  }: RenderOptions
) {
  const Wrapper = wrapper || React.Fragment;

  rootRoute.update({
    component: () => (
      <Wrapper>
        <div data-testid="root-layout" />
        <Outlet />
      </Wrapper>
    ),
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Index</div>,
  });

  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: pathPattern,
    component: () => <Component />,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, testRoute, ...routes]),
    history: createMemoryHistory({ initialEntries: [initialEntry] }),
    defaultPendingMinMs: 0,
  });

  let tree = <RouterProvider router={router} />;
  if (queryClient) {
    tree = (
      <QueryClientProvider client={queryClient}>{tree}</QueryClientProvider>
    );
  }

  const renderResult = render(tree);
  await screen.findByTestId('root-layout');

  return { router, renderResult };
}
