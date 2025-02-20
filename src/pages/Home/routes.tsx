import { createRoute } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

import Home from './Home';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <>
      <Header />
      <Home />
    </>
  ),
});

export default indexRoute;
