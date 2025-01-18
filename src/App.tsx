import { Fragment } from 'react';
import { useCookies } from 'react-cookie';

import CssBaseline from '@mui/material/CssBaseline';

import { RouterProvider } from '@tanstack/react-router';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import pageRoutes from '@/routes';
import Notifications from '@/sections/Notifications';

import useUserProfile from './hooks/useUserProfile';

function App() {
  const [cookies] = useCookies(['uid']);
  const { uid } = cookies;
  return (
    <Fragment>
      <CssBaseline />
      <Notifications />
      {/* <HotKeys /> */}
      {/* <SW /> */}
      <RouterProvider router={pageRoutes} context={{ uid }} />
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
