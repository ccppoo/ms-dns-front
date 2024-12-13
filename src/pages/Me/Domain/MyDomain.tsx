import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox, FlexPaper } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import type {
  UserDomain,
  UserDomains,
  UserSubdomainInfo,
  UserSubdomainRecord,
  UserSubdomains,
} from '@/pages/Me/models';
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

function SubdomainRecordValue({ value }: { value: string }) {
  return (
    <FlexBox>
      <Typography>{value}</Typography>
    </FlexBox>
  );
}

function SubdomainRecord({ userSubdomainRecord }: { userSubdomainRecord: UserSubdomainRecord }) {
  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ flex: '1 1 10%', justifyContent: 'center' }}>
        <FlexBox sx={{ border: '1px solid black', borderRadius: 2 }}>
          <Typography variant="h6">{userSubdomainRecord.recordType}</Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox sx={{ flex: '1 1 20%', justifyContent: 'center' }}>
        <Typography>{userSubdomainRecord.name}</Typography>
      </FlexBox>
      <FlexBox sx={{ flex: '1 1 70%' }}>
        <FlexBox sx={{ flexDirection: 'column' }}>
          {userSubdomainRecord.values.map((recordValue, idx) => (
            <SubdomainRecordValue value={recordValue} key={`recordValue-${recordValue}`} />
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function SubdomainItem({ userSubdomain }: { userSubdomain: UserSubdomainInfo }) {
  const fullDomain = `${userSubdomain.subdomain}.${userSubdomain.domain}`;

  return (
    <FlexPaper sx={{ columnGap: 2, flexDirection: 'column', paddingY: 1, paddingX: 2 }}>
      <FlexBox sx={{ paddingY: 1 }}>
        <Typography variant="h5">{userSubdomain.name}</Typography>
      </FlexBox>
      <FlexBox sx={{ columnGap: 1, flexDirection: 'column', rowGap: 1 }}>
        {userSubdomain.records.map((subdominRecord, idx) => (
          <SubdomainRecord
            userSubdomainRecord={subdominRecord}
            key={`subdominRecord-${subdominRecord.name}-${subdominRecord.recordType}`}
          />
        ))}
      </FlexBox>
    </FlexPaper>
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
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingY: 3 }}></FlexBox>

      {isSuccess && (
        <FlexBox sx={{ rowGap: 2, flexDirection: 'column' }}>
          {data?.subdomains.map((userSubdomain) => (
            <SubdomainItem
              userSubdomain={userSubdomain}
              key={`user-sub-domain-${userSubdomain.name}`}
            />
          ))}
        </FlexBox>
      )}
    </Container>
  );
}
