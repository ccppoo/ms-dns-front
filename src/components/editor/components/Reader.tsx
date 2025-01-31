import { Box, Button, Paper, Typography } from '@mui/material';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import type { OutputDataSchemaType } from '../models';
import { Reader } from './Editor';

// 데이터는 상위 컴포넌트에서 직접 보냄냄
export default function EditorReader<T extends OutputDataSchemaType>({ data }: { data: T }) {
  const MAX_WIDTH = 852;
  return (
    <FlexBox sx={{ flexDirection: 'column', alignItems: 'center', rowGap: 3 }}>
      <FlexBox
        sx={{
          flexDirection: 'column',
          rowGap: 2,
          alignItems: 'center',
          maxWidth: MAX_WIDTH,
          width: '100%',
        }}
      >
        {/* 본문 */}
        <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
          <Paper
            sx={{
              display: 'flex',
              height: 'fit-content',
              flexGrow: 1,
              width: '100%',
              maxWidth: MAX_WIDTH,
            }}
          >
            <Reader<T> data={data} />
          </Paper>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
