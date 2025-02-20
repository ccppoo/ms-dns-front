import { useState } from 'react';

import { Button, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { Link as RouterLink } from '@tanstack/react-router';

import { logout } from '@/api/authed/logout';
import { FlexBox, FlexPaper, Image } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import './border.css';

export const RouterLinkWrapper = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  position: relative;
`;

function PopoverTop({ closeMenu }: { closeMenu: () => void }) {
  const [, { removeUserProfile }] = useUserProfile();

  const mcserver = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';
  const mcserver2 = 'https://cdn.mc-server.kr/static/mc-server-logo-450x200.png';
  const mcserver3 = 'https://cdn.mc-server.kr/static/mc-server-logo-black-450x200.png';

  const handleLogout = async () => {
    console.log(`logout!!`);
    removeUserProfile();
    await logout();
    // NOTE: 로그아웃하고 쿠키 dep 컴포넌트 바로 변화 감지 못해서 새로고침
    window.location.reload();
  };

  return (
    <FlexBox
      sx={{
        height: 45,
        cursor: 'default',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 1,
      }}
    >
      <FlexBox
        sx={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
        }}
      >
        <Image src={mcserver3} sx={{ height: 30, width: 'auto' }} />
      </FlexBox>
      <FlexBox sx={{ padding: 0.1 }}>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
          size="small"
        >
          로그아웃
        </Button>
      </FlexBox>
    </FlexBox>
  );
}

function PopoverProfilePortal({ closeMenu }: { closeMenu: () => void }) {
  const [userProfile, {}] = useUserProfile();

  const avatarSize = 75;

  const size = { width: avatarSize, height: avatarSize };

  return (
    <Box
      sx={{ display: 'grid', height: '100%', gridTemplateColumns: '3fr 5fr' }}
      onClick={() => {
        closeMenu();
      }}
    >
      <FlexBox
        sx={{
          width: '100%',
          height: 110,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar
          alt={userProfile.nickname as string}
          src={userProfile.profileImage}
          sx={{ ...size }}
        />
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column', paddingY: 1 }}>
        <Typography variant="subtitle1" fontWeight={500}>
          {userProfile.nickname as string}
        </Typography>
        <FlexBox>
          <FlexPaper sx={{ padding: 0.3 }}>
            <RouterLinkWrapper to={'/me/profile'}>
              <Typography>내 프로필</Typography>
            </RouterLinkWrapper>
          </FlexPaper>
        </FlexBox>
      </FlexBox>
    </Box>
  );
}

export default function UserProfile() {
  const [userProfile, {}] = useUserProfile();

  const avatarSize = 32;
  const size = { width: avatarSize, height: avatarSize };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <FlexBox sx={{ flexGrow: 0 }}>
      <FlexBox
        className="gradient"
        sx={{
          paddingX: 0.5,
          paddingY: 0.2,
        }}
      >
        <ButtonBase
          onClick={handleOpenUserMenu}
          sx={{
            display: 'flex',
            columnGap: 0.8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            alt={userProfile.nickname as string}
            src={userProfile.profileImage}
            sx={{ ...size }}
          />
          <Typography>{userProfile.nickname as string}</Typography>
        </ButtonBase>
      </FlexBox>
      <Popover
        id="menu-appbar"
        sx={{ mt: '35px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <FlexBox
          sx={{
            maxWidth: '100%',
            width: 320,
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <PopoverTop closeMenu={handleCloseUserMenu} />
          <Divider flexItem />
          <PopoverProfilePortal closeMenu={handleCloseUserMenu} />
        </FlexBox>
      </Popover>
    </FlexBox>
  );
}
