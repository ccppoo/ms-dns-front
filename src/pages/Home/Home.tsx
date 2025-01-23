import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { Link } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

import SearchDomain from './SearchDomain';
import ServerList from './ServerList';
import ServerTags from './ServerTags';

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

function ServerTopList() {
  return (
    <FlexBox
      sx={{
        height: '100%',
        backgroundColor: '#99ff99',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingY: 2,
        flexDirection: 'column',
      }}
    >
      <FlexBox
        sx={{
          backgroundColor: 'white',
          width: '60%',
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>인기 서버 리스트</Typography>
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column', paddingY: 2, rowGap: 1, width: '80%' }}>
        <ServerBanner />
      </FlexBox>
    </FlexBox>
  );
}

function ServerFilterShortcut() {
  return (
    <FlexBox
      sx={{
        height: 80,
        backgroundColor: '#ffcc66',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 2,
      }}
    >
      <FlexBox
        sx={{
          backgroundColor: 'white',
          width: '30%',
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>자바 버전</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          backgroundColor: 'white',
          width: '30%',
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>베드락 버전</Typography>
      </FlexBox>
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
        <SearchDomain />
        <ServerList />
        {/* <ServerFilterShortcut /> */}
        {/* <ServerTags />
        <ServerTopList /> */}
      </FlexBox>
    </Container>
  );
}
