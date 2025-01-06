import { FormProvider, useForm } from 'react-hook-form';
import type { DefaultValues, FieldPath, FieldValues, PathValue } from 'react-hook-form';

import { Box, Button, Paper, Typography } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import EditorWrapper from '../components/Editor';
import Title from '../components/Title';
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
      // await editBoardPost({ token: auth.id_token, data: allValues, postID: postID });
    }
    if (!isEditMode) {
      await api.query.createBoardPost<ServerPostSchema>({ data: formData });
      // await createBoardPost2<T>({ token: auth.id_token, data: allValues });
      //   await AddNewTrack({ track: data });
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
              maxWidth: 1200,
              width: '100%',
            }}
          >
            {/* 제목 */}
            <FlexBox sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <FlexBox sx={{ width: '100%', maxWidth: MAX_WIDTH }}>
                <Title<ServerPostSchema> readOnly={!!readOnly} />
              </FlexBox>
            </FlexBox>
            {/* 본문 */}
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
          {/* 글 작성, 취소 버튼 */}
          {!readOnly && (
            <FlexBox
              sx={{
                width: '100%',
                border: '1px black solid',
                justifyContent: 'end',
                padding: 2,
                maxWidth: MAX_WIDTH,
              }}
            >
              <Button variant="contained" type="submit">
                submit
              </Button>
            </FlexBox>
          )}
        </FlexBox>
      </form>
    </FormProvider>
  );
}
