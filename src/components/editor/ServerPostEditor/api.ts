import API from '@/api';

import type {} from './models';

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

async function editBoardPost() {
  const resp = await API.get(`/healthcheck`);
  return resp.data;
}

async function createBoardPost<T>({ data }: { data: T }) {
  const resp = await API.post(`/server/profile`, data);
  return resp;
}

export default {
  queryFn: {
    getPostEditMode,
    getPostReadMode,
    getPostCreateMode,
  },
  query: {
    editBoardPost,
    createBoardPost,
  },
};
