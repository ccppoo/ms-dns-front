import { useEffect, useState } from 'react';

import { Box, Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import PostFormProvider from './PostFormProvider';
import api from './api';
import EditorWrapper from './components/Editor';
import Title from './components/Title';
import { outputSchema, outputSchemaDefault } from './models';
import type { OutputSchemaType } from './models';

// NOTE:  이 Component는 글 쓰기, 수정 모두 사용될 수 있음

// .ce-block .ce-block__content maxWidth가 보이는 화면 최대 넓이
export default function Editor({ data, readOnly }: { data?: any; readOnly?: boolean }) {
  const [userProfile] = useUserProfile();

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
    <PostFormProvider<OutputSchemaType> data={data}>
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
              <Title<OutputSchemaType> readOnly={!!readOnly} />
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
            <EditorWrapper<OutputSchemaType> readOnly={!!readOnly} />
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
    </PostFormProvider>
  );
}
