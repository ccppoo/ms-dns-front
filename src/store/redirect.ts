import { useSelector } from 'react-redux';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from './hooks';
import type { RootState } from './index';

export interface RedirectState {
  redirect: string | undefined;
}

const initialState: RedirectState = {
  redirect: undefined,
};

export const redirectStateSlice = createSlice({
  name: 'redirectState',
  initialState,
  reducers: {
    setRedirect: (state, action: PayloadAction<string>) => {
      state.redirect = action.payload;
    },
  },
  selectors: {},
});

export const selectRedirect = (state: RootState) => state.redirect.redirect;

type Actions = {
  setRedirect: (redirectTarget: string) => void;
};

function useRedirectState(): [RedirectState, Actions] {
  const dispatch = useAppDispatch();
  const redirect_ = useSelector((state: RootState) => state.redirect.redirect);
  const setRedirect = (redirectTarget: string) =>
    dispatch(redirectStateSlice.actions.setRedirect(redirectTarget));

  return [{ redirect: redirect_ }, { setRedirect }];
}

function readRedirectState(): [RedirectState] {
  const redirect_ = useSelector((state: RootState) => state.redirect.redirect);

  return [{ redirect: redirect_ }];
}

// function readUserProfile(): { nickname: string | undefined; profileImage: string | undefined } {
//   const { nickname, profileImage } = useAppSelector(selectUserProfile);

//   return { nickname, profileImage };
// }

export { useRedirectState, readRedirectState };
