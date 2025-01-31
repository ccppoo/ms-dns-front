import api from '@/api/post';
import type { PaginationOptions } from '@/api/post/types';
import type {
  AnnouncementPostSchema,
  AnnouncementPostSchemaRead,
} from '@/components/editor/AnnouncementEditor/models';

import type { AnnouncementListing } from './models';

async function getAnnouncementPostList({
  queryKey,
}: {
  queryKey: [string, PaginationOptions];
}): Promise<{ list: AnnouncementListing[] }> {
  const [, paginationOptions] = queryKey;
  const data = await api.queryFn.getPostList<{ list: AnnouncementListing[] }>({
    queryKey: ['announcement post list', 'announcement', paginationOptions],
  });
  return data;
}

async function getAnnouncementPost({
  queryKey,
}: {
  queryKey: [string, number];
}): Promise<AnnouncementPostSchemaRead> {
  const [_, postID] = queryKey;
  const data = await api.queryFn.getPost<AnnouncementPostSchemaRead>({
    queryKey: ['get annoucement post', 'announcement', postID],
  });
  return data;
}

export default {
  queryFn: {
    getAnnouncementPost,
    getAnnouncementPostList,
  },
  query: {},
};
