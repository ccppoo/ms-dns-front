import React, { Suspense, lazy } from 'react';

import { Outlet, createRoute } from '@tanstack/react-router';

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
      <Outlet />
    </>
  ),
});

const announcementReadRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/read/$postID',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <AnnouncementRead />
    </Suspense>
  ),
  // TODO: validateSearch:
});

const announcementListRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/list',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <AnnouncementListPage />
    </Suspense>
  ),
});

// NOTE: 글 작성, 수정 포함
const announcementEditRoute = createRoute({
  getParentRoute: () => announcementRoute,
  path: '/edit',
  component: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <AnnouncementEdit />
    </Suspense>
  ),
});

announcementRoute.addChildren([
  announcementReadRoute,
  announcementListRoute,
  announcementEditRoute,
]);

export default announcementRoute;
