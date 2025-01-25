import { useEffect, useRef } from 'react';

import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Button, ButtonBase, Chip, Divider, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

import type { ServerInfo } from '@/components/editor/ServerPostEditor/models';
// import ServerProfileEditor from '@/components/editor/ServerPostEditor';
import EditorReader from '@/components/editor/components/Reader';
import { FlexBox, FlexPaper } from '@/components/styled';
import { ExternalLink, ExternalLinkNewTab, Image } from '@/components/styled';
import { icon, sample } from '@/static';

import api from '../api';

const TEMP_IMAGE = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';

const SERVER_NAME = '7percent';
const SERVER_URL = '7percent.mc-server.kr';

const SERVER_SHORT_DESCRIPTION =
  '【정품서버✔️】 【1.12.2~최신】 당신을 위한 최고의 서버❤️ RPG, 랜무, 마인팜, 미니게임 등 다양한 콘텐츠가 준비되어 있어요! ✨ 동시접속자 1286명 달성 ?서버 렉 ❌ 쾌적한 플레이 환경 ? (마인팜/미니게임은 개발중! 오픈임박!!)';

const SERVER_TAG = ['PvP', '마인팜', '야생', 'RPG', '건축'];

const PLAYER_MAX = 20;
const PLAYER_COUNT = 3;
const SERVER_RUNNING_TIME = '24시간';

function CopyToClipBoard({ text, value }: { text: string; value: string }) {
  const copyToClipBoard = async () => {
    try {
      await window.navigator.clipboard.writeText(SERVER_URL);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Unable to copy to clipboard.', err);
      alert('Copy to clipboard failed.');
    }
  };
  return (
    <Button
      onClick={copyToClipBoard}
      variant="outlined"
      style={{ textTransform: 'none' }}
      size="small"
    >
      <FlexBox sx={{ columnGap: 1, alignItems: 'center' }}>
        <Typography>{text}</Typography>
      </FlexBox>
    </Button>
    // <Typography variant="caption">클릭해서 복사하기</Typography>
  );
}

interface IServerProfileHeader {
  title?: string;
  serverInfo?: ServerInfo;
}

