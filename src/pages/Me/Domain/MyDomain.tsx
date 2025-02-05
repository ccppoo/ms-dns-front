import { Container, Typography } from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import domainApi from '@/api/domain';
import SubdomainItemList from '@/components/domain/SubdomainItemList';
import { FlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

export default function MyDomain() {
  const [{ uid }] = useUserProfile();

  const { data } = useQuery({
    queryKey: ['getMyDomain', uid!],
    queryFn: domainApi.queryFn.getUserDomains,
    enabled: !!uid,
    retry: 1,
  });

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingY: 3 }}>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <Typography variant="h4">내 도메인</Typography>
        </FlexBox>
      </FlexBox>
      {!!data && <SubdomainItemList subdomains={data.subdomains} />}
    </Container>
  );
}
