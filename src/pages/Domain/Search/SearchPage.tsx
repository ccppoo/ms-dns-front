import { useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { Button, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useLocalStorage } from '@uidotdev/usehooks';

import { FlexBox } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

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
  const [{ uid }] = useUserProfile();
  const navigate = useNavigate();
  const [, setRegisterSubdomain] = useLocalStorage<string | null>('domainRegisterSubdomain', null);
  const [, setRegisterDomain] = useLocalStorage<string | null>('domainRegisterDomain', null);
  const isLoggedin = !!uid;
  const { domain, subdomain } = useSearch({
    from: '/domain/search',
    strict: true,
  });
  const doSearch = !!domain && !!subdomain;

  const fullDomain = `${subdomain}.${domain}`;
  console.log(`subdomain : ${typeof subdomain} domain : ${typeof domain}`);
  console.log(`!!domain && !!subdomain : ${!!domain && !!subdomain}`);
  const {
    data: availableDomain,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ['getDomainAvailable', domain, subdomain],
    queryFn: api.queryFn.getDomainAvailable,
    staleTime: 30 * 1000,
    enabled: doSearch,
  });

  const isAllowed = !!availableDomain?.allowed;
  const onClickRegisterLoggedIn = () => {
    setRegisterSubdomain(subdomain);
    setRegisterDomain(domain);
    navigate({
      to: '/domain/register',
    });
  };
  const onClickRegisterNotLoggedIn = () => {
    setRegisterSubdomain(subdomain);
    setRegisterDomain(domain);
    navigate({
      to: '/domain/register',
    });
  };

  if (doSearch) {
    if (isFetching) {
      return <DomainSearchResultLoading domain={domain} subdomain={subdomain} />;
    }
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
          <FlexBox sx={{ width: '100%', justifyContent: 'center', paddingY: 3 }}>
            {isLoggedin ? (
              <Button onClick={onClickRegisterLoggedIn} variant="contained">
                등록하기
              </Button>
            ) : (
              <Button onClick={onClickRegisterNotLoggedIn} variant="contained">
                로그인하고 등록하기
              </Button>
            )}
          </FlexBox>
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
        <Typography variant="h6">사용하고 싶은 도메인을 검색해보세요</Typography>
      </FlexBox>
    </FlexBox>
  );
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
    const _domain = domain || 'mc-server.kr';
    navigate({
      to: `/domain/search?domain=${_domain}&subdomain=${searchDomain}`,
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
