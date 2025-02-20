import type { AxiosResponse } from 'axios';

import API from '@/api';
import type { QueryName, UID } from '@/api/types';
import type { RegisterDomain, UserSubdomainInfo, UserSubdomains } from '@/schema/domain';

import type { SubdomainEditResponse } from './types';

type UserServerLogoListQueryKey = [QueryName, UID];

type UserDomainID = string;

type DomainStatus = {
  used: number;
  allowed: number;
  host: string;
  subdomain: string;
};

type DomainAvailableAsk = DomainStatus & {
  msg: string;
};

async function getUserDomains(params: {
  queryKey: UserServerLogoListQueryKey;
}): Promise<UserSubdomains> {
  const { queryKey } = params;
  const [, uid] = queryKey;
  const resp = await API.get<UserSubdomains>(`/domain/list/${uid}`);
  const subdomains = resp.data.subdomains.map((value: UserSubdomainInfo) => {
    return { ...value, createdAt: new Date(value.createdAt) };
  });

  return { subdomains: subdomains };
}

async function editUserDomain({
  userSubdomainInfo,
}: {
  userSubdomainInfo: UserSubdomainInfo;
}): Promise<AxiosResponse<SubdomainEditResponse>> {
  const userDomainID = userSubdomainInfo.id;
  const resp = await API.put(`/domain/${userDomainID}`, userSubdomainInfo);
  return resp;
}
async function getDomainAvailable({
  queryKey,
}: {
  queryKey: string[];
}): Promise<DomainAvailableAsk> {
  const [, domain, subdomain] = queryKey;
  const resp = await API.get<DomainAvailableAsk>(
    `/domain/check?domain=${domain}&subdomain=${subdomain}`,
  );
  return resp.data;
}

async function getDomainStatus({ host, subdomain }: { host: string; subdomain: string }) {
  const resp = await API.get(`/domain/status`, {
    params: {
      host,
      subdomain,
    },
  });
  return resp.data;
}

async function checkDomainAvailable({ domain, subdomain }: { domain: string; subdomain: string }) {
  const resp = await API.get<DomainAvailableAsk>(`/domain/check`, {
    params: {
      domain,
      subdomain,
    },
  });
  return resp.data;
}

async function registerNewDomain({ data }: { data: RegisterDomain }) {
  const resp = await API.post(`/domain/register`, data);
  return resp.data;
}

export default {
  queryFn: {
    getUserDomains,
    getDomainAvailable,
  },
  query: {
    editUserDomain,
    checkDomainAvailable,
    registerNewDomain,
    getDomainStatus,
  },
};
