import { lazy } from 'react';

import { Outlet, createRoute } from '@tanstack/react-router';

import SuspenseLoading from '@/components/Suspense';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const ServerProfileRead = lazy(() => import('./ProfileRead'));
const ServerListPage = lazy(() => import('./ProfileList'));
const ServerProfileEdit = lazy(() => import('./ProfileEdit'));

const serverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/server',
  component: () => (
    <>
      <Header />
      <SuspenseLoading>
        <Outlet />
      </SuspenseLoading>
    </>
  ),
});

const serverProfileRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/read/$postID',
  component: () => <ServerProfileRead />,
  // TODO: validateSearch:
});

const serverListRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/list',
  component: () => <ServerListPage />,
});

const serverProfileWriteRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/edit',
  component: () => <ServerProfileEdit />,
});

serverRoute.addChildren([serverProfileRoute, serverListRoute, serverProfileWriteRoute]);

export default serverRoute;
