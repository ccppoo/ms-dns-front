import React, { lazy } from 'react';

import { Outlet, createRoute, redirect } from '@tanstack/react-router';

import SuspenseLoading from '@/components/Suspense';
import { Route as rootRoute } from '@/routes/__root';

const CallbackPage = lazy(() => import('./Callback'));
const LoginPage = lazy(() => import('./Login'));

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'auth',
  beforeLoad: async ({ location, context }) => {
    if (!!context.uid) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: () => (
    <SuspenseLoading>
      <Outlet />
    </SuspenseLoading>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/login',
  component: () => <LoginPage />,
});

const callbackRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/callback',
});

const ssoCallbackRoute = createRoute({
  getParentRoute: () => callbackRoute,
  path: '/sso/$SSO_Provider',
  component: () => <CallbackPage />,
});

authRoute.addChildren([loginRoute, callbackRoute]);

callbackRoute.addChildren([ssoCallbackRoute]);

export default authRoute;
