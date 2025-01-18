import { createRoute, redirect } from '@tanstack/react-router';

import CallbackPage from '@/pages/Auth/Callback';
import LoginPage from '@/pages/Auth/Login';
import { Route as rootRoute } from '@/routes/__root';

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
  component: LoginPage,
});

const callbackRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/callback',
});

const ssoCallbackRoute = createRoute({
  getParentRoute: () => callbackRoute,
  path: '/sso/$SSO_Provider',
  component: CallbackPage,
});

authRoute.addChildren([loginRoute, callbackRoute]);

callbackRoute.addChildren([ssoCallbackRoute]);

export default authRoute;
