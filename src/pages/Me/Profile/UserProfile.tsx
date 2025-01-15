import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox, FlexPaper, Image, VisuallyHiddenInput } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import api from '@/pages/Me/api';

const CLAIMED_DOMAIN = [
  {
    domain: '7percent.mc-server.kr',
    createdAt: new Date('2024-11-10 15:00'),
  },
];

const CREATED_SERVER = [
  {
    name: '7% 갤 마크 서버',
    domain: '7percent.mc-server.kr',
    createdAt: new Date('2024-11-10 18:00'),
  },
  {
    name: '재밌는 마크 서버',
    domain: 'funfun.mc-server.kr',
    createdAt: new Date('2024-11-12 18:00'),
  },
];

function ProfileHead() {
  const [profile] = useUserProfile();
  return (
    <FlexPaper sx={{ columnGap: 2, paddingY: 1 }}>
      <FlexBox sx={{ padding: 1 }}>
        <Image src={profile.profileImage} sx={{ width: 100, height: 100 }} />
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <Typography variant="h5">{profile.nickname}</Typography>
        <Typography variant="caption">{profile.uid}</Typography>
      </FlexBox>
    </FlexPaper>
  );
}

function ServerIcon() {
  const default_icon = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';

  const server_logo = undefined;
  const handleUploadClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();

    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    const image_to_upload = URL.createObjectURL(selectedFile);
    // methods.setValue('server_info.server_logo', image_to_upload);
  };

  const onClickRemoveImage = () => {
    // methods.setValue('server_info.server_logo', undefined);
  };

  return (
    <FlexBox
      sx={{
        width: '25%',
        maxWidth: 175,

        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: 1,
      }}
    >
      <FlexPaper
        sx={{
          maxWidth: 175,
          aspectRatio: '1/1',
          maxHeight: 175,
          flexShrink: 0,
          padding: 0.5,
          justifyContent: 'center',
        }}
        elevation={3}
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
      </FlexPaper>
      <FlexBox sx={{ justifyContent: 'space-between' }}>
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
          variant="outlined"
          disabled={!!server_logo}
          startIcon={<FileUploadOutlined />}
          component={'label'}
          size="small"
        >
          업로드
          <VisuallyHiddenInput
            // ref={ref}
            // name={name}
            // onBlur={onBlur}
            type="file"
            multiple
            accept=".jpg, .jpeg, .png, .webp, .svg"
            onChange={(e) => {
              handleUploadClick(e);
            }}
          />
        </Button>
      </FlexBox>
    </FlexBox>
  );
}

function ServerIcons() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <FlexBox>
        <Typography>서버 아이콘</Typography>
      </FlexBox>
      <FlexPaper sx={{ flexWrap: 'wrap', padding: 1, rowGap: 1, justifyContent: 'space-around' }}>
        <ServerIcon />
        <ServerIcon />
        <ServerIcon />
        <ServerIcon />
      </FlexPaper>
    </FlexBox>
  );
}

function ClaimedDomains() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <FlexBox>
        <Typography>등록한 도메인</Typography>
      </FlexBox>
      <FlexPaper sx={{ padding: 2, flexDirection: 'column' }}>
        {CLAIMED_DOMAIN.map((claimedDomain, idx) => (
          <FlexBox sx={{ columnGap: 1 }} key={`claimed-domain-${idx}`}>
            <Typography>{claimedDomain.domain}</Typography>
            <Typography>등록일 : {claimedDomain.createdAt.toLocaleDateString()}</Typography>
          </FlexBox>
        ))}
      </FlexPaper>
    </FlexBox>
  );
}

function CreatedServers() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <FlexBox>
        <Typography>등록한 서버</Typography>
      </FlexBox>
      <FlexPaper sx={{ padding: 2, flexDirection: 'column', rowGap: 2 }}>
        {CREATED_SERVER.map((createdServer, idx) => (
          <FlexBox sx={{ flexDirection: 'column' }} key={`created-server-${idx}`}>
            <Typography>서버 이름 : {createdServer.name}</Typography>
            <Typography>서버 URL : {createdServer.domain}</Typography>
            <Typography>등록일 : {createdServer.createdAt.toLocaleDateString()}</Typography>
          </FlexBox>
        ))}
      </FlexPaper>
    </FlexBox>
  );
}

export default function MyProfile() {
  // '/me/profile'

  const { data } = useQuery({
    queryKey: [],
    queryFn: api.queryFn.getMyProfile,
  });

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ flexDirection: 'column', paddingY: 2, rowGap: 3 }}>
        <ProfileHead />
        <ServerIcons />
        <ClaimedDomains />
        <CreatedServers />
      </FlexBox>
    </Container>
  );
}
