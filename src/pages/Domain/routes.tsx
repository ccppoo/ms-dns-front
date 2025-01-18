import { Outlet, createRoute, redirect } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

import DomainRegisterPage from './Register';

const domainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'domain',
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
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const domainRegisterRoute = createRoute({
  getParentRoute: () => domainRoute,
  path: '/register',
  component: DomainRegisterPage,
});

domainRoute.addChildren([domainRegisterRoute]);

export default domainRoute;
