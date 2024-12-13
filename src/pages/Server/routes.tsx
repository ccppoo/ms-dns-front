import { Outlet, createRoute } from '@tanstack/react-router';

import ServerProfilePage from '@/pages/Server/Profile';
import ServerListPage from '@/pages/Server/ServerList';
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

const serverListRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/list',
  component: ServerListPage,
});

serverRoute.addChildren([serverProfileRoute, serverListRoute]);

export default serverRoute;
