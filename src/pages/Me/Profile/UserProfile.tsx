import { useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Box, Button, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import ServerIconList from '@/components/server_logo/ServerLogoList';
import ServerIconPreview from '@/components/server_logo/ServerLogoPreview';
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
  const [{ uid }] = useUserProfile();

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ flexDirection: 'column', paddingY: 2, rowGap: 4 }}>
        <ProfileHead />
        <ServerIconList editable uid={uid!} />
        <MyRegisteredDomains />
        <MyServerProfiles />
      </FlexBox>
    </Container>
  );
}
