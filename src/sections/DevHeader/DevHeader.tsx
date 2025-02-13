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
    name: '로그인',
    path: '/auth/login',
  },
  {
    name: 'dev',
    path: '/dev',
  },
  {
    name: '서버 리스트',
    path: '/server/list',
  },
  {
    name: '내 프로필',
    path: '/me/profile',
  },
  {
    name: '내 도메인',
    path: '/me/domain',
  },
  {
    name: 'domain 등록',
    path: '/domain/register',
  },
];

function DevHeaderLink({ name, path }: DevLink) {
  return <Link to={path}>{name}</Link>;
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