function ServerProfileHeader(props: IServerProfileHeader) {
  const { title, serverInfo } = props;

  const serverName = title || SERVER_NAME;
  const serverTags = serverInfo?.tags || SERVER_TAG;
  const server24Hour = !!serverInfo?.service24hr;
  const serverAddress = serverInfo?.server_address || SERVER_URL;

  return (
    <FlexPaper sx={{ padding: 1, width: '100%', flexDirection: 'column' }}>
      <FlexBox sx={{ flexDirection: 'column', paddingX: 2, rowGap: 0.5 }}>
        <FlexBox>
          <Typography variant="h6">{serverName}</Typography>
        </FlexBox>
        <Divider flexItem />
        <FlexBox>
          <FlexBox sx={{ columnGap: 1 }}>
            {serverTags.map((tag, idx) => (
              <Chip label={tag} variant="outlined" size="small" key={`server-tag-${idx}`} />
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox sx={{ paddingY: 2, columnGap: 1 }}>
        <FlexBox
          sx={{
            paddingX: 3,
            flexDirection: 'column',
            alignItems: 'center',
            width: 180,
          }}
        >
          <FlexBox
            sx={{
              paddingY: 2,
              border: '1px black solid',
              borderRadius: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src={TEMP_IMAGE} sx={{ height: 100, width: 100 }} />
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Typography>서버 주소 </Typography>
            <CopyToClipBoard text={serverAddress} value={serverAddress} />
          </FlexBox>
          {/* <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Typography>접속자</Typography>
            <Typography>
              {PLAYER_COUNT} / {PLAYER_MAX}
            </Typography>
          </FlexBox> */}
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Typography>24시간 운영</Typography>
            {!!server24Hour ? <Typography>O</Typography> : <Typography>X</Typography>}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexPaper>
  );
}

interface IServerSystemDetail {
  version?: string[];
  launcher?: string[];
}

function ServerSystemDetail(props: IServerSystemDetail) {
  // 버전, 런처, 모드

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
        <Typography>버전 :</Typography>
        <FlexBox sx={{ columnGap: 0.8 }}>
          {['1.18.x', '1.19.x', '1.20.x', '1.21.x'].map((version, idx) => (
            <Chip label={version} key={`server-version-${idx}`} />
          ))}
        </FlexBox>
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
        <Typography>런처 :</Typography>
        <FlexBox sx={{ columnGap: 0.8 }}>
          {['Forge', '바닐라'].map((version, idx) => (
            <Chip label={version} key={`server-version-${idx}`} />
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function DiscordHrefButton({ name, url }: { name: string; url: string }) {
  return (
    <ExternalLinkNewTab href={url}>
      <FlexBox
        sx={{
          border: '1px black solid',
          borderRadius: 2,
          alignItems: 'center',
          columnGap: 1,
          padding: 0.5,
          fontStyle: 'normal',
        }}
      >
        <Image src={icon.discordIconBlue} sx={{ width: 30, height: 30 }} />
        <Typography>{name}</Typography>
      </FlexBox>
    </ExternalLinkNewTab>
  );
}

function NaverCafeHrefButton({ name, url }: { name: string; url: string }) {
  return (
    <ExternalLinkNewTab href={url}>
      <FlexBox
        sx={{
          border: '1px black solid',
          borderRadius: 2,
          alignItems: 'center',
          columnGap: 1,
          padding: 0.5,
          fontStyle: 'normal',
        }}
      >
        <Image src={icon.naverCafe} sx={{ width: 30, height: 30 }} />
        <Typography>{name}</Typography>
      </FlexBox>
    </ExternalLinkNewTab>
  );
}

function BlueMapHrefButton({ name, url }: { name: string; url: string }) {
  return (
    <ExternalLinkNewTab href={url}>
      <FlexBox
        sx={{
          border: '1px black solid',
          borderRadius: 2,
          alignItems: 'center',
          columnGap: 1,
          padding: 0.5,
          fontStyle: 'normal',
        }}
      >
        <Image src={icon.bluemap} sx={{ width: 30, height: 30 }} />
        <Typography>{name}</Typography>
      </FlexBox>
    </ExternalLinkNewTab>
  );
}

function KakaoHrefButton({ name, url }: { name: string; url: string }) {
  return (
    <ExternalLinkNewTab href={url}>
      <FlexBox
        sx={{
          border: '1px black solid',
          borderRadius: 2,
          alignItems: 'center',
          columnGap: 1,
          padding: 0.5,
          fontStyle: 'normal',
        }}
      >
        <Image src={icon.kakaoTalk} sx={{ width: 30, height: 30 }} />
        <Typography>{name}</Typography>
      </FlexBox>
    </ExternalLinkNewTab>
  );
}

function OtherHrefButton({ name, url }: { name: string; url: string }) {
  return (
    <ExternalLinkNewTab href={url}>
      <FlexBox
        sx={{
          border: '1px black solid',
          borderRadius: 2,
          alignItems: 'center',
          columnGap: 1,
          padding: 0.5,
          fontStyle: 'normal',
        }}
      >
        <LanguageOutlinedIcon sx={{ width: 30, height: 30 }} />
        <Typography>{name}</Typography>
      </FlexBox>
    </ExternalLinkNewTab>
  );
}

interface IServerExternalLinks {
  community?: {
    name: string;
    service: string;
    url: string;
  }[];
}

function ServerExternalLinks(props: IServerExternalLinks) {
  const { community } = props;

  const links: { name: string; service: string; url: string }[] = [
    {
      name: '7% 클랜 디스코드',
      service: 'discord',
      url: 'https://www.example.com',
    },
    {
      name: '7% 네이버 카페',
      service: 'naver_cafe',
      url: 'https://www.example.com',
    },
    {
      name: '7% 마크 섭 지도',
      service: 'bluemap',
      url: 'https://www.example.com',
    },
    {
      name: '7% 클랜 오픈카톡',
      service: 'kakaoTalk',
      url: 'https://www.example.com',
    },
    {
      name: '7% 클랜 홈페이지',
      service: 'other',
      url: 'https://www.example.com',
    },
  ];

  const commus = community || links;
  // console.log(`community : ${JSON.stringify(community[0])}`);
  return (
    <FlexPaper sx={{ padding: 1, width: '100%', columnGap: 2, rowGap: 1, flexWrap: 'wrap' }}>
      {commus.map((linkItem, idx) => {
        switch (linkItem.service) {
          case 'discord': {
            return <DiscordHrefButton name={linkItem.name} url={linkItem.url} />;
          }
          case 'naver_cafe': {
            return <NaverCafeHrefButton name={linkItem.name} url={linkItem.url} />;
          }
          case 'bluemap': {
            return <BlueMapHrefButton name={linkItem.name} url={linkItem.url} />;
          }
          case 'kakaoTalk': {
            return <KakaoHrefButton name={linkItem.name} url={linkItem.url} />;
          }
        }
        return <OtherHrefButton name={linkItem.name} url={linkItem.url} />;
      })}
    </FlexPaper>
  );
}

function ServerProfileIndex() {
  const index: { name: string; hash: string }[] = [
    {
      name: '소개',
      hash: 'intro',
    },
    {
      name: '서버 상태',
      hash: 'status',
    },
  ];
  const ref = useRef<HTMLDivElement>(null);

  const onClickSmoothScroll: React.MouseEventHandler<HTMLAnchorElement> = (
    event: React.MouseEvent,
  ) => {
    event.preventDefault();
    let offset = () => ref.current?.offsetTop;
    // ref.current?.offsetTop;
    const href = event.currentTarget.getAttribute('href');
    const anchorID = href?.split('#')[1];
    const anchor = document.getElementById(anchorID!)!;
    const offsetTop = anchor.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: offsetTop - offset()!,
      behavior: 'smooth',
    });
  };
  return (
    <FlexBox sx={{ columnGap: 2 }} ref={ref}>
      {index.map((indexItem, idx) => (
        <FlexPaper sx={{ padding: 1 }} key={`idx-item-${idx}`}>
          <Link hash={indexItem.hash} onClick={onClickSmoothScroll}>
            {indexItem.name}
          </Link>
        </FlexPaper>
      ))}
    </FlexBox>
  );
}

function ServerProfileIntro() {
  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column' }} id="intro">
      <Typography variant="h6">소개</Typography>
      <FlexPaper sx={{ flexDirection: 'column', paddingY: 2, paddingX: 1 }}>
        <Typography variant="h4">【정품서버✔️】 【1.12.2~최신】</Typography>
        <Typography>
          당신을 위한 최고의 서버❤️ RPG, 랜무, 마인팜, 미니게임 등 다양한 콘텐츠가 준비되어 있어요!
        </Typography>
        <Typography variant="h4">【RPG 하면 렌독, 렌독 하면 RPG!】</Typography>

        <Typography>
          렌독 RPG서버는 15년도부터 5년째 운영중인 장수서버로, 최고동접 1286명이라는 압도적인 기록을
          가지고 있는 근본있는 서버입니다.
        </Typography>
        <Typography>단순히 파티클 몇개 띡띡 날리는 그런 서버가 아닙니다.</Typography>

        <Typography>
          차원이 다른 스킬 퀄리티를 확인해보세요 수십명의 유저끼리 함께 보스를 사냥하는 보스레이드
          시스템도 준비되어있습니다.
        </Typography>

        <Typography variant="h4">【끊을 수 없는 중독성! 랜덤무기전쟁!】</Typography>

        <Typography>언제까지 똑같고 지루한 전투만할거야?</Typography>

        <Typography>매판 새로운 전투가 펼쳐진다!</Typography>

        <Typography>각양각색 다양한 수백종류의 무기들! 모든 무기를 모아보세요.</Typography>
        <Typography>다양한 스킬들로 나만의 콤보를 만들어보자!</Typography>
      </FlexPaper>
    </FlexBox>
  );
}

function ServerProfileStatus() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }} id="status">
      <Typography variant="h6">서버 상태</Typography>

      <FlexPaper sx={{ justifyContent: 'center' }}>
        <Image src={sample.chartSample} sx={{ width: '80%' }} />
      </FlexPaper>
    </FlexBox>
  );
}

export default function AnnouncementRead() {
  // const serverID = useParams({
  //   from: '/server/profile/read',
  //   select: (params) => params.serverID,
  //   strict: true,
  // });

  const { postID } = useParams({
    from: '/announcement/read/$postID',
  });

  console.log(`postID : ${postID}`);

  const { data: postData } = useQuery({
    queryKey: ['announcement', postID],
    queryFn: api.queryFn.getAnnouncementPost,
    enabled: !!postID,
  });

  if (!postID) {
    return (
      <Container sx={{ height: '100%' }} maxWidth={'md'}>
        <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
          <ServerSystemDetail />
          <ServerProfileHeader />
          <ServerExternalLinks />
          <ServerProfileIndex />
          <ServerProfileIntro />

          <ServerProfileStatus />
          <FlexBox>배너, 공유 등</FlexBox>
        </FlexBox>
      </Container>
    );
  }

  if (postData) {
    const { title } = postData;
    return (
      <Container sx={{ height: '100%' }} maxWidth={'md'}>
        <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
          {/* <ServerProfileHeader title={title} serverInfo={server_info} /> */}
          <Typography>{title}</Typography>

          <EditorReader data={postData} />
        </FlexBox>
      </Container>
    );
  }

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <CircularProgress />
      </FlexBox>
    </Container>
  );
}
