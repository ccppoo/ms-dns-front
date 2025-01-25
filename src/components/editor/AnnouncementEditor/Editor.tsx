import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues, FieldPath, FieldValues, PathValue } from 'react-hook-form';

import { Box, Button, Paper, Typography } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { uploadImage } from '@/api/image/postImageUpload';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import EditorWrapper from '../components/Editor';
import Title from '../components/Title';
import api from './api';
import type { AnnouncementPostSchema } from './models';
import { announcementPostSchemaDefault } from './models';

// NOTE:  이 Component는 글 쓰기, 수정 모두 사용될 수 있음

// .ce-block .ce-block__content maxWidth가 보이는 화면 최대 넓이
export default function AnnouncementEditor({
  data,
  readOnly,
}: {
  data?: AnnouncementPostSchema;
  readOnly?: boolean;
}) {
  const methods = useForm<AnnouncementPostSchema>({
    defaultValues: data || announcementPostSchemaDefault,
  });

  const [userProfile] = useUserProfile();
  const postID = methods.getValues('id' as FieldPath<AnnouncementPostSchema>);
  const navigate = useNavigate({});
  const isEditMode = !!postID;

  const submit = async (formData: AnnouncementPostSchema) => {
    const allValues = methods.getValues();
    console.log(`data : ${JSON.stringify(allValues)}`);
    if (isEditMode) {
      await api.query.editBoardPost();
    }
    if (!isEditMode) {
      const resp = await api.query.createBoardPost<AnnouncementPostSchema>({ data: formData });
      if (resp.status == 200) {
        methods.reset(); // 글 현재 쓰고 있는거 다 지우고
        const { postID } = resp.data;
        navigate({ to: `/announcement/read/${postID}` });
      }
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

  // console.log(`EDITOR_MODE : ${EDITOR_MODE}`);
  const MAX_WIDTH = 852;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
        <FlexBox sx={{ flexDirection: 'column', alignItems: 'center', paddingY: 3, rowGap: 3 }}>
          <FlexBox
            sx={{
              flexDirection: 'column',
              rowGap: 2,
              alignItems: 'center',
              maxWidth: MAX_WIDTH,
              width: '100%',
            }}
          >
            {/* 제목 */}
            <FlexBox sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <FlexBox sx={{ width: '100%', maxWidth: MAX_WIDTH }}>
                <Title<AnnouncementPostSchema> readOnly={!!readOnly} />
              </FlexBox>
            </FlexBox>
            {/* 본문 */}
            <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
              {/* <Typography>본문</Typography> */}
              <Paper
                sx={{
                  display: 'flex',
                  height: 'fit-content',
                  flexGrow: 1,
                  width: '100%',
                  maxWidth: MAX_WIDTH,
                }}
              >
                <EditorWrapper<AnnouncementPostSchema> readOnly={!!readOnly} />
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
