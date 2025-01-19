import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { Link as RouterLink } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';

export const RouterLinkWrapper = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  position: relative;
`;

export default function LogginButton() {
  const loginPath = '/auth/login';
  const borderRadius = 1;

  return (
    <RouterLinkWrapper to={loginPath}>
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
    </RouterLinkWrapper>
  );
}
