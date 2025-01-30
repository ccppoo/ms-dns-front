import { AxiosResponse } from 'axios';

import API from '@/api';

import type {
  IPostCreate,
  IPostDelete,
  IPostEdit,
  PaginationOptions,
  PostID,
  PostTopic,
  QueryName,
} from './types';

type PostListQueryKey = [QueryName, PostTopic, PaginationOptions];

function stringifyPaginationOptions(options: PaginationOptions): string {
  let queryParams = '';
  queryParams = !!options.page ? queryParams : `${queryParams}&page=${options.page}`;
  queryParams = !!options.order ? queryParams : `${queryParams}&order=${options.order}`;
  queryParams = !!options.limit ? queryParams : `${queryParams}&limit=${options.limit}`;
  return queryParams;
}

async function getPostList<PostListType>(params: {
  queryKey: PostListQueryKey;
}): Promise<PostListType> {
  const { queryKey } = params;
  const [_, postTopic, paginationOptions] = queryKey;
  const queryParams = stringifyPaginationOptions(paginationOptions);
  const resp = await API.get<PostListType>(`/post/${postTopic}/list?page${queryParams}`);

  return resp.data;
}

type PostReadQueryKey = [QueryName, PostTopic, PostID];

async function getPost<PostType>(params: { queryKey: PostReadQueryKey }): Promise<PostType> {
  const { queryKey } = params;
  const [_, postTopic, postID] = queryKey;
  const resp = await API.get<PostType>(`/post/${postTopic}/r/${postID}`);
  return resp.data;
}

type PostDeleteResponse = {
  topic: string;
  message: string;
};

async function deleteBoardPost(params: IPostDelete): Promise<AxiosResponse<PostDeleteResponse>> {
  const { topic, postID } = params;

  const resp = await API.delete<PostDeleteResponse>(`/post/${topic}/${postID}`, {
    validateStatus: () => true, // handle every !200
  });

  return resp;
}

async function editBoardPost<T>(params: IPostEdit<T>) {
  const { topic, data, postID } = params;

  const resp = await API.put(`/post/${topic}/${postID}`, data);

  return resp.data;
}

async function createBoardPost<T>(params: IPostCreate<T>) {
  const { topic, data } = params;
  const resp = await API.post(`/post/${topic}`, data);
  return resp.data;
}

export default {
  queryFn: {
    getPost,
    getPostList,
  },
  query: {
    editBoardPost,
    createBoardPost,
    deleteBoardPost,
  },
};
