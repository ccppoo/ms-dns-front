import { Button, Divider, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useNavigate, useSearch } from '@tanstack/react-router';
import { useLocalStorage } from '@uidotdev/usehooks';

import authApi from '@/api/auth';
import { FlexBox, FlexPaper, FullSizeCenteredFlexBox, Image } from '@/components/styled';

function DiscordLoginButton() {
  const discord = 'https://cdn.mc-server.kr/static/discord-mark-white.png';

  const iconSize = 50;
  const borderRadius = 2;
  const color = '#5865F2';
  return (
    <Paper
      sx={{
        display: 'flex',
        borderRadius: borderRadius,
        padding: 0.5,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 1,
        backgroundColor: color,
      }}
      elevation={3}
    >
      <FlexBox sx={{ minWidth: 65, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          src={discord}
          sx={{
            height: iconSize,
            width: 'auto',
            borderRadius: borderRadius,
            padding: 1,
          }}
        />
      </FlexBox>
      <FlexBox sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Typography fontSize={24} color="white">
          DISCORD
        </Typography>
      </FlexBox>
    </Paper>
  );
}

function GoogleLoginButton() {
  const google = 'https://cdn.mc-server.kr/static/google.png';

  const iconSize = 50;
  const borderRadius = 2;
  return (
    <Paper
      sx={{
        display: 'flex',
        borderRadius: borderRadius,
        padding: 0.5,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 1,
      }}
      elevation={3}
    >
      <FlexBox sx={{ minWidth: 65, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          src={google}
          sx={{
            height: iconSize,
            width: 'auto',
            borderRadius: borderRadius,
            padding: 1,
          }}
        />
      </FlexBox>
      <FlexBox sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Typography fontSize={24} textTransform={'none'}>
          Google
        </Typography>
      </FlexBox>
    </Paper>
  );
}

function SSOLoginButton({ sso, children }: { sso: string; children: JSX.Element }) {
  const onClickLogin = async () => {
    const url = await authApi.query.getLoginSSO(sso);
    window.location.href = url.data;
    return;
  };

  return <Button onClick={onClickLogin}>{children}</Button>;
}

export default function Login() {
  const mcserver3 = 'https://cdn.mc-server.kr/static/mc-server-logo-black-450x200.png';
  const navigate = useNavigate();
  const [loginRedirect, setLoginRedirect] = useLocalStorage<string | null>('loginRedirect', null);

  const redirectPath = useSearch({
    from: '/auth/login',
    select: (param) => param.redirect,
  });
  if (redirectPath) {
    setLoginRedirect(redirectPath);
  }
  return (
    <Container sx={{ height: '100vh' }} maxWidth={'md'}>
      <FullSizeCenteredFlexBox sx={{}}>
        <FlexPaper
          sx={{ width: 400, height: 600, flexDirection: 'column', alignItems: 'center', rowGap: 1 }}
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
            <Typography variant="h6">로그인</Typography>
          </FlexBox>
          <FlexBox
            sx={{
              width: '100%',
              height: '50%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'end',
            }}
          >
            <SSOLoginButton sso="google">
              <GoogleLoginButton />
            </SSOLoginButton>
            <SSOLoginButton sso="discord">
              <DiscordLoginButton />
            </SSOLoginButton>
          </FlexBox>

          <FlexBox
            sx={{
              width: '100%',
              height: '20%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: 3,
            }}
          >
            <Divider orientation="horizontal" sx={{ width: '80%' }} />
            <FlexBox>
              <Button variant="contained" onClick={() => navigate({ to: '/', replace: true })}>
                홈 페이지로
              </Button>
            </FlexBox>
          </FlexBox>
        </FlexPaper>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
