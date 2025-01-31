import api from '@/api/post';
import type { PaginationOptions } from '@/api/post/types';
import type {
  ServerPostSchema,
  ServerPostSchemaRead,
} from '@/components/editor/ServerPostEditor/models';

import type { ServerProfileListing } from './models';

async function getServerProfilePostList({
  queryKey,
}: {
  queryKey: [string, PaginationOptions];
}): Promise<ServerProfileListing[]> {
  const [, paginationOptions] = queryKey;
  const data = await api.queryFn.getPostList<ServerProfileListing[]>({
    queryKey: ['server post list', 'server', paginationOptions],
  });
  return data;
}

async function getServerProfilePost({
  queryKey,
}: {
  queryKey: [string, string];
}): Promise<ServerPostSchemaRead> {
  const [_, serverProfileID] = queryKey;
  const data = await api.queryFn.getPost<ServerPostSchemaRead>({
    queryKey: ['get server post', 'server', serverProfileID],
  });
  return data;
  // const resp = await API.get<ServerPostSchemaRead>(`/server/profile/r/${serverProfileID}`);
  // return resp.data;
}

export default {
  queryFn: {
    getServerProfilePostList,
    getServerProfilePost,
  },
  query: {},
};
