import { CDN_OnlyInstance as API_CDN } from '@/api';

type BoardUnstagedImageDeleteType = {
  msg: string;
};

async function deleteUnstagedImage(file: File) {
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

type RemoveBoardUnstagedImageType = (imageURL: string) => void; // axios 요청은 then...catch 형식으로 동기형태로 만듦

export { deleteUnstagedImage };

export type { RemoveBoardUnstagedImageType };
