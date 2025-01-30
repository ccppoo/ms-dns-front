import API from '@/api';
import api from '@/api/post';
import type { IPost, IPostCreate, IPostEdit } from '@/api/post/types';

import type { ServerPostSchema } from './models';

async function getPostEditMode({ queryKey }: { queryKey: string[] }) {
  const resp = await API.get(`/healthcheck`);
  return resp.data;
}

async function getPostReadMode({ queryKey }: { queryKey: string[] }) {
  const resp = await API.get(`/post/server/read`);
  return resp.data;
}

async function getPostCreateMode({ queryKey }: { queryKey: string[] }) {
  const resp = await API.get(`/healthcheck`);
  return resp.data;
}

interface IServerProfileCreate extends Omit<IPostCreate<ServerPostSchema>, 'topic'> {}
interface IServerProfileEdit extends Omit<IPostEdit<ServerPostSchema>, 'topic'> {}

async function editServerProfilePost(params: IServerProfileEdit) {
  const { data, postID } = params;

  return await api.query.editBoardPost<ServerPostSchema>({
    topic: 'server',
    data: data,
    postID: postID,
  });
}

async function createServerProfilePost(params: IServerProfileCreate) {
  const { data } = params;

  return await api.query.createBoardPost<ServerPostSchema>({
    topic: 'server',
    data: data,
  });
}

export default {
  queryFn: {
    getPostEditMode,
    getPostReadMode,
    getPostCreateMode,
  },
  query: {
    editServerProfilePost,
    createServerProfilePost,
  },
};
