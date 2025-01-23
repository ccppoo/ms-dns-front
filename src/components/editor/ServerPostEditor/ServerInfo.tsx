import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Box, Button, Divider, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import { join } from 'path';

import { uploadMCServerIcon } from '@/api/image/mcServerIconUpload';
import { uploadImage } from '@/api/image/postImageUpload';
import { FlexBox, FlexPaper, Image, VisuallyHiddenInput } from '@/components/styled';
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
    const removedTags = prevTags.filter((_, idx) => idx != tagIdx);
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

  const service24hr = methods.watch('server_info.service24hr');
  const serviceTerm = methods.watch('server_info.service_term');

  const onChangeServiceTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    methods.setValue('server_info.service_term', (event.target as HTMLInputElement).value);
  };

  const onChangeService24hr = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ('true' == (event.target as HTMLInputElement).value) {
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

function ServerLogo() {
  const methods = useFormContext<ServerPostSchema>();

  const default_icon = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';
  const server_logo = methods.watch('server_info.server_logo');
  const [imageInfoMsg, setImageInfoMsg] = React.useState<string>('');

  const handleUploadClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageInfoMsg('');
    e.preventDefault();
    e.persist();
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    // setImageFileBuffer(selectedFile);
    // const temp = URL.createObjectURL(selectedFile);
    // methods.setValue('server_info.server_logo', temp);

    console.log(`이미지 업로드 중..`);
    const { success, file: file_ } = await uploadMCServerIcon(selectedFile);
    if (success != 1) {
      // console.log(`에러!`);
      setImageInfoMsg('이미지 사이즈 형식이 옯바르지 않습니다.');
      return;
    }
    const { url } = file_;
    methods.setValue('server_info.server_logo', url);
    return;

    return;
  };

  const onClickRemoveImage = () => {
    methods.setValue('server_info.server_logo', undefined);
  };

  console.log(`server_logo : ${server_logo}`);

  return (
    <FlexBox sx={{}}>
      {/* 서버 아이콘 */}
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
          src={server_logo || default_icon}
          sx={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
            opacity: !server_logo ? 0.5 : 1,
          }}
        />
      </FlexBox>
      <Divider flexItem orientation="vertical" />
      <FlexBox sx={{ flexDirection: 'column', width: '100%', paddingY: 1 }}>
        <FlexBox sx={{ height: '100%', flexDirection: 'column' }}>
          <Typography>아이콘은 PNG 형식이여야하며, 64x64 사이즈이여야 합니다.</Typography>
          {imageInfoMsg && <Typography color="red">{imageInfoMsg}</Typography>}
        </FlexBox>
        <FlexBox sx={{ width: '100%', justifyContent: 'end', columnGap: 1 }}>
          <Button
            color="error"
            variant="contained"
            size="small"
            sx={{ paddingY: '2px', paddingX: '2px' }}
            startIcon={<DeleteOutlineOutlinedIcon />}
            disabled={!server_logo}
            onClick={onClickRemoveImage}
          >
            삭제
          </Button>
          <Button
            color="info"
            variant="outlined"
            size="small"
            sx={{ paddingY: '2px', paddingX: '2px' }}
            // startIcon={<DeleteOutlineOutlinedIcon />}
            disabled={!server_logo}
            onClick={onClickRemoveImage}
          >
            기본 아이콘
          </Button>
          <Controller
            name="server_info.server_logo"
            control={methods.control}
            rules={{
              required: {
                value: true,
                message: 'you sould provide image',
              },
            }}
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <Button
                variant="outlined"
                disabled={!!server_logo}
                startIcon={<FileUploadOutlined />}
                component={'label'}
                size="small"
              >
                아이콘 업로드
                <VisuallyHiddenInput
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  type="file"
                  multiple={false}
                  accept=".png"
                  onChange={(e) => {
                    handleUploadClick(e);
                    methods.trigger('server_info.server_logo');
                  }}
                />
              </Button>
            )}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox sx={{ alignItems: 'center' }}>
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}></FlexBox>
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
            if (event.key.toLowerCase() == 'enter') {
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
        <Typography>서버 아이콘</Typography>
        <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
          <ServerLogo />
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
      <Typography>서버 아이콘</Typography>
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
        {readServer24hr ? '24시간 운영' : '24시간 운영 x'}
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
