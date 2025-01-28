import API from '@/api';
import type { UserProfileExpire } from '@/api/schema/profile';

async function getLoginSSO(sso_provider: string) {
  return await API.get(`/auth/${sso_provider}/login`);
}

async function callbackSSO(SSO_Provider: string, params: any) {
  const resp = await API.get<UserProfileExpire>(`/auth/${SSO_Provider}/callback`, {
    params: params,
    withCredentials: true,
  });
  return {
    nickname: resp.data.nickname,
    profileImage: resp.data.profileImage,
    uid: resp.data.uid,
    role: resp.data.role,
    expires: new Date(resp.data.expires),
    createdAt: new Date(resp.data.createdAt),
  }!;
}

export default {
  getLoginSSO,
  callbackSSO,
};
