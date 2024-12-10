import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import type { UserDomain, UserDomains, UserProfile } from '@/pages/Me/models';
import api from '@/pages/User/api';

import apiii from '../api';

function DNSRecordValues({ values }: { values: string[] }) {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      {values.map((value, idx) => (
        <Typography key={idx}>{value}</Typography>
      ))}
    </FlexBox>
  );
}

function DomainItem({ userDomain }: { userDomain: UserDomain }) {
  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox>{userDomain.recordType}</FlexBox>
      <FlexBox sx={{ columnGap: 1 }}>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>Name</FlexBox>

          <FlexBox>{userDomain.name}</FlexBox>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>Values</FlexBox>
          <DNSRecordValues values={userDomain.values} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default function MyDomain() {
  // /me/server

  const [userProfile] = useUserProfile();

  const { data, isSuccess } = useQuery({
    queryKey: ['getMyDomain', userProfile.uid || ''],
    queryFn: apiii.queryFn.getMyDomains,
    enabled: !!userProfile.uid,
  });

  return (
    <Container sx={{ height: '100%' }} maxWidth={'xl'}>
      <FlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          paddingY: 3,
          rowGap: 2,
        }}
      >
        my domain page
      </FlexBox>
      {isSuccess && (
        <FlexBox sx={{ rowGap: 2, flexDirection: 'column' }}>
          {data?.domain.map((userDomain) => (
            <DomainItem
              userDomain={userDomain}
              key={`${userDomain.recordType}-${userDomain.name}`}
            />
          ))}
        </FlexBox>
      )}
    </Container>
  );
}
