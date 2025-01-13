import { AxiosResponse } from 'axios';

import API from '@/api';

import type {
  SubdomainEditResponse,
  UserDomain,
  UserDomains,
  UserProfile,
  UserSubdomainInfo,
  UserSubdomains,
} from './models';

async function getMyProfile({ queryKey }: { queryKey: [] }): Promise<UserProfile> {
  const resp = await API.get<UserProfile>(`/me/profile`);
  return resp.data;
}

async function getMyDomains({ queryKey }: { queryKey: string[] }): Promise<UserSubdomains> {
  const resp = await API.get<UserSubdomains>(`/me/domain`);
  return resp.data;
}

async function editMyDomain({
  userSubdomainInfo,
}: {
  userSubdomainInfo: UserSubdomainInfo;
}): Promise<AxiosResponse<SubdomainEditResponse>> {
  const resp = await API.post(`/me/domain/edit`, userSubdomainInfo);
  return resp;
}

export default {
  queryFn: {
    getMyProfile,
    getMyDomains,
  },
  query: {
    editMyDomain,
  },
};
