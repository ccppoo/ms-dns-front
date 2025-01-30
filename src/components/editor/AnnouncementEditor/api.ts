import API from '@/api';
import api from '@/api/post';
import type { IPost, IPostCreate, IPostEdit } from '@/api/post/types';

import type { AnnouncementPostSchema } from './models';

async function getPostEditMode({ queryKey }: { queryKey: string[] }) {
  const resp = await API.get(`/healthcheck`);
  return resp.data;
}

interface IAnnouncementCreate extends Omit<IPostCreate<AnnouncementPostSchema>, 'topic'> {}
interface IAnnouncementEdit extends Omit<IPostEdit<AnnouncementPostSchema>, 'topic'> {}

async function editAnnouncementPost(params: IAnnouncementEdit) {
  const { data, postID } = params;

  return await api.query.editBoardPost<AnnouncementPostSchema>({
    topic: 'announcement',
    data: data,
    postID: postID,
  });
}

async function createAnnouncementPost(params: IAnnouncementCreate) {
  const { data } = params;

  return await api.query.createBoardPost<AnnouncementPostSchema>({
    topic: 'announcement',
    data: data,
  });
}

export default {
  queryFn: {
    getPostEditMode,
  },
  query: {
    editAnnouncementPost,
    createAnnouncementPost,
  },
};
