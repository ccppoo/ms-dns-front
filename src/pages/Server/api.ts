import { AxiosResponse } from 'axios';

import API from '@/api';
import type {
  ServerPostSchema,
  ServerPostSchemaRead,
} from '@/components/editor/ServerPostEditor/models';

import type { ServerProfileListing, UserProfile } from './models';

async function getServerProfileList({
  queryKey,
}: {
  queryKey: [string, string, number];
}): Promise<ServerProfileListing[]> {
  const resp = await API.get<ServerProfileListing[]>(`/server/profile/list`);
  return resp.data;
}

async function getServerProfile({
  queryKey,
}: {
  queryKey: [string];
}): Promise<ServerPostSchemaRead> {
  const [serverProfileID] = queryKey;
  const resp = await API.get<ServerPostSchemaRead>(`/server/profile/r/${serverProfileID}`);
  return resp.data;
}

async function getUserProfile({ queryKey }: { queryKey: [string] }): Promise<UserProfile> {
  const [userID] = queryKey;
  const resp = await API.get<UserProfile>(`/user/${userID}/profile`);
  return resp.data;
}

// async function getServerProfile({ queryKey }: { queryKey: string[] }): Promise<UserSubdomains> {
//   const resp = await API.get<UserSubdomains>(`/me/domain`);
//   return resp.data;
// }

export default {
  queryFn: {
    getServerProfileList,
    getUserProfile,
    getServerProfile,
  },
  query: {},
};
