import API from '@/api';

import { UserProfile } from '../schema/profile';

async function getMyProfile() {
  const resp = await API.get<UserProfile>(`/me/profile`, { withCredentials: true });
  return resp.data;
}

export { getMyProfile };
