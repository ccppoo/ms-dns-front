import { useEffect, useState } from 'react';

import { Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import domainApi from '@/api/domain';
import { FlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import type { UserSubdomainInfo, UserSubdomains } from '@/schema/domain';

const MAX_PERSONAL_DOMAINS = 3;

function SubdomainItem({ userSubdomain }: { userSubdomain: UserSubdomainInfo }) {
  const fullDomain = `${userSubdomain.subdomain}.${userSubdomain.domain}`;

  const createdAt = userSubdomain.createdAt;
  return (
    <Paper
      sx={{ columnGap: 1, paddingY: 1, paddingX: 2, flexDirection: 'column' }}
      component={Link}
      to={'/me/domain'}
      style={{ color: 'black', textDecoration: 'none' }}
    >
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
    </Paper>
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

export default function MyRegisteredDomains() {
  const [{ uid }] = useUserProfile();
  const { data, isSuccess } = useQuery({
    queryKey: ['getMyDomain', uid!],
    queryFn: domainApi.queryFn.getUserDomains,
    enabled: !!uid,
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
