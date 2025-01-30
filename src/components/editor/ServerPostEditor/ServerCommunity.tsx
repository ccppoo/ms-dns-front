import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import { Grid2 } from '@mui/material';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { ExternalLinkNewTab, FlexBox, FlexPaper, Image } from '@/components/styled';
// NOTE: 게시글 외에도 OutputData 하고 추가로 관리할 데이터들
// 1. 수정하는 경우 -> 이미지 삭제시 최종 POST 할 때 삭제할 이미지 첨부하기
import { icon, sample } from '@/static';

import type { ServerPostSchema } from './models';

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

function CommunitySelectMenuItem({ value }: { value: string }) {
  return <MenuItem></MenuItem>;
}

type Commu = {
  value: string;
  ko: string;
  icon?: string;
};

function ServerHrefButton({ name, url }: { name: string; url: string }) {
  const imageIcon = {
    discord: icon.discordIconBlue,
    kakaoTalk: icon.kakaoTalk,
    naverCafe: icon.naverCafe,
    bluemap: icon.bluemap,
  }[name];
  return (
    <ExternalLinkNewTab href={url}>
      <FlexBox
        sx={{
          border: '1px black solid',
          borderRadius: 2,
          alignItems: 'center',
          columnGap: 1,
          padding: 0.5,
          fontStyle: 'normal',
        }}
      >
        {!!imageIcon ? (
          <Image src={imageIcon} sx={{ width: 30, height: 30 }} />
        ) : (
          <LanguageOutlinedIcon sx={{ width: 30, height: 30 }} />
        )}
        <Typography>{url}</Typography>
      </FlexBox>
    </ExternalLinkNewTab>
  );
}

function ServerCommunityRowItem({ idx }: { idx: number }) {
  const methods = useFormContext<ServerPostSchema>();
  const srvCommunity = methods.watch(`server_community.${idx}`)!;

  const imageIcon = {
    discord: icon.discordIconBlue,
    kakaoTalk: icon.kakaoTalk,
    naverCafe: icon.naverCafe,
    bluemap: icon.bluemap,
  }[srvCommunity.service];

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const updateSrvCommunity = (value: string) => {
    methods.setValue(`server_community.${idx}.url`, value);
  };

  const onEnterServerCommunityLinkEdit = () => {
    const linkValue = methods.getValues(`server_community.${idx}.url`)!;

    // check link regex
    // methods.setValue(`server_community.${idx}.url`, 'value');
    setEditMode(false);
  };

  const onClickEdit = () => {
    setEditMode(true);
  };

  const onClickCancelEdit = () => {
    setEditMode(false);
  };

  const onClickDelete = () => {
    const commu = methods.getValues('server_community')!;
    const commu_filt = commu.filter((_, c_idx) => c_idx != idx);
    methods.setValue('server_community', commu_filt);
  };

  return (
    <FlexBox
      sx={{
        width: '100%',
        alignItems: 'center',
        height: 60,
        columnGap: 1,
        paddingX: 1,
      }}
    >
      <FlexPaper
        sx={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
        <FlexBox sx={{ padding: 1 }}>
          {!!imageIcon ? (
            <Image src={imageIcon} sx={{ width: 45, height: 45 }} />
          ) : (
            <LanguageOutlinedIcon sx={{ width: 45, height: 45 }} />
          )}
        </FlexBox>
        {!editMode ? (
          <FlexBox
            sx={{
              // alignItems: 'center',
              paddingLeft: 1,
              width: '100%',
              height: '100%',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">{srvCommunity.name}</Typography>
            <Typography variant="body2">{srvCommunity.url}</Typography>
          </FlexBox>
        ) : (
          <FlexBox sx={{ alignItems: 'center', paddingLeft: 1, width: '100%', height: '100%' }}>
            <TextField
              value={srvCommunity.url}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                // !!dupliacateErrorText && setDupliacateErrorText('');
                event.preventDefault();
                event.stopPropagation();
                updateSrvCommunity(event.target.value);
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key.toLowerCase() == 'enter') {
                  event.preventDefault();
                  event.stopPropagation();
                  onEnterServerCommunityLinkEdit();
                }
              }}
              size="small"
            />
          </FlexBox>
        )}
      </FlexPaper>
      <FlexBox sx={{ height: '100%' }}>
        {!!editMode ? (
          <IconButton onClick={onClickCancelEdit}>
            <RefreshIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        ) : (
          <IconButton onClick={onClickEdit}>
            <ModeEditIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
        )}
        <IconButton onClick={onClickDelete}>
          <DeleteIcon sx={{ width: 30, height: 30 }} />
        </IconButton>
      </FlexBox>
    </FlexBox>
  );
}

