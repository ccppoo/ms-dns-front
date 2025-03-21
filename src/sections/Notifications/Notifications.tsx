import type { Ref } from 'react';
import { forwardRef } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import type { CustomContentProps } from 'notistack';
import { SnackbarProvider } from 'notistack';

import { notifications } from '@/config';

import Notifier from './Notifier';

const CustomNotification = forwardRef(function CustomNotification(
  { message }: CustomContentProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <Alert ref={ref} severity="info">
      <AlertTitle>Notification demo (random IT jokes :))</AlertTitle>
      {message}
    </Alert>
  );
});

const ItemDeleteNotification = forwardRef(function CustomNotification(
  { message }: CustomContentProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <Alert ref={ref} severity="info">
      <AlertTitle>Item delete</AlertTitle>
      {message}
    </Alert>
  );
});

function Notifications() {
  return (
    <SnackbarProvider
      maxSnack={notifications.maxSnack}
      Components={{
        default: CustomNotification,
        // customNotification: CustomNotification,
        // itemDeleteNotification: ItemDeleteNotification,
      }}
    >
      <Notifier />
    </SnackbarProvider>
  );
}

export default Notifications;
