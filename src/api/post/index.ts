import type { AxiosResponse } from 'axios';

import API from '@/api';
import type { QueryName } from '@/api/types';

import type { PostCreateResponse, PostDeleteResponse, PostEditResponse } from './response';
import type {
  IPostCreate,
  IPostDelete,
  IPostEdit,
  PaginationOptions,
  PostID,
  PostListReturn,
  PostSearchOptions,
  PostTopic,
} from './types';

type PostListQueryKey = [QueryName, PostTopic, PaginationOptions, PostSearchOptions];

function stringifyPaginationOptions(options: PaginationOptions): string {
  let queryParams = '';
  queryParams = !options.page ? queryParams : `${queryParams}&page=${options.page}`;
  queryParams = !options.order ? queryParams : `${queryParams}&order=${options.order}`;
  queryParams = !options.limit ? queryParams : `${queryParams}&limit=${options.limit}`;
  return queryParams;
}

function stringifySearchOptions(options: PostSearchOptions): string {
  let queryParams = '';
  queryParams = !options.creator ? queryParams : `${queryParams}&creator=${options.creator}`;

  return queryParams;
}

async function getPostList<PostListType>(params: {
  queryKey: PostListQueryKey;
}): Promise<PostListReturn<PostListType>> {
  const { queryKey } = params;
  const [, postTopic, paginationOptions, searchOptions] = queryKey;
  const q1 = stringifyPaginationOptions(paginationOptions);
  const q2 = stringifySearchOptions(searchOptions);
  const queryParams = [q1.length > 0 ? q1 : null, q2.length > 0 ? q2 : null]
    .filter((val) => !!val)
    .join('&');
  const resp = await API.get<PostListReturn<PostListType>>(
    `/post/${postTopic}/list?${queryParams}`,
  );

  return resp.data;
}

type PostReadQueryKey = [QueryName, PostTopic, PostID];

async function getPost<PostType>(params: { queryKey: PostReadQueryKey }): Promise<PostType> {
  const { queryKey } = params;
  const [, postTopic, postID] = queryKey;
  const resp = await API.get<PostType>(`/post/${postTopic}/r/${postID}`);
  return resp.data;
}

async function deleteBoardPost(params: IPostDelete): Promise<AxiosResponse<PostDeleteResponse>> {
  const { topic, postID } = params;

  const resp = await API.delete<PostDeleteResponse>(`/post/${topic}/${postID}`, {
    validateStatus: () => true, // handle every !200
  });

  return resp;
}

async function editBoardPost<T>(params: IPostEdit<T>): Promise<AxiosResponse<PostEditResponse>> {
  const { topic, data, postID } = params;

  const resp = await API.put<PostEditResponse>(`/post/${topic}/${postID}`, data, {
    validateStatus: () => true, // handle every !200
  });

  return resp;
}

async function createBoardPost<T>(
  params: IPostCreate<T>,
): Promise<AxiosResponse<PostCreateResponse>> {
  const { topic, data } = params;
  const resp = await API.post<PostCreateResponse>(`/post/${topic}`, data, {
    validateStatus: () => true, // handle every !200
  });
  return resp;
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