function ServerCommunityAdd() {
  const methods = useFormContext<ServerPostSchema>();

  const communities: Commu[] = [
    {
      value: 'discord',
      ko: '디스코드',
      icon: icon.discordIconBlue,
    },
    {
      value: 'kakaoTalk',
      ko: '카카오톡',
      icon: icon.kakaoTalk,
    },
    {
      value: 'naverCafe',
      ko: '네이버 카페',
      icon: icon.naverCafe,
    },
    {
      value: 'bluemap',
      ko: '블루 맵',
      icon: icon.bluemap,
    },
    {
      value: 'other',
      ko: '기타',
    },
  ];

  const [communitySelection, setCommunitySelection] = React.useState('discord');
  const [communityName, setCommunityName] = React.useState('');
  const [communityURLInput, setCommunityLinkInput] = React.useState('');

  const onChangeCommunity = (event: SelectChangeEvent) => {
    setCommunitySelection(event.target.value);
  };

  const [errorText, setErrorText] = React.useState<string>('');

  const commus = methods.watch('server_community')!;

  const onEnterServerCommunity = () => {
    const prevCommu = methods.getValues('server_community')!;

    const duplicated = !!prevCommu.find(
      ({ name, url }) => name == communitySelection && url == communityURLInput,
    );
    if (duplicated) {
      setErrorText('중복');
      return;
    }

    methods.setValue('server_community', [
      ...prevCommu,
      {
        name: communityName,
        service: communitySelection,
        url: communityURLInput,
      },
    ]);
    setCommunitySelection('discord');
    setCommunityLinkInput('');
    setCommunityName('');
  };

  const onClickAddServerCommunity = () => {
    console.log(`onClickAddServerCommunity`);
    const prevCommu = methods.getValues('server_community')!;

    const duplicated = !!prevCommu.find(
      ({ name, url }) => name == communitySelection && url == communityURLInput,
    );
    if (duplicated) {
      setErrorText('중복');
      return;
    }

    methods.setValue('server_community', [
      ...prevCommu,
      {
        name: communityName,
        service: communitySelection,
        url: communityURLInput,
      },
    ]);
    setCommunitySelection('discord');
    setCommunityLinkInput('');
    setCommunityName('');
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 1.5, paddingY: 1 }}>
      {/* 운영 기간 */}
      <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
        <FlexBox sx={{ justifyContent: 'start', height: '100%' }}>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={communitySelection}
            onChange={onChangeCommunity}
            autoWidth
            size="small"
          >
            {communities.map((comu, idx) => {
              return (
                <MenuItem value={comu.value} key={`commu-select-${idx}`}>
                  <FlexBox sx={{ columnGap: 1, alignItems: 'center' }}>
                    {!!comu.icon ? (
                      <Image src={comu.icon} sx={{ width: 30, height: 30 }} />
                    ) : (
                      <LanguageOutlinedIcon sx={{ width: 30, height: 30 }} />
                    )}
                    <Typography>{comu.ko}</Typography>
                  </FlexBox>
                </MenuItem>
              );
            })}
          </Select>
        </FlexBox>
        {/* <Divider flexItem orientation="vertical" /> */}
        <Grid2
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            // flexDirection: 'column',
            rowGap: 1,
          }}
          columnSpacing={1}
          container
        >
          <Grid2 size={{ sm: 12, md: 3 }}>
            <TextField
              value={communityName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                !!errorText && setErrorText('');
                event.preventDefault();
                event.stopPropagation();
                setCommunityName(event.target.value);
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key.toLowerCase() == 'enter') {
                  event.preventDefault();
                  event.stopPropagation();
                  // onEnterServerCommunity();
                }
              }}
              slotProps={{
                htmlInput: {
                  placeholder: '이름 입력하세요',
                },
              }}
              helperText={errorText}
              error={!!errorText}
              fullWidth
              size="small"
            />
          </Grid2>
          <Grid2 size={{ sm: 12, md: 9 }}>
            <TextField
              value={communityURLInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                !!errorText && setErrorText('');
                event.preventDefault();
                event.stopPropagation();
                setCommunityLinkInput(event.target.value);
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key.toLowerCase() == 'enter') {
                  event.preventDefault();
                  event.stopPropagation();
                  onEnterServerCommunity();
                }
              }}
              slotProps={{
                htmlInput: {
                  placeholder: '링크를 입력하세요',
                },
              }}
              helperText={errorText}
              error={!!errorText}
              fullWidth
              size="small"
            />
          </Grid2>
        </Grid2>
        <FlexBox sx={{ width: 'fit-content' }}>
          <Button variant="contained" onClick={onClickAddServerCommunity}>
            추가
          </Button>
        </FlexBox>
      </FlexBox>
      <Divider flexItem />
      <FlexBox sx={{ paddingY: 1, flexDirection: 'column', rowGap: 1 }}>
        {commus.map((commu, idx) => {
          return <ServerCommunityRowItem key={`commu-upload-${idx}`} idx={idx} />;
        })}
      </FlexBox>
    </FlexBox>
  );
}

export default function ServerCommunity(props: ServerVersionIntf) {
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
        <Typography>서버 커뮤니티</Typography>
        <FlexPaper sx={{ paddingX: 1, flexDirection: 'column' }}>
          <ServerCommunityAdd />
        </FlexPaper>
      </FlexBox>
    );
  }

  return <Typography>{titleValue}</Typography>;
}
