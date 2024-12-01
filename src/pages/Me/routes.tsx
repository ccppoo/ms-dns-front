import { Outlet, createRoute, redirect } from '@tanstack/react-router';

import MyDomainPage from '@/pages/Me/Domain';
import MyProfilePage from '@/pages/Me/Profile';
import MyServerPage from '@/pages/Me/Server';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const isAuthed = true;

const meRoute = createRoute({
  getParentRoute: () => rootRoute,

  path: '/me',
  beforeLoad: async ({ location }) => {
    if (!isAuthed) {
      throw redirect({
        to: '/auth/login',
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

const myServerRoute = createRoute({
  getParentRoute: () => meRoute,
  path: '/server',
  component: MyServerPage,
});

const myDomainRoute = createRoute({
  getParentRoute: () => meRoute,
  path: '/domain',
  component: MyDomainPage,
});

meRoute.addChildren([myProfileRoute, myServerRoute, myDomainRoute]);

export default meRoute;
