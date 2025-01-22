import { Outlet, createRoute, redirect } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

import DomainRegisterPage from './Register';
import DomainSearchPage from './Search';

const domainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'domain',
  // beforeLoad: async ({ location, context }) => {
  //   if (!context.uid) {
  //     throw redirect({
  //       to: '/auth/login',
  //       search: {
  //         redirect: location.href,
  //       },
  //     });
  //   }
  // },
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const domainSearchRoute = createRoute({
  getParentRoute: () => domainRoute,
  path: '/search',
  component: DomainSearchPage,
});

const domainRegisterRoute = createRoute({
  getParentRoute: () => domainRoute,
  path: '/register',
  beforeLoad: async ({ location, context }) => {
    if (!context.uid) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: DomainRegisterPage,
});

domainRoute.addChildren([domainRegisterRoute, domainSearchRoute]);

export default domainRoute;
