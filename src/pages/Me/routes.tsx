import React, { Suspense, lazy } from 'react';

import { Outlet, createRoute, redirect } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const MyDomainPage = lazy(() => import('./Domain'));
const MyProfilePage = lazy(() => import('./Profile'));

const meRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me',
  beforeLoad: async ({ location, context }) => {
    console.log(`context.uid : ${context.uid}`);
    if (!context.uid) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const myProfileRoute = createRoute({
  getParentRoute: () => meRoute,
  path: '/profile',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <MyProfilePage />
    </Suspense>
  ),
});

const myDomainRoute = createRoute({
  getParentRoute: () => meRoute,
  path: '/domain',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <MyDomainPage />
    </Suspense>
  ),
});

meRoute.addChildren([myProfileRoute, myDomainRoute]);

export default meRoute;
