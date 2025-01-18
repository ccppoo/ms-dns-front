import { createRouter } from '@tanstack/react-router';

import authRoute from '@/pages/Auth/routes';
import devRoute from '@/pages/Dev/routes';
import domainRoute from '@/pages/Domain/routes';
// import editorRoute from '@/pages/Editor/routes';
import indexRoute from '@/pages/Home/routes';
import meRoute from '@/pages/Me/routes';
import serverRoute from '@/pages/Server/routes';
import userRoute from '@/pages/User/routes';

import { Route as rootRoute } from './__root';

const routeTree = rootRoute.addChildren([
  indexRoute, // home
  authRoute,
  devRoute,
  userRoute,
  serverRoute,
  domainRoute,
  meRoute,
  // editorRoute,
]);

const router = createRouter({
  routeTree,
  context: {
    uid: undefined,
  },
});

export default router;
