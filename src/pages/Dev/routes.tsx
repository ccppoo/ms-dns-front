import { createRoute } from '@tanstack/react-router';

import DevPage from '@/pages/Dev/Dev';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const devRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'dev',
  component: () => (
    <>
      <Header />
      <DevPage />
    </>
  ),
});

export default devRoute;
