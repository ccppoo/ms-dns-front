import { MouseEvent, useEffect, useState } from 'react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { height, width } from '@mui/system';

import { Link as RouterLink } from '@tanstack/react-router';

import { logout } from '@/api/authed/logout';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import './border.css';

export const RouterLinkWrapper = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  position: relative;
`;

function PopoverLogout({ closeMenu }: { closeMenu: () => void }) {
  const [_, { removeUserProfile }] = useUserProfile();
  // const [authInfo, state, action] = useAuthState();

  const handleLogout = async () => {
    console.log(`logout!!`);
    removeUserProfile();
    await logout();
  };

  return (
    <Box
      sx={{
        display: 'grid',
        height: 45,
        gridTemplateColumns: '3fr 2fr 3fr',
        cursor: 'default',
      }}
    >
      <FlexBox
        sx={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        로고
      </FlexBox>
      <Box></Box>
      <FlexBox sx={{ padding: 0.1 }}>
        <FlexBox
          className="gradient"
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
        >
          <Typography textAlign="center">로그아웃</Typography>
        </FlexBox>
      </FlexBox>
    </Box>
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
        <RouterLinkWrapper to={'/me/profile'}>
          <Typography>내 프로필</Typography>
        </RouterLinkWrapper>
      </FlexBox>
    </Box>
  );
}

export default function UserProfile() {
  const [userProfile, {}] = useUserProfile();

  // const userName = profile.gamerTag;
  // const userIcon = profile.profileImage;

  const avatarSize = 32;
  const size = { width: avatarSize, height: avatarSize };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
        sx={{ mt: '40px' }}
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
          <PopoverLogout closeMenu={handleCloseUserMenu} />
          <PopoverProfilePortal closeMenu={handleCloseUserMenu} />
        </FlexBox>
      </Popover>
    </FlexBox>
  );
}
