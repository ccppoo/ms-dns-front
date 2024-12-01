import { Outlet, createRoute } from '@tanstack/react-router';

import UserProfilePage from '@/pages/User/Profile';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user',
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const userProfileRoute = createRoute({
  getParentRoute: () => userRoute,
  path: '/$userID',
  component: UserProfilePage,
});

userRoute.addChildren([userProfileRoute]);

export default userRoute;
