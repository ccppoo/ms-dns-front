import { Outlet, createRoute } from '@tanstack/react-router';

import ServerListPage from '@/pages/Server/ProfileList';
import ServerProfileRead from '@/pages/Server/ProfileRead';
import ServerProfileWrite from '@/pages/Server/ProfileWrite';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const announcementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/announcement',
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const announcementReadRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/read',
  component: ServerProfileRead,
  // TODO: validateSearch:
});

const announcementListRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/list',
  component: ServerListPage,
});

// NOTE: 글 작성, 수정 포함
const announcementEditRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/edit',
  component: ServerProfileWrite,
});

announcementRoute.addChildren([
  announcementReadRoute,
  announcementListRoute,
  announcementEditRoute,
]);

export default announcementRoute;
