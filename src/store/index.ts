import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { redirectStateSlice } from './redirect';
import { userProfileSlice } from './userProfile/userProfile';

export const store = configureStore({
  reducer: {
    userProfile: userProfileSlice.reducer,
    redirect: redirectStateSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
