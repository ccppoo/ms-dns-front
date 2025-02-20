import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { UserProfile } from '@/schema/user';

import type { RootState } from '../index';

export interface UserProfileState {
  nickname: string | undefined;
  profileImage: string | undefined;
  createdAt: Date | undefined;
}

const initialState: UserProfileState = {
  nickname: undefined,
  profileImage: undefined,
  createdAt: undefined,
};

export const userProfileSlice = createSlice({
  name: 'userProfile',

  initialState,
  reducers: {
    setUserNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setUserProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      console.log(`set user profile action.payload : ${JSON.stringify(action.payload)}`);
      state.nickname = action.payload.nickname;
      state.profileImage = action.payload.profileImage;
    },
  },
});

export const { setUserNickname, setUserProfileImage, setUserProfile } = userProfileSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserNickname = (state: RootState) => state.userProfile.nickname;
export const selectUserProfileImage = (state: RootState) => state.userProfile.nickname;

export const selectUserProfile = (state: RootState) => state.userProfile;
