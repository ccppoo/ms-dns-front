import { Outlet, createRoute } from '@tanstack/react-router';

import ServerProfileEdit from '@/pages/Server/ProfileEdit';
import ServerListPage from '@/pages/Server/ProfileList';
import ServerProfileRead from '@/pages/Server/ProfileRead';
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
  path: '/read/$postID',
  component: ServerProfileRead,
  // TODO: validateSearch:
});

const serverListRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/list',
  component: ServerListPage,
});

const serverProfileWriteRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/edit',
  component: ServerProfileEdit,
});

serverRoute.addChildren([serverProfileRoute, serverListRoute, serverProfileWriteRoute]);

export default serverRoute;
