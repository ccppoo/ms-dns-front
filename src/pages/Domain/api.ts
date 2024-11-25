import API from "@/api"

async function searchDomain() {
  return await API.get(`/domain/search`)
}

async function registerDomain() {
  return await API.post(`/domain/register`)
}

export default {
  searchDomain,
  registerDomain,
}
