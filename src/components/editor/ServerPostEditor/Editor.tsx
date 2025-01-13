import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues, FieldPath, FieldValues, PathValue } from 'react-hook-form';

import { Box, Button, Paper, Typography } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { uploadImage } from '@/api/image/postImageUpload';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import EditorWrapper from '../components/Editor';
import Title from '../components/Title';
import MinecraftInfo from './MinecraftInfo';
import ServerCommunity from './ServerCommunity';
import ServerInfo from './ServerInfo';
import api from './api';
import type { ServerPostSchema } from './models';
import { serverPostSchemaDefault } from './models';

// NOTE:  이 Component는 글 쓰기, 수정 모두 사용될 수 있음

// .ce-block .ce-block__content maxWidth가 보이는 화면 최대 넓이
export default function ServerPostEditor({ data, readOnly }: { data?: any; readOnly?: boolean }) {
  const methods = useForm<ServerPostSchema>({
    defaultValues: data || serverPostSchemaDefault,
  });

  const [userProfile] = useUserProfile();
  const postID = methods.getValues('id' as FieldPath<ServerPostSchema>);
  const isEditMode = !!postID;
  // console.log(`methods.getValues('id') : ${methods.getValues('id')}`);

  const submit = async (formData: ServerPostSchema) => {
    const allValues = methods.getValues();
    // const allValues = methods.
    console.log(`data : ${JSON.stringify(allValues)}`);
    if (isEditMode) {
      await api.query.editBoardPost();
    }
    if (!isEditMode) {
      // NOTE: blob 이미지는 https://로 보내게 CDN API로 먼저 업로드 한 후 전송하기

      // {
      //   "success": 1,
      //   "file": gin.H{
      //     "url": imageFileURL,
      //   },
      // }
      // const logo_uri = formData.server_info.server_logo
      // if(logo_uri?.startsWith('blob')){
      //   const blobUploadForm = new FormData();
      //   const response = await fetch(logo_uri);
      //   const imgFile = await response.blob();
      //   new File([imgFile], 'logo', {type:imgFile.type})
      //   // blobUploadForm.append('file', imgFile);
      //   const {success, file : file_} = uploadImage(imgFile)
      // }
      await api.query.createBoardPost<ServerPostSchema>({ data: formData });
    }
    return;
  };

  const EDITOR_MODE = !!data
    ? !!readOnly
      ? 'READ MODE'
      : 'EDIT MODE'
    : !readOnly
      ? 'WRITE MODE'
      : 'WTF';

  console.log(`EDITOR_MODE : ${EDITOR_MODE}`);
  const MAX_WIDTH = 750;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
        <FlexBox sx={{ flexDirection: 'column', alignItems: 'center', paddingY: 3, rowGap: 3 }}>
          <FlexBox
            sx={{
              flexDirection: 'column',
              rowGap: 2,
              alignItems: 'center',
              // maxWidth: 1200,
              maxWidth: MAX_WIDTH,
              width: '100%',
            }}
          >
            {/* 제목 */}
            <FlexBox sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <FlexBox sx={{ width: '100%', maxWidth: MAX_WIDTH }}>
                <Title<ServerPostSchema> readOnly={!!readOnly} />
              </FlexBox>
            </FlexBox>
            {/* 서버 운영 시간, 태그 */}
            <ServerInfo readOnly={!!readOnly} />

            {/* 마크 버전, 런처 */}
            <MinecraftInfo readOnly={!!readOnly} />

            {/* 서버 연락, 카페, 등 */}
            <ServerCommunity readOnly={!!readOnly} />
            {/* 본문 */}
            <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
              <Typography>서버 소개</Typography>
              <Paper
                sx={{
                  display: 'flex',
                  height: 'fit-content',
                  flexGrow: 1,
                  width: '100%',
                  maxWidth: MAX_WIDTH,
                }}
              >
                <EditorWrapper<ServerPostSchema> readOnly={!!readOnly} />
              </Paper>
            </FlexBox>
          </FlexBox>
          {/* 글 작성, 취소 버튼 */}
          {!readOnly && (
            <FlexBox
              sx={{
                width: '100%',
                // border: '1px black solid',
                justifyContent: 'end',
                padding: 2,
                maxWidth: MAX_WIDTH,
              }}
            >
              <Button variant="contained" type="submit">
                저장하기
              </Button>
            </FlexBox>
          )}
        </FlexBox>
      </form>
    </FormProvider>
  );
}
