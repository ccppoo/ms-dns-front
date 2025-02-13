import React, { Suspense, lazy } from 'react';

import { Outlet, createRoute } from '@tanstack/react-router';

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
      <Outlet />
    </>
  ),
});

const serverProfileRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/read/$postID',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <ServerProfileRead />
    </Suspense>
  ),
  // TODO: validateSearch:
});

const serverListRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/list',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <ServerListPage />
    </Suspense>
  ),
});

const serverProfileWriteRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: '/edit',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <ServerProfileEdit />
    </Suspense>
  ),
});

serverRoute.addChildren([serverProfileRoute, serverListRoute, serverProfileWriteRoute]);

export default serverRoute;
