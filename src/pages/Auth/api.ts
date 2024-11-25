import API from '@/api';

// import type { GoogleSSOCallback } from './models';

async function getLoginSSO(sso_provider: string) {
  return await API.get(`/auth/${sso_provider}/login`);
}

async function callbackSSO(SSO_Provider: string, params: any) {
  const resp = await API.get(`/auth/${SSO_Provider}/callback`, { params: params });
  return resp;
}

export default {
  getLoginSSO,
  callbackSSO,
};
