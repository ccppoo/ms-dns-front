import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox, FlexPaper, Image } from '@/components/styled';
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
        <ClaimedDomains />
        <CreatedServers />
      </FlexBox>
    </Container>
  );
}
