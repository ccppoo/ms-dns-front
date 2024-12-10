import { useEffect } from 'react';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { Link } from '@tanstack/react-router';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

const TEMP_IMAGE = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';

function SearchDomain() {
  return (
    <FlexBox
      sx={{
        height: 200,
        backgroundColor: 'greenyellow',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlexBox
        sx={{
          backgroundColor: 'white',
          width: '60%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>도메인 검색</Typography>
      </FlexBox>
    </FlexBox>
  );
}

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

function ServerCategoryShortcut() {
  const category = ['RPG', '마인팜', '경제', '바닐라', '건축', '전쟁', 'PvP', '미니게임'];

  return (
    <FlexBox
      sx={{
        height: 80,
        backgroundColor: '#99ccff',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 2,
      }}
    >
      {category.map((cat, idx) => (
        <FlexBox
          sx={{
            backgroundColor: 'white',
            width: '10%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={idx}
        >
          <Typography>{cat}</Typography>
        </FlexBox>
      ))}
    </FlexBox>
  );
}

function ServerList() {
  return (
    <FlexBox
      sx={{
        height: 200,
        backgroundColor: '#99ff99',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingY: 1,
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
        <Typography>서버 리스트</Typography>
      </FlexBox>
    </FlexBox>
  );
}

export default function Home() {
  return (
    <Container sx={{ height: '100%' }} maxWidth={'lg'}>
      <FlexBox
        sx={{
          paddingTop: 1,
          rowGap: 2,
          flexDirection: 'column',
        }}
      >
        <SearchDomain />
        <ServerTopList />
        <ServerFilterShortcut />
        <ServerCategoryShortcut />
        <ServerList />
      </FlexBox>
    </Container>
  );
}
