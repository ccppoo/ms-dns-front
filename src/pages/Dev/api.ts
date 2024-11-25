import API from "@/api"

async function devAPI(path: string) {
  return await API.get(`/dev${path}`)
}

async function upload_temp_image(fileBlob: string) {
  const formData = new FormData()
  const response = await fetch(fileBlob)
  const imgFile = await response.blob()
  formData.append("file", imgFile)

  const resp = await API.post(`/dev/image_temp`, formData)
  if (resp.status != 200) {
    return undefined
  }
  return resp.data.image_temp_url
}

export default {
  devAPI,
  upload_temp_image,
}
