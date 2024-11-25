import { createRoute } from '@tanstack/react-router';

import UserProfilePage from '@/pages/User/Profile';
import { Route as rootRoute } from '@/routes/__root';

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user',
});

const userProfileRoute = createRoute({
  getParentRoute: () => userRoute,
  path: '/$userID',
  component: UserProfilePage,
});

userRoute.addChildren([userProfileRoute]);

export default userRoute;
