import { createRoute } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';

import Home from './Home';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

export default indexRoute;
