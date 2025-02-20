import api from '@/api/post';
import type { PaginationOptions, PostListReturn, PostSearchOptions } from '@/api/post/types';
import type {
  AnnouncementPostSchema,
  AnnouncementPostSchemaRead,
} from '@/schema/post/announcement';
import type { AnnouncementListing } from '@/schema/post/announcement';

async function getAnnouncementPostList({
  queryKey,
}: {
  queryKey: [string, PaginationOptions, PostSearchOptions];
}): Promise<PostListReturn<AnnouncementListing>> {
  const [, paginationOptions, searchOptions] = queryKey;
  const data = await api.queryFn.getPostList<AnnouncementListing>({
    queryKey: ['announcement post list', 'announcement', paginationOptions, searchOptions],
  });
  return data;
}

async function getAnnouncementPost({
  queryKey,
}: {
  queryKey: [string, number];
}): Promise<AnnouncementPostSchemaRead> {
  const [, postID] = queryKey;
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
