import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { Link } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

import Announcement from './Announcement';
import SearchDomain from './SearchDomain';
import ServerList from './ServerList';

const TEMP_IMAGE = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';

function ServerBanner() {
  const serverName = '7percent MC server';
  return (
    <FlexBox
      sx={{
        // height: 50,
        width: '100%',
        backgroundColor: 'white',
        paddingX: 2,
        paddingY: 1,
      }}
    >
      <Image src={TEMP_IMAGE} sx={{ height: 75, width: 75 }} />
      <Link to={'/server/7percent'}>
        <FlexBox sx={{ backgroundColor: '#ff9999', paddingY: 1, paddingX: 2 }}>
          <Typography>{serverName}</Typography>
        </FlexBox>
      </Link>
    </FlexBox>
  );
}

export default function Home() {
  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox
        sx={{
          paddingTop: 1,
          rowGap: 2,
          flexDirection: 'column',
        }}
      >
        <Announcement />
        <SearchDomain />
        <ServerList />
        {/* <ServerFilterShortcut /> */}
        {/* <ServerTags />
        <ServerTopList /> */}
      </FlexBox>
    </Container>
  );
}
