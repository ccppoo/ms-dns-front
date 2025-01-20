import API from '@/api';

import type { AvailableDomains, RegisterDomain, ServerProfileListing } from './models';

async function getPostEditMode({ queryKey }: { queryKey: string[] }) {
  const resp = await API.get(`/healthcheck`);
  return resp.data;
}

async function getPostReadMode({ queryKey }: { queryKey: string[] }) {
  const resp = await API.get(`/post/read`);
  return resp.data;
}

async function getPostCreateMode({ queryKey }: { queryKey: string[] }) {
  const resp = await API.get(`/healthcheck`);
  return resp.data;
}

async function getAvailableDomains({
  queryKey,
}: {
  queryKey: string[];
}): Promise<AvailableDomains> {
  const resp = await API.get<AvailableDomains>(`/domain/available`);
  return resp.data;
}

async function getHomeServerProfiles({
  queryKey,
}: {
  queryKey: [string, string];
}): Promise<ServerProfileListing[]> {
  const [_, userID] = queryKey;
  const resp = await API.get<ServerProfileListing[]>(`/server/profile/list?order=time_desc`);
  return resp.data;
}

type DomainStatus = {
  used: number;
  allowed: number;
  host: string;
  subdomain: string;
};

type DomainAvailableAsk = DomainStatus & {
  msg: string;
};

async function getDomainStatus({ host, subdomain }: { host: string; subdomain: string }) {
  const resp = await API.get(`/domain/status`, {
    params: {
      host,
      subdomain,
    },
  });
  return resp.data;
}

async function checkDomainAvailable({ host, subdomain }: { host: string; subdomain: string }) {
  const resp = await API.get<DomainAvailableAsk>(`/domain/check`, {
    params: {
      host,
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
    getPostEditMode,
    getPostReadMode,
    getPostCreateMode,
    getAvailableDomains,
    getHomeServerProfiles,
  },
  query: {
    getDomainStatus,
    checkDomainAvailable,
    registerNewDomain,
  },
};
