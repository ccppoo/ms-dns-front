import API from '@/api';

import type { UserDomain, UserDomains, UserProfile } from './models';

async function getMyProfile({ queryKey }: { queryKey: [] }): Promise<UserProfile> {
  const resp = await API.get<UserProfile>(`/me/profile`);
  return resp.data;
}

async function getMyDomains({ queryKey }: { queryKey: string[] }): Promise<UserDomains> {
  const resp = await API.get<UserDomains>(`/me/domain`);
  return resp.data;
}

export default {
  queryFn: {
    getMyProfile,
    getMyDomains,
  },
};
