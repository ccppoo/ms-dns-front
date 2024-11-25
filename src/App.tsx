import { Fragment } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import { RouterProvider } from '@tanstack/react-router';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import pageRoutes from '@/routes';
import Notifications from '@/sections/Notifications';

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Notifications />
      {/* <HotKeys /> */}
      {/* <SW /> */}
      <RouterProvider router={pageRoutes} />
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
