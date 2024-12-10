import { CDN_OnlyInstance as API_CDN } from '@/api';

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const [fileType, ext] = file.type.split('/');

  const resp = await API_CDN.post(`/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
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

export { uploadImage };

export type { BoardImageUploadType, UploadByFileType };
