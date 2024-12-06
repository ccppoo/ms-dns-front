import { Outlet, createRootRoute, createRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import DevHeader from '@/sections/DevHeader';
import Footer from '@/sections/Footer';
import Footer2 from '@/sections/Footer/Footer2';
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
      {/* <Footer /> */}
      <Footer2 />
      <TanStackRouterDevtools />
    </>
  );
}
