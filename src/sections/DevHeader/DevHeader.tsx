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
    name: '내 server',
    path: '/me/server',
  },
  {
    name: '내 domain',
    path: '/me/domain',
  },
  {
    name: 'domain 등록',
    path: '/domain/register',
  },
  {
    name: '글 쓰기',
    path: '/editor/write',
  },
  {
    name: '글 수정',
    path: '/editor/edit',
  },
  {
    name: '글 읽기',
    path: '/editor/read',
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
