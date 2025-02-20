import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { Divider, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

import { FlexBox, FlexPaper, Image, VisuallyHiddenInput } from '@/components/styled';
import type { ServerPostSchema } from '@/schema/post/server_profile';

import ServerLogoSelect from './components/ServerLogoSelect';

// NOTE: 게시글 외에도 OutputData 하고 추가로 관리할 데이터들
// 1. 수정하는 경우 -> 이미지 삭제시 최종 POST 할 때 삭제할 이미지 첨부하기

interface ServerVersionIntf {
  readOnly: boolean;
}

function ServerTags() {
  const methods = useFormContext<ServerPostSchema>();
  const serverTags = methods.watch('server_info.tags')!;
  const [tagInput, setTagInput] = React.useState<string>('');

  const [dupliacateErrorText, setDupliacateErrorText] = React.useState<string>('');

  const onEnterServerTag = () => {
    const prevTags = methods.getValues('server_info.tags')!;
    if (prevTags.includes(tagInput)) {
      setDupliacateErrorText('이미 존재하는 태그입니다');
      return;
    }
    methods.setValue('server_info.tags', [...prevTags, tagInput]);
    setTagInput('');
  };

  const onDeleteServerTag = (tagIdx: number) => {
    const prevTags = methods.getValues('server_info.tags')!;
    const removedTags = prevTags.filter((_, idx) => idx !== tagIdx);
    methods.setValue('server_info.tags', [...removedTags]);
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
            if (event.key.toLowerCase() === 'enter') {
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

  const service24hr = methods.watch('server_info.service24hr');
  const serviceTerm = methods.watch('server_info.service_term');

  const onChangeServiceTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    methods.setValue('server_info.service_term', (event.target as HTMLInputElement).value);
  };

  const onChangeService24hr = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ('true' === (event.target as HTMLInputElement).value) {
      methods.setValue('server_info.service24hr', true);
    } else {
      methods.setValue('server_info.service24hr', false);
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
          <RadioGroup row name="service_term" value={serviceTerm} onChange={onChangeServiceTerm}>
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

function ServerAddress() {
  const methods = useFormContext<ServerPostSchema>();

  const serverAddress = methods.watch('server_info.server_address');
  const [errorText, setErrorText] = React.useState<string>('');
  const helperText = 'IP 주소 : 1.1.1.1 / 도메인 : example.mc-server.kr';
  const onChangeServerAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    methods.setValue('server_info.server_address', (event.target as HTMLInputElement).value);
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 0, paddingTop: 1, paddingBottom: 2 }}>
      {/* 운영 기간 */}
      <FlexBox sx={{ alignItems: 'center' }}>
        <TextField
          value={serverAddress}
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            !!errorText && setErrorText('');
            event.preventDefault();
            event.stopPropagation();
            onChangeServerAddress(event);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key.toLowerCase() === 'enter') {
              event.preventDefault();
              event.stopPropagation();
              // onEnterServerTag();
            }
          }}
          slotProps={{
            htmlInput: {
              placeholder: '1.1.1.1, abc.mc-server.kr',
            },
          }}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            // setDupliacateErrorText('');
          }}
          // label="서버를 설명하는 태그를 추가하세요"
          helperText={helperText}
          error={!!errorText}
          fullWidth
        />
      </FlexBox>
    </FlexBox>
  );
}

export default function ServerInfo(props: ServerVersionIntf) {
  const { readOnly } = props;
  const methods = useFormContext<ServerPostSchema>();

  // TODO: 서버에서 버전 정보 가져오기

  if (!readOnly) {
    return (
      <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
        <Typography>서버 로고</Typography>
        <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
          <ServerLogoSelect />
        </FlexPaper>
        <Typography>서버 주소</Typography>

        <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
          <ServerAddress />
        </FlexPaper>

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

  const default_icon = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';
  const readServerLogo = methods.getValues('server_info.server_logo') || default_icon;
  const readServer24hr = methods.getValues('server_info.service24hr');
  const readServiceTerm = methods.getValues('server_info.service_term')!;
  const readServerTags = methods.getValues('server_info.tags')!;

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
      <Typography>서버 로고</Typography>
      <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
        <FlexBox
          sx={{
            width: 150,
            height: 150,
            flexShrink: 0,
            padding: 0.5,
            justifyContent: 'center',
          }}
        >
          <Image
            src={readServerLogo}
            sx={{
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            }}
          />
        </FlexBox>
      </FlexPaper>

      <Typography>서버 운영 시간</Typography>
      <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
        {readServer24hr ? '24시간 운영' : '24시간 운영 X'}
      </FlexPaper>

      <Typography>서버 태그</Typography>
      <FlexPaper sx={{ flexWrap: 'wrap', columnGap: 1 }}>
        {readServerTags.map((tag, idx) => (
          <Chip label={tag} key={`server-tag-${idx}`} />
        ))}
      </FlexPaper>
    </FlexBox>
  );
}
