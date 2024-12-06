import { Outlet, createRoute, createRouter } from '@tanstack/react-router';

// import EditorPage from '@/pages/Editor/Editor2';
import { Route as rootRoute } from '@/routes/__root';
import Header from '@/sections/Header';

import EditorEditMode from './EditMode';
import EditorReadMode from './ReadMode';
import EditorWriteMode from './WriteMode';

const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editor',
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

const editorWriteModeRoute = createRoute({
  getParentRoute: () => editorRoute,
  path: '/write',
  component: EditorWriteMode,
});

const editorEditModeRoute = createRoute({
  getParentRoute: () => editorRoute,
  path: '/edit',
  component: EditorEditMode,
});

const editorReadModeRoute = createRoute({
  getParentRoute: () => editorRoute,
  path: '/read',
  component: EditorReadMode,
});

editorRoute.addChildren([editorWriteModeRoute, editorEditModeRoute, editorReadModeRoute]);

export default editorRoute;
