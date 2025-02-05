import api from '@/api/post';
import type { PaginationOptions, PostListReturn, PostSearchOptions } from '@/api/post/types';
import type { ServerPostSchema, ServerPostSchemaRead } from '@/schema/post/server_profile';
import type { ServerProfileListing } from '@/schema/post/server_profile';

async function getServerProfilePostList({
  queryKey,
}: {
  queryKey: [string, PaginationOptions, PostSearchOptions];
}): Promise<PostListReturn<ServerProfileListing>> {
  const [, paginationOptions, searchOptions] = queryKey;
  const data = await api.queryFn.getPostList<ServerProfileListing>({
    queryKey: ['server post list', 'server', paginationOptions, searchOptions],
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
}

export default {
  queryFn: {
    getServerProfilePostList,
    getServerProfilePost,
  },
  query: {},
};
