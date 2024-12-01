import API from '@/api';

import type { UserProfile } from './models';
import type { UserID } from './types';

async function getMyProfile({ queryKey }: { queryKey: [] }): Promise<UserProfile> {
  // const [userID] = queryKey;
  const resp = await API.get<UserProfile>(`/me/profile`);
  return resp.data;
}

export default {
  queryFn: {
    getMyProfile,
  },
};
