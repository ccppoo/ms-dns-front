import { Outlet, createRoute } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

import DomainRegisterPage from './Register';

// import DomainSearchPage from './Search';
// import { domainSearchParams } from './Search/models';

const domainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'domain',
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

// const domainSearchRoute = createRoute({
//   getParentRoute: () => domainRoute,
//   path: '/search',
//   component: DomainSearchPage,
//   validateSearch: (search) => domainSearchParams.parse(search),
// });

const domainRegisterRoute = createRoute({
  getParentRoute: () => domainRoute,
  path: '/register',
  component: DomainRegisterPage,
});

// domainRoute.addChildren([domainSearchRoute, domainRegisterRoute]);
domainRoute.addChildren([domainRegisterRoute]);

export default domainRoute;
