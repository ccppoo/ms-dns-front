import API from '@/api';

import type { UserDomain, UserDomains, UserProfile, UserSubdomains } from './models';

async function getMyProfile({ queryKey }: { queryKey: [] }): Promise<UserProfile> {
  const resp = await API.get<UserProfile>(`/me/profile`);
  return resp.data;
}

async function getMyDomains({ queryKey }: { queryKey: string[] }): Promise<UserSubdomains> {
  const resp = await API.get<UserSubdomains>(`/me/domain`);
  return resp.data;
}

export default {
  queryFn: {
    getMyProfile,
    getMyDomains,
  },
};
