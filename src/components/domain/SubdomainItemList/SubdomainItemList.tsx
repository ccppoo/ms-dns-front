import { Typography } from '@mui/material';

import { FlexBox } from '@/components/styled';
import type { UserSubdomainInfo } from '@/schema/domain';

import EmptySubdomainItem from './EmptySubdomainItem';
import SubdomainItem from './SubdomainItem';

const MAX_PERSONAL_DOMAINS = 3;

interface ISubdomainItemList {
  subdomains: UserSubdomainInfo[];
}

export default function SubdomainItemList(props: ISubdomainItemList) {
  const { subdomains } = props;

  const currentRegisteredDomain = subdomains.length;
  const empty = MAX_PERSONAL_DOMAINS - subdomains.length;

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
      <FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <Typography variant="subtitle1">현재 사용중인 도메인</Typography>
          <Typography variant="subtitle1">
            {currentRegisteredDomain}/{MAX_PERSONAL_DOMAINS}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox sx={{ rowGap: 2, flexDirection: 'column' }}>
        {subdomains.map((userSubdomain) => (
          <SubdomainItem
            userSubdomain={userSubdomain}
            key={`user-sub-domain-${userSubdomain.name}`}
          />
        ))}
        {[...Array(empty).keys()].map((_, idx) => (
          <EmptySubdomainItem key={`empty-user-subdomain-${idx}`} />
        ))}
      </FlexBox>
    </FlexBox>
  );
}
