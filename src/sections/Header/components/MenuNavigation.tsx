import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Link, useMatchRoute } from '@tanstack/react-router';

import { FlexBox, Image } from '@/components/styled';

function NavigationButton({ name, path }: { name: string; path: string }) {
  const matchRoute = useMatchRoute();
  const matches = matchRoute({ to: path });

  const isCurrentPath = !!matches;

  return (
    <Box
      sx={{
        alignItems: 'center',
        columnGap: 0.5,
        paddingY: 0.5,
        paddingX: 1,
        borderRadius: 1,
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: '#d4d0c7',
          borderColor: '#a8a6a2',
          boxShadow: 'none',
        },

        backgroundColor: isCurrentPath ? '#d4d0c7' : null,
        cursor: isCurrentPath ? 'default' : 'null',
      }}
      style={{
        textDecoration: 'none',
        color: 'black',
      }}
      disabled={isCurrentPath}
      component={Link}
      resetScroll={true}
      to={path}
    >
      <Typography variant="body1">{name}</Typography>
    </Box>
  );
}
type Menu = {
  path: string;
  name: string;
};

export default function TitleLogoHeader() {
  const menus: Menu[] = [
    {
      name: '공지사항',
      path: '/announcement/list',
    },
    {
      name: '서버 목록',
      path: '/server/list',
    },
    {
      name: '도메인 검색',
      path: '/domain/search',
    },

    {
      name: '도메인 등록',
      path: '/domain/register',
    },

    {
      name: '내 도메인',
      path: '/me/domain',
    },
    {
      name: 'dev',
      path: '/dev',
    },
  ];

  return (
    <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
      {menus.map((menu) => (
        <NavigationButton name={menu.name} path={menu.path} key={`menu-navigate-${menu.path}`} />
      ))}
    </FlexBox>
  );
}
