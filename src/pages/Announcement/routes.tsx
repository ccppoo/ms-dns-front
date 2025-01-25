import { Outlet, createRoute } from '@tanstack/react-router';

import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

import AnnouncementEdit from './AnnouncementEdit';
import AnnouncementListPage from './AnnouncementList';
import AnnouncementRead from './AnnouncementRead';

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
  path: '/read/$postID',
  component: AnnouncementRead,
  // TODO: validateSearch:
});

const announcementListRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/list',
  component: AnnouncementListPage,
});

// NOTE: 글 작성, 수정 포함
const announcementEditRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/edit',
  component: AnnouncementEdit,
});

announcementRoute.addChildren([
  announcementReadRoute,
  announcementListRoute,
  announcementEditRoute,
]);

export default announcementRoute;
