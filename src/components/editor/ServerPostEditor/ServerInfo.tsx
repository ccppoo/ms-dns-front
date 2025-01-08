import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Button, Divider, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
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
  const serverTags = methods.watch('serverInfo.tags')!;
  const [tagInput, setTagInput] = React.useState<string>('');

  const [dupliacateErrorText, setDupliacateErrorText] = React.useState<string>('');

  const onEnterServerTag = () => {
    const prevTags = methods.getValues('serverInfo.tags')!;
    if (prevTags.includes(tagInput)) {
      setDupliacateErrorText('이미 존재하는 태그입니다');
      return;
    }
    methods.setValue('serverInfo.tags', [...prevTags, tagInput]);
    setTagInput('');
  };

  const onDeleteServerTag = (tagIdx: number) => {
    const prevTags = methods.getValues('serverInfo.tags')!;
    const removedTags = prevTags.filter((_, idx) => idx != tagIdx);
    methods.setValue('serverInfo.tags', [...removedTags]);
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', paddingY: 1 }}>
      <FlexBox sx={{ paddingY: 0.5, alignItems: 'center' }}>
        <TextField
          value={tagInput}
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            !!dupliacateErrorText && setDupliacateErrorText('');
            event.preventDefault();
            event.stopPropagation();
            setTagInput(event.target.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key.toLowerCase() == 'enter') {
              event.preventDefault();
              event.stopPropagation();
              onEnterServerTag();
            }
          }}
          slotProps={{
            htmlInput: {
              placeholder: '서버를 설명하는 태그',
            },
          }}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            setDupliacateErrorText('');
          }}
          // label="서버를 설명하는 태그를 추가하세요"
          helperText={dupliacateErrorText}
          error={!!dupliacateErrorText}
          fullWidth
        />
      </FlexBox>
      <Divider flexItem orientation="horizontal" />
      <FlexBox sx={{ flexWrap: 'wrap', paddingTop: 1, columnGap: 1, minHeight: 40 }}>
        {serverTags.map((tag, idx) => (
          <Chip label={tag} onDelete={() => onDeleteServerTag(idx)} key={`server-tag-${idx}`} />
        ))}
      </FlexBox>
    </FlexBox>
  );
}

function ServerServiceTime() {
  const methods = useFormContext<ServerPostSchema>();

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
