import type { AxiosResponse } from 'axios';

import api from '@/api/post';
import type { IPostCreate, IPostEdit } from '@/api/post/types';
import type { ServerPostSchema } from '@/schema/post/server_profile';

import type { PostCreateResponse, PostEditResponse } from '../response';

interface IServerProfileCreate extends Omit<IPostCreate<ServerPostSchema>, 'topic'> {}
interface IServerProfileEdit extends Omit<IPostEdit<ServerPostSchema>, 'topic'> {}

async function editServerProfilePost(
  params: IServerProfileEdit,
): Promise<AxiosResponse<PostEditResponse>> {
  const { data, postID } = params;

  const resp = await api.query.editBoardPost<ServerPostSchema>({
    topic: 'server',
    data: data,
    postID: postID,
  });

  return resp;
}

async function createServerProfilePost(
  params: IServerProfileCreate,
): Promise<AxiosResponse<PostCreateResponse>> {
  const { data } = params;

  const resp = await api.query.createBoardPost<ServerPostSchema>({
    topic: 'server',
    data: data,
  });
  return resp;
}

export default {
  queryFn: {},
  query: {
    editServerProfilePost,
    createServerProfilePost,
  },
};
