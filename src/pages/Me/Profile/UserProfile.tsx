import { useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Box, Button, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { FlexBox, FlexPaper, Image, VisuallyHiddenInput } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import api from '@/pages/Me/api';
import { ServerProfileListItem } from '@/pages/Server/ProfileList/ProfileList';
import serverListApi from '@/pages/Server/api';
import serverPostApi from '@/pages/Server/api';

import type {
  UserDomain,
  UserDomains,
  UserSubdomainInfo,
  UserSubdomainRecord,
  UserSubdomains,
} from '../models';

const MAX_PERSONAL_DOMAINS = 3;

function ProfileHead() {
  const [profile] = useUserProfile();
  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
      <FlexBox>
        <Typography variant="h5">내 프로필</Typography>
      </FlexBox>
      <FlexPaper sx={{ columnGap: 2, paddingY: 1 }}>
        <FlexBox sx={{ padding: 1 }}>
          <Image src={profile.profileImage} sx={{ width: 100, height: 100 }} />
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <Typography variant="h5">{profile.nickname}</Typography>
          <Typography variant="caption">{profile.uid}</Typography>
        </FlexBox>
      </FlexPaper>
    </FlexBox>
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
    <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
      <FlexBox>
        <Typography variant="h5">서버 아이콘</Typography>
      </FlexBox>
      <FlexPaper sx={{ flexWrap: 'wrap', padding: 1, rowGap: 1, justifyContent: 'space-around' }}>
        <ServerIcon />
        <ServerIcon />
        <ServerIcon />
      </FlexPaper>
    </FlexBox>
  );
}

function SubdomainItem({ userSubdomain }: { userSubdomain: UserSubdomainInfo }) {
  const fullDomain = `${userSubdomain.subdomain}.${userSubdomain.domain}`;

  const createdAt = userSubdomain.createdAt;
  return (
    <FlexPaper sx={{ columnGap: 1, paddingY: 1, paddingX: 2, flexDirection: 'column' }}>
      <FlexBox sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" fontSize={21}>
          {fullDomain}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ columnGap: 1, flexDirection: 'column', rowGap: 1 }}>
        <Typography variant="body2">
          등록일 : {createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}
        </Typography>
      </FlexBox>
    </FlexPaper>
  );
}

function EmptySubdomainItem() {
  const message = '새로운 도메인을 등록할 수 있습니다!';

  return (
    <Paper
      component={Link}
      sx={{
        paddingY: 1,
        paddingX: 2,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#d7d9d7',
        display: 'flex',
      }}
      to={'/domain/register'}
      style={{ color: 'black', textDecoration: 'none' }}
    >
      <Typography>{message}</Typography>
    </Paper>
  );
}

function MyRegisteredDomainList({ subdomains }: { subdomains: UserSubdomains }) {
  const empty = MAX_PERSONAL_DOMAINS - subdomains.subdomains.length;

  return (
    <>
      {subdomains.subdomains.map((userSubdomain) => (
        <SubdomainItem
          userSubdomain={userSubdomain}
          key={`user-sub-domain-${userSubdomain.name}`}
        />
      ))}
      {[...Array(empty).keys()].map((_, idx) => (
        <EmptySubdomainItem key={`empty-user-subdomain-${idx}`} />
      ))}
    </>
  );
}

function MyRegisteredDomains() {
  const [{ uid: userID }] = useUserProfile();
  const { data, isSuccess } = useQuery({
    queryKey: ['getMyDomain', 'my domains'],
    queryFn: api.queryFn.getMyDomains,
    enabled: !!userID,
  });
  const [currentRegisteredDomain, setCurrentRegisteredDomain] = useState<number>(0);

  useEffect(() => {
    if (isSuccess) {
      setCurrentRegisteredDomain(data.subdomains.length);
    }
  }, [isSuccess, data, setCurrentRegisteredDomain]);

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
      <FlexBox>
        <Typography variant="h5">내 도메인</Typography>
      </FlexBox>
      <FlexBox sx={{ columnGap: 1 }}>
        <Typography variant="subtitle1">현재 사용중인 도메인</Typography>
        <Typography variant="subtitle1">
          {currentRegisteredDomain}/{MAX_PERSONAL_DOMAINS}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ rowGap: 1.5, flexDirection: 'column' }}>
        {isSuccess ? <MyRegisteredDomainList subdomains={data} /> : <CircularProgress />}
      </FlexBox>
    </FlexBox>
  );
}

function MyServerProfiles() {
  const [{ uid: userID }] = useUserProfile();

  const { data } = useQuery({
    queryKey: ['server list', { page: 1, limit: 5 }, { creator: userID }],
    queryFn: serverListApi.queryFn.getServerProfilePostList,
    enabled: !!userID,
  });

  // console.log(`userID : ${userID}`);

  // console.log(`data : ${JSON.stringify(data)}`);
  if (!!data) {
    const listingItems = data.list;

    return (
      <FlexBox sx={{ paddingY: 0, flexDirection: 'column', rowGap: 2 }}>
        <FlexBox>
          <Typography variant="h5">작성한 서버 프로필</Typography>
        </FlexBox>
        <FlexBox sx={{ minHeight: 300 }}>
          {listingItems.map((item) => (
            <ServerProfileListItem serverProfileListing={item} key={item.id} />
          ))}
        </FlexBox>
      </FlexBox>
    );
  }
  return (
    <FlexBox sx={{ paddingY: 0, flexDirection: 'column', rowGap: 2 }}>
      <CircularProgress />
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
      <FlexBox sx={{ flexDirection: 'column', paddingY: 2, rowGap: 4 }}>
        <ProfileHead />
        <ServerIcons />
        <MyRegisteredDomains />
        <MyServerProfiles />
      </FlexBox>
    </Container>
  );
}
