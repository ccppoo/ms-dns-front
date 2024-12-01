import { Outlet, createRootRoute, createRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import DevHeader from '@/sections/DevHeader';
import Header from '@/sections/Header';

export const Route = createRootRoute({
  component: RootComponent,
});

const headerRoute = createRoute({
  getParentRoute: () => Route,
  path: '',
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

function RootComponent() {
  return (
    <>
      <DevHeader />

      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
