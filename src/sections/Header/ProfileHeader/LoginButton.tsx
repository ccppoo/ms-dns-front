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

import { FlexBox } from '@/components/styled';

import './border.css';

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
