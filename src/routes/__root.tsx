import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import Footer from '@/sections/Footer/Footer';

const MODE = import.meta.env.VITE_MODE;

interface MyRouterContext {
  uid?: string;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  if (MODE !== 'dev') {
    return (
      <>
        <div style={{ minHeight: '100vh' }}>
          <Outlet />
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <Outlet />
      </div>
      <Footer />
      <TanStackRouterDevtools />
    </>
  );
}
