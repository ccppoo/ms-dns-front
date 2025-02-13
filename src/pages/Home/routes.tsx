import React, { Suspense, lazy } from 'react';

import { createRoute } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

// const Home = lazy(() => import('./Home'));
import Home from './Home';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <>
      <Header />
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Home />
      {/* </Suspense> */}
    </>
  ),
});

export default indexRoute;
