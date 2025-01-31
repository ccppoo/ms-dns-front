import API from '@/api';

import type { UserProfile } from './types';

type GetUserProfileQueryKey = [string, string];

interface IgetUserProfile {
  queryKey: GetUserProfileQueryKey;
}

async function getUserProfile(params: IgetUserProfile): Promise<UserProfile> {
  const { queryKey } = params;
  const [, userID] = queryKey;
  const resp = await API.get<UserProfile>(`/user/${userID}/profile`);
  return resp.data;
}

export default {
  queryFn: {
    getUserProfile,
  },
  query: {},
};
