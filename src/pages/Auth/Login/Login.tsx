import { Box, Button, ButtonBase, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import api from '@/pages/Auth/api';

const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

function SSOLoginButton({ sso }: { sso: string }) {
  const onClickLogin = async () => {
    const url = await api.getLoginSSO(sso);
    console.log(`url : ${url.data}`);
    openInNewTab(url.data);
    return;
  };

  const iconSize = 50;
  const borderRadius = 2;
  return (
    <Button onClick={onClickLogin}>
      <Paper
        sx={{
          display: 'flex',
          borderRadius: borderRadius,
          padding: 1,
          width: 350,
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 1,
        }}
      >
        <Image
          // src={xboxIcon}
          sx={{
            width: iconSize,
            height: iconSize,
            borderRadius: borderRadius,
          }}
        />
        <FlexBox sx={{ width: '100%', justifyContent: 'center' }}>
          <Typography fontSize={24}>Login as {sso.toUpperCase()}</Typography>
        </FlexBox>
      </Paper>
    </Button>
  );
}

export default function Login() {
  return (
    <Container sx={{ height: '100%' }}>
      <FullSizeCenteredFlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ width: 400, height: 600 }}>
          <FlexBox
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>로그인</Typography>
          </FlexBox>
          <FlexBox
            sx={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SSOLoginButton sso="google" />
            <SSOLoginButton sso="discord" />
          </FlexBox>
        </Paper>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
