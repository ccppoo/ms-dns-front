import {
  Outlet,
  createRootRoute,
  createRootRouteWithContext,
  createRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import DevHeader from '@/sections/DevHeader';
import Footer from '@/sections/Footer/Footer';
import Header from '@/sections/Header';

interface MyRouterContext {
  uid?: string;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

const headerRoute = createRoute({
  getParentRoute: () => Route,
  path: '',
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ),
});

function RootComponent() {
  return (
    <>
      <DevHeader />
      <div style={{ minHeight: '100vh' }}>
        <Outlet />
      </div>
      <Footer />
      <TanStackRouterDevtools />
    </>
  );
}
