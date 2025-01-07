import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Button, Divider, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import { join } from 'path';

import { FlexBox, FlexPaper, FullSizeCenteredFlexBox } from '@/components/styled';
import { rangeArray } from '@/utils/itertools';

import type { BoardPostTitle, OutputSchemaType } from '../models';
import type { ServerPostSchema } from './models';

// NOTE: 게시글 외에도 OutputData 하고 추가로 관리할 데이터들
// 1. 수정하는 경우 -> 이미지 삭제시 최종 POST 할 때 삭제할 이미지 첨부하기

interface ServerVersionIntf {
  readOnly: boolean;
}

function ServerTags() {
  const methods = useFormContext<ServerPostSchema>();
  const serverTags = methods.watch('serverInfo.tags');

  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <FlexBox>
        <TextField />
      </FlexBox>
      <Divider flexItem orientation="horizontal" />
      <FlexBox>태그 1,2,3,4</FlexBox>
    </FlexBox>
  );
}

function ServerServiceTime() {
  const methods = useFormContext<ServerPostSchema>();

  const marks = [
    {
      value: 0,
      label: '0 AM',
    },
    {
      value: 6,
      label: '6 AM',
    },
    {
      value: 12,
      label: '12 PM',
    },
    {
      value: 18,
      label: '6 PM',
    },
    {
      value: 22,
      label: '10 PM',
    },
  ];

  const onClickLauncher = (launcherName: string) => {
    const selectedVersions = methods.getValues('minecraftInfo.launcher')!;
    if (selectedVersions.includes(launcherName)) {
      const otherVersionValues = selectedVersions.filter((vSelected) => vSelected != launcherName);
      methods.setValue('minecraftInfo.launcher', [...otherVersionValues]);
    } else {
      const otherVersionValues = methods.getValues('minecraftInfo.launcher')!;
      methods.setValue('minecraftInfo.launcher', [...otherVersionValues, launcherName]);
    }
  };

  const service24hr = methods.watch('serverInfo.service24hr');
  const serviceTerm = methods.watch('serverInfo.serviceTerm');

  const onChangeServiceTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    methods.setValue('serverInfo.serviceTerm', (event.target as HTMLInputElement).value);
  };

  const onChangeService24hr = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ('true' == (event.target as HTMLInputElement).value) {
      methods.setValue('serverInfo.service24hr', true);
    } else {
      methods.setValue('serverInfo.service24hr', false);
    }
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 0 }}>
      {/* 운영 기간 */}
      <FlexBox sx={{ alignItems: 'center' }}>
        <FlexBox sx={{ width: '10%', justifyContent: 'center' }}>
          <Typography>운영 기간</Typography>
        </FlexBox>

        <Divider flexItem orientation="vertical" />
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <RadioGroup row name="serviceTerm" value={serviceTerm} onChange={onChangeServiceTerm}>
            <FormControlLabel value={'long'} control={<Radio />} label="장타" />
            <FormControlLabel value={'short'} control={<Radio />} label="단타" />
          </RadioGroup>
        </FlexBox>
      </FlexBox>
      {/* 운영 시간 24시간 여부 */}
      <FlexBox sx={{ alignItems: 'center' }}>
        <FlexBox sx={{ width: '10%', justifyContent: 'center' }}>
          <Typography>24 시간</Typography>
        </FlexBox>
        <Divider flexItem orientation="vertical" />
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <RadioGroup row name="24hour" value={service24hr} onChange={onChangeService24hr}>
            <FormControlLabel value={true} control={<Radio />} label="에" />
            <FormControlLabel value={false} control={<Radio />} label="아니오" />
          </RadioGroup>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default function ServerInfo(props: ServerVersionIntf) {
  const { readOnly } = props;
  const methods = useFormContext<ServerPostSchema>();

  // TODO: 서버에서 버전 정보 가져오기

  const launchers: string[] = ['바닐라', 'CurseForge'];
  const formPath = 'minecraftInfo.launcher' as FieldPath<ServerPostSchema>;
  // type FormDataType = PathValue<T, FieldPath<T>>;

  const helperText = methods.formState.errors.title?.message
    ? 'Please input creator username'
    : undefined;

  const titleValue = methods.getValues(formPath);

  if (!readOnly) {
    return (
      <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
        <Typography>서버 운영 시간</Typography>
        <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
          <ServerServiceTime />
        </FlexPaper>

        <Typography>서버 태그</Typography>
        <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
          <ServerTags />
        </FlexPaper>
      </FlexBox>
    );
  }

  return <Typography>{titleValue}</Typography>;
}
