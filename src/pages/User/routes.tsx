import React, { Suspense, lazy } from 'react';

import { Outlet, createRoute } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const UserProfilePage = lazy(() => import('./Profile'));

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user',
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const userProfileRoute = createRoute({
  getParentRoute: () => userRoute,
  path: '/$userID',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfilePage />
    </Suspense>
  ),
});

userRoute.addChildren([userProfileRoute]);

export default userRoute;
