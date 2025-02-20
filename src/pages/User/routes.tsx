import { lazy } from 'react';

import { Outlet, createRoute } from '@tanstack/react-router';

import SuspenseLoading from '@/components/Suspense';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const UserProfilePage = lazy(() => import('./Profile'));

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user',
  component: () => (
    <>
      <Header />
      <SuspenseLoading>
        <Outlet />
      </SuspenseLoading>
    </>
  ),
});

const userProfileRoute = createRoute({
  getParentRoute: () => userRoute,
  path: '/$userID',
  component: () => <UserProfilePage />,
});

userRoute.addChildren([userProfileRoute]);

export default userRoute;
