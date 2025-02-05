import { Box, Button, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import serverProfilePostApi from '@/api/post/server_profile';
import userApi from '@/api/user';
import MyRegisteredDomains from '@/components/domain/MySubdomains';
import ServerIconList from '@/components/server_logo/ServerLogoList';
import { FlexBox, FlexPaper, Image } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import { ServerProfileListItem } from '@/pages/Server/ProfileList/ProfileList';

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

function MyServerProfiles() {
  const [{ uid: userID }] = useUserProfile();

  const { data } = useQuery({
    queryKey: ['server list', { page: 1, limit: 5 }, { creator: userID }],
    queryFn: serverProfilePostApi.queryFn.getServerProfilePostList,
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
  const [{ uid }] = useUserProfile();

  const { data } = useQuery({
    queryKey: ['get my profile', uid!],
    queryFn: userApi.queryFn.getUserProfile,
    enabled: !!uid,
  });

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
