import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import type { UserDomain, UserDomains, UserSubdomainInfo, UserSubdomains } from '@/pages/Me/models';
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

function SubomainItem({ userSubdomain }: { userSubdomain: UserSubdomainInfo }) {
  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox>{userSubdomain.name}</FlexBox>
      <FlexBox sx={{ columnGap: 1 }}>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>Name</FlexBox>

          <FlexBox>{userSubdomain.name}</FlexBox>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>Values</FlexBox>
          {/* <DNSRecordValues values={userSubdomain.} /> */}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default function MyDomain() {
  const [userProfile] = useUserProfile();

  const { data, isSuccess } = useQuery({
    queryKey: ['getMyDomain', userProfile.uid || ''],
    queryFn: apiii.queryFn.getMyDomains,
    enabled: !!userProfile.uid,
  });

  console.log(`data : ${JSON.stringify(data)}`);

  return (
    <Container sx={{ height: '100%' }} maxWidth={'lg'}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingY: 3 }}></FlexBox>

      {isSuccess && (
        <FlexBox sx={{ rowGap: 2, flexDirection: 'column' }}>
          {data?.subdomains.map((userSubdomain) => (
            <SubomainItem
              userSubdomain={userSubdomain}
              key={`user-sub-domain-${userSubdomain.name}`}
            />
          ))}
        </FlexBox>
      )}
    </Container>
  );
}
