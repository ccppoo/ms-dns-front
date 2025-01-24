import { AxiosResponse } from 'axios';

import API from '@/api';
import type {
  AnnouncementPostSchema,
  AnnouncementPostSchemaRead,
} from '@/components/editor/AnnouncementEditor/models';

import type { ServerProfileListing, UserProfile } from './models';

async function getAnnouncementPostList({
  queryKey,
}: {
  queryKey: [string, string, number];
}): Promise<ServerProfileListing[]> {
  const resp = await API.get<ServerProfileListing[]>(`/announcement/list`);
  return resp.data;
}

async function getAnnouncementPost({
  queryKey,
}: {
  queryKey: [string, string];
}): Promise<AnnouncementPostSchemaRead> {
  const [_, postID] = queryKey;
  const resp = await API.get<AnnouncementPostSchemaRead>(`/announcement/post/${postID}`);
  return resp.data;
}

async function getUserProfile({ queryKey }: { queryKey: [string] }): Promise<UserProfile> {
  const [userID] = queryKey;
  const resp = await API.get<UserProfile>(`/user/${userID}/profile`);
  return resp.data;
}

export default {
  queryFn: {
    getAnnouncementPost,
    getAnnouncementPostList,
    getUserProfile,
  },
  query: {},
};
