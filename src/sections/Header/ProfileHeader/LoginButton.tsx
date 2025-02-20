import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ButtonBase } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useNavigate } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';

export default function LogginButton() {
  const loginPath = '/auth/login';
  const borderRadius = 1;

  const naivgate = useNavigate();
  const onClickLogin = () => {
    if (window.location.pathname === '/') {
      naivgate({
        to: loginPath,
      });
      return;
    }
    naivgate({
      to: loginPath,
      search: {
        redirect: window.location.pathname,
      },
    });
  };

  return (
    <ButtonBase onClick={onClickLogin}>
      <FlexBox
        sx={{
          flexDirection: 'row',
          columnGap: 0.8,
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px black solid',
          paddingX: 0.5,
          paddingY: 0.2,
          borderRadius,
        }}
      >
        <Typography fontSize={13}>로그인</Typography>
        <AccountCircleOutlinedIcon />
      </FlexBox>
    </ButtonBase>
  );
}
