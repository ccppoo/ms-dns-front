import API from "@/api"
import type { GoogleSSOCallback } from "./models"

async function _loginSSO(oauth_service: string) {
  return await API.get(`/auth/${oauth_service}/login`)
}

const loginGoogle = async () => await _loginSSO("google")

async function _callbackSSO<T>(oauth_service: string, params: T) {
  return await API.get(`/auth/${oauth_service}/callback`, { params })
}

async function callbackGoogle(params: GoogleSSOCallback) {
  return (await _callbackSSO<GoogleSSOCallback>("google", params)).data
}

export default {
  loginGoogle,
  callbackGoogle,
}
