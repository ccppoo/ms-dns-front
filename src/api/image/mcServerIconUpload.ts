import { CDN_OnlyInstance as API_CDN } from '@/api';

async function uploadMCServerLogo(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const resp = await API_CDN.post(`/upload/logo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
    validateStatus: () => true, // handle every !200
  });
  return resp.data;
}

type BoardImageUploadType = {
  success: number;
  file?: {
    url: string;
  };
};

type UploadByFileType = (file: File) => Promise<BoardImageUploadType>;

export { uploadMCServerLogo };

export type { BoardImageUploadType, UploadByFileType };
