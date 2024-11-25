import API from '@/api';

import type { UserProfile } from './models';
import type { UserID } from './types';

async function getUserProfile({ queryKey }: { queryKey: [UserID] }): Promise<UserProfile> {
  const [userID] = queryKey;
  const resp = await API.get<UserProfile>(`/user/${userID}/profile`);
  return resp.data;
}

export default {
  queryFn: {
    getUserProfile,
  },
};
