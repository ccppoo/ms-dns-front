import { useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';

import api from '../api';

interface IDomainSearchResultLoading {
  domain: string;
  subdomain: string;
}

function DomainSearchResultLoading(props: IDomainSearchResultLoading) {
  const { domain, subdomain } = props;

  const fullDomain = `${subdomain}.${domain}`;
  return (
    <FlexBox
      sx={{
        width: '100%',
        justifyContent: 'center',
        rowGap: 1,
        flexDirection: 'column',
      }}
    >
      <FlexBox sx={{ width: '100%', justifyContent: 'center' }}>
        <Typography variant="h6">{fullDomain} 확인중...</Typography>
      </FlexBox>

      <FlexBox sx={{ width: '100%', justifyContent: 'center' }}>
        <CircularProgress />
      </FlexBox>
    </FlexBox>
  );
}

function DomainSearchResult() {
  const { domain, subdomain } = useSearch({
    from: '/domain/search',
    strict: true,
  });
  const fullDomain = `${subdomain}.${domain}`;
  const {
    data: availableDomain,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ['getDomainAvailable', domain, subdomain],
    queryFn: api.queryFn.getDomainAvailable,
    staleTime: Infinity,
    enabled: !!domain && !!subdomain,
  });

  if (isFetching) {
    return <DomainSearchResultLoading domain={domain} subdomain={subdomain} />;
  }
  const isAllowed = !!availableDomain?.allowed;
  if (isAllowed) {
    return (
      <FlexBox
        sx={{
          width: '100%',
          justifyContent: 'center',
          rowGap: 1,
          flexDirection: 'column',
        }}
      >
        <FlexBox sx={{ width: '100%', justifyContent: 'center' }}>
          <Typography variant="h6">{fullDomain} 사용 가능합니다!</Typography>
        </FlexBox>
        <FlexBox sx={{ width: '100%', justifyContent: 'center', paddingY: 3 }}>등록하기</FlexBox>
      </FlexBox>
    );
  }
  if (!isAllowed) {
    return (
      <FlexBox
        sx={{
          width: '100%',
          justifyContent: 'center',
          rowGap: 1,
          flexDirection: 'column',
        }}
      >
        <FlexBox sx={{ width: '100%', justifyContent: 'center' }}>
          <Typography variant="h6">{fullDomain}는 이미 사용중입니다</Typography>
        </FlexBox>

        <FlexBox>{}</FlexBox>
      </FlexBox>
    );
  }
}

export default function DomainRegister() {
  const DOMAIN = 'mc-server.kr';

  const navigate = useNavigate();

  const { domain, subdomain } = useSearch({
    from: '/domain/search',
    strict: true,
  });

  console.log(`subdomain : ${subdomain}`);
  const [searchDomain, setSearchDomain] = useState<string>(subdomain || '');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDomain(event.target.value);
  };

  const gotoSearchDomain = () => {
    if (!searchDomain.length) return;

    navigate({
      to: `/domain/search?domain=${domain}&subdomain=${searchDomain}`,
    });
  };

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingTop: 3 }}>
        <FlexBox
          sx={{
            width: '100%',
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <FlexBox sx={{ width: '70%', columnGap: 0.5 }}>
            <TextField
              id="domain-search-textfield"
              placeholder="my-server"
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">.mc-server.kr</InputAdornment>,
                },
              }}
              variant="outlined"
              size="small"
              fullWidth
              value={searchDomain}
              onChange={onInputChange}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  gotoSearchDomain();
                }
              }}
            />
            <IconButton
              sx={{ borderRadius: 1, backgroundColor: '#99ccff' }}
              disabled={!searchDomain.length}
              onClick={gotoSearchDomain}
            >
              <SendIcon />
            </IconButton>
          </FlexBox>
        </FlexBox>
        <DomainSearchResult />
      </FlexBox>
    </Container>
  );
}
