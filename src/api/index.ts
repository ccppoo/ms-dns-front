import axios from 'axios';

export const AuthHeaders = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};

export const ContentTypeHeader = {
  JSON: { 'Content-Type': 'application/json' },
  FORM: { 'Content-Type': 'multipart/form-data' },
};

export const API_HOST = import.meta.env.VITE_API_HOST;

const instance = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
});

// instance.interceptors.response.use(
//   (config) => {
//     // we don't want to send null/empty values to the API
//     // TODO do we need to do this for all params?
//     if (config.params) {
//       if (!config.params["q"]) {
//         delete config.params["q"]
//       }
//     }
//     let token = auth_store.state.currentUser.token
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`
//     }

//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )
// instance.interceptors.request.use(
//   (config) => {
//     // we don't want to send null/empty values to the API
//     // TODO do we need to do this for all params?
//     if (config.params) {
//       if (!config.params["q"]) {
//         delete config.params["q"]
//       }
//     }
//     let token = auth_store.state.currentUser.token
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`
//     }

//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// instance.interceptors.request.use(function (config) {
//   if (!config.url.includes("organization")) {
//     let currentOrganization = router.currentRoute.value.params.organization || "default"

//     if (currentOrganization) {
//       config.url = `${currentOrganization}${config.url}`
//     }
//   }
//   return config
// })

export default instance;
