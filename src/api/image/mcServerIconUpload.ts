import { CDN_OnlyInstance as API_CDN } from '@/api';

async function uploadMCServerIcon(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const resp = await API_CDN.post(`/upload/icon`, formData, {
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

export { uploadMCServerIcon };

export type { BoardImageUploadType, UploadByFileType };
