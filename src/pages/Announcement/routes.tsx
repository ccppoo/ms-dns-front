import React, { lazy } from 'react';

import { Outlet, createRoute } from '@tanstack/react-router';

import SuspenseLoading from '@/components/Suspense';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

const AnnouncementRead = lazy(() => import('./AnnouncementRead'));
const AnnouncementListPage = lazy(() => import('./AnnouncementList'));
const AnnouncementEdit = lazy(() => import('./AnnouncementEdit'));

const announcementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/announcement',
  component: () => (
    <>
      <Header />
      <SuspenseLoading>
        <Outlet />
      </SuspenseLoading>
    </>
  ),
});

const announcementReadRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/read/$postID',
  component: () => <AnnouncementRead />,
  // TODO: validateSearch:
});

const announcementListRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/list',
  component: () => <AnnouncementListPage />,
});

// NOTE: 글 작성, 수정 포함
const announcementEditRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/edit',
  component: () => <AnnouncementEdit />,
});

announcementRoute.addChildren([
  announcementReadRoute,
  announcementListRoute,
  announcementEditRoute,
]);

export default announcementRoute;
