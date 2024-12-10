import API from '@/api';

// import { UserProfile } from '../schema/profile';

async function logout() {
  const resp = await API.get(`/auth/logout`, { withCredentials: true });
  return resp.data;
}

export { logout };
