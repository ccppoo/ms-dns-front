import React, { Suspense, lazy } from 'react';

import { createRoute, redirect } from '@tanstack/react-router';

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
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/login',
  component: () => (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    </>
  ),
});

const callbackRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/callback',
});

const ssoCallbackRoute = createRoute({
  getParentRoute: () => callbackRoute,
  path: '/sso/$SSO_Provider',
  component: () => (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CallbackPage />
      </Suspense>
    </>
  ),
});

authRoute.addChildren([loginRoute, callbackRoute]);

callbackRoute.addChildren([ssoCallbackRoute]);

export default authRoute;
