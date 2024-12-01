import { Outlet, createRoute } from '@tanstack/react-router';

import ServerProfilePage from '@/pages/Server/Profile';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const serverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/server',
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const serverProfileRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/$serverID',
  component: ServerProfilePage,
});

serverRoute.addChildren([serverProfileRoute]);

export default serverRoute;
