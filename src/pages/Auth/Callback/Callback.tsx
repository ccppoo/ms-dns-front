import { useEffect, useState } from 'react';

import { Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { useLocalStorage } from '@uidotdev/usehooks';

import authApi from '@/api/auth';
import { FlexBox, FlexPaper, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

export default function CallBack() {
  const SSO_Provider = useParams({
    from: '/auth/callback/sso/$SSO_Provider',
    select: (params) => params.SSO_Provider,
  });
  const { code } = useSearch({
    strict: false,
  });
  const [loginRedirect, setLoginRedirect] = useLocalStorage<string | null>('loginRedirect', null);

  const [, { setNickname, setProfileImage, setUID, setRole }] = useUserProfile();

  const navigate = useNavigate();

  const goBackToHomePage = () => {
    navigate({
      to: '/',
      replace: true,
    });
  };

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['oauth callback', code!],
    queryFn: async () => await authApi.queryFn.getCallbackSSO(SSO_Provider, { code }),
    retry: false,
    enabled: !!code,
  });

  useEffect(() => {
    if (isSuccess) {
      setNickname(data.nickname, data.expires);
      setProfileImage(data.profileImage, data.expires);
      setUID(data.uid, data.expires);
      setRole(data.role, data.expires);
      const timeoutId = setTimeout(() => {
        navigate({ to: loginRedirect || '/' });
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [navigate, data, isSuccess]);

  const mcserver3 = 'https://cdn.mc-server.kr/static/mc-server-logo-black-450x200.png';

  if (isLoading) {
    return (
      <Container sx={{ height: '100vh' }} maxWidth={'md'}>
        <FullSizeCenteredFlexBox sx={{}}>
          <FlexPaper
            sx={{
              width: 400,
              height: 600,
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: 1,
            }}
          >
            <FlexBox
              sx={{
                height: '30%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingY: 2,
                flexDirection: 'column',
                rowGap: 1,
              }}
            >
              <Image src={mcserver3} sx={{ height: 75, width: 'auto' }} />
            </FlexBox>
            <FlexBox
              sx={{
                width: '100%',
                height: '50%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6">로그인하는 중...</Typography>
            </FlexBox>
          </FlexPaper>
        </FullSizeCenteredFlexBox>
      </Container>
    );
  }

  if (isSuccess) {
    return (
      <Container sx={{ height: '100vh' }} maxWidth={'md'}>
        <FullSizeCenteredFlexBox sx={{}}>
          <FlexPaper
            sx={{
              width: 400,
              height: 600,
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: 1,
            }}
          >
            <FlexBox
              sx={{
                height: '30%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingY: 2,
                flexDirection: 'column',
                rowGap: 1,
              }}
            >
              <Image src={mcserver3} sx={{ height: 75, width: 'auto' }} />
            </FlexBox>
            <FlexBox
              sx={{
                width: '100%',
                height: '50%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6">로그인 성공!</Typography>
            </FlexBox>
          </FlexPaper>
        </FullSizeCenteredFlexBox>
      </Container>
    );
  }

  return (
    <Container sx={{ height: '100vh' }} maxWidth={'md'}>
      <FullSizeCenteredFlexBox sx={{}}>
        <FlexPaper
          sx={{
            width: 400,
            height: 600,
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: 1,
          }}
        >
          <FlexBox
            sx={{
              height: '30%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingY: 2,
              flexDirection: 'column',
              rowGap: 1,
            }}
          >
            <Image src={mcserver3} sx={{ height: 75, width: 'auto' }} />
          </FlexBox>
          <FlexBox
            sx={{
              width: '100%',
              height: '50%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6">로그인 과정에서 문제가 발생했습니다</Typography>
            <Button variant="outlined" onClick={goBackToHomePage}>
              홈페이지로 돌아가기
            </Button>
          </FlexBox>
        </FlexPaper>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
