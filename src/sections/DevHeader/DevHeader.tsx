import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import { Link } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';

type DevLink = {
  name: string;
  path: string;
};

const goto: DevLink[] = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'login',
    path: '/auth/login',
  },
  {
    name: 'callback - google',
    path: '/auth/sso/google/callback',
  },

  {
    name: 'dev',
    path: '/dev',
  },
  {
    name: 'server profile',
    path: '/server/server123',
  },
  {
    name: 'user profile',
    path: '/user/user123',
  },
  {
    name: 'my profile',
    path: '/me/profile',
  },
  {
    name: 'my server',
    path: '/me/server',
  },
  {
    name: 'my domain',
    path: '/me/domain',
  },
  {
    name: 'domain search',
    path: '/domain/search?subdomain=server123',
  },

  {
    name: 'domain register',
    path: '/domain/register',
  },
];

function DevHeaderLink({ name, path }: DevLink) {
  return <Link href={path}>{name}</Link>;
}

export default function DevHeader() {
  const naviButtonSize = 35;
  const MainTitleWidth = 100;

  return (
    // <Box sx={{ width: '100%', position: 'sticky' }} data-pw={`theme-${theme}`}>
    <Box sx={{ width: '100%', position: 'sticky' }}>
      <AppBar color="transparent" elevation={1} position="sticky" sx={{ top: 0, paddingX: 0 }}>
        <FlexBox sx={{ paddingX: 3, columnGap: 3, fontSize: 18 }}>
          {goto.map((devLink, idx) => (
            <DevHeaderLink {...devLink} key={`dev-href-${idx}`} />
          ))}
        </FlexBox>
      </AppBar>
    </Box>
  );
}
