import { Outlet, createRoute, redirect } from '@tanstack/react-router';

import MyDomainPage from '@/pages/Me/Domain';
import MyProfilePage from '@/pages/Me/Profile';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

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
  component: MyProfilePage,
});

const myDomainRoute = createRoute({
  getParentRoute: () => meRoute,
  path: '/domain',
  component: MyDomainPage,
});

meRoute.addChildren([myProfileRoute, myDomainRoute]);

export default meRoute;
