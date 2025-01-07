import { Outlet, createRoute } from '@tanstack/react-router';

import ServerProfileRead from '@/pages/Server/ProfileRead';
import ServerProfileWrite from '@/pages/Server/ProfileWrite';
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
  path: '/profile/$serverID',
  component: ServerProfileRead,
});

const serverListRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/list',
  component: ServerListPage,
});

const serverProfileWriteRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/new/write',
  component: ServerProfileWrite,
});

serverRoute.addChildren([serverProfileRoute, serverListRoute, serverProfileWriteRoute]);

export default serverRoute;
