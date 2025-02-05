import { AxiosResponse } from 'axios';

import API from '@/api';
import type { QueryName, UID } from '@/api/types';

import type { LogoID } from './types';

type UserServerLogoListQueryKey = [QueryName, UID];

type RequestFailResponse = {
  msg: string;
};

type RequestResponse = {
  msg: string;
};

export type UserServerLogo = {
  id: string;
  url: string;
};

type UserServerLogos = {
  logos: UserServerLogo[];
  uid: UID;
};

async function getUserServerLogoList(params: {
  queryKey: UserServerLogoListQueryKey;
}): Promise<UserServerLogos> {
  const { queryKey } = params;
  const [_, uid] = queryKey;
  const resp = await API.get<UserServerLogos>(`/logo/list/${uid}`);
  return resp.data;
}

type UserServerLogoQueryKey = [QueryName, LogoID];

async function getUserServerLogo(params: {
  queryKey: UserServerLogoQueryKey;
}): Promise<UserServerLogo> {
  const { queryKey } = params;
  const [_, logoID] = queryKey;
  const resp = await API.get<UserServerLogo>(`/logo/r/${logoID}`);
  return resp.data;
}

interface IServerLogoDelete {
  logo_id: string;
}

async function deleteServerLogo(
  params: IServerLogoDelete,
): Promise<AxiosResponse<RequestResponse>> {
  const { logo_id } = params;

  const resp = await API.delete<RequestResponse>(`/logo/${logo_id}`, {
    validateStatus: () => true, // handle every !200
  });

  return resp;
}

interface IUpdateServerLogo {
  logo_url: string;
  logo_id: string;
}

async function updateServerLogo(params: IUpdateServerLogo): Promise<AxiosResponse<UserServerLogo>> {
  const { logo_url, logo_id } = params;

  const resp = await API.put(
    `/logo/${logo_id}`,
    { url: logo_url },
    {
      validateStatus: () => true, // handle every !200
    },
  );

  return resp;
}

interface IUploadServerLogo {
  logo_url: string;
}

async function uploadServerLogo(params: IUploadServerLogo): Promise<AxiosResponse<UserServerLogo>> {
  const { logo_url } = params;
  // 이미 4개 초과인 경우 실패함
  const resp = await API.post(
    `/logo`,
    { url: logo_url },
    {
      validateStatus: () => true, // handle every !200
    },
  );
  return resp;
}

export default {
  queryFn: {
    getUserServerLogoList,
    getUserServerLogo,
  },
  query: {
    deleteServerLogo,
    updateServerLogo,
    uploadServerLogo,
  },
};
