import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Button, Chip, Divider, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import serverProfilePostApi from '@/api/post/server_profile';
import EditorReader from '@/components/editor/components/Reader';
import PostManagements from '@/components/post/PostManagements';
import PostreadActions from '@/components/post/PostReadActions';
import { FlexBox, FlexPaper } from '@/components/styled';
import { ExternalLinkNewTab, Image } from '@/components/styled';
import type { ServerInfo } from '@/schema/post/server_profile';
import { icon } from '@/static';

const TEMP_IMAGE = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';

function CopyToClipBoard({ text, value }: { text: string; value: string }) {
  const copyToClipBoard = async () => {
    try {
      await window.navigator.clipboard.writeText(value);
      alert(`복사되었습니다 : ${value}`);
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
  );
}

interface IServerProfileHeader {
  title: string;
  serverInfo: ServerInfo;
}

function ServerProfileHeader(props: IServerProfileHeader) {
  const { title, serverInfo } = props;

  const serverName = title;
  const serverTags = serverInfo?.tags;
  const server24Hour = !!serverInfo?.service24hr;
  const serverAddress = serverInfo?.server_address;
  const serverLogo = serverInfo.server_logo;

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
            <Image src={serverLogo || TEMP_IMAGE} sx={{ height: 100, width: 100 }} />
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Typography>서버 주소 </Typography>
            <CopyToClipBoard text={serverAddress} value={serverAddress} />
          </FlexBox>

          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Typography>24시간 운영</Typography>
            {server24Hour ? <Typography>O</Typography> : <Typography>X</Typography>}
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
    <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
      <Typography>서버 커뮤니티</Typography>
      <FlexPaper
        sx={{ padding: 1, width: '100%', columnGap: 2, rowGap: 1, flexWrap: 'wrap', minHeight: 40 }}
      >
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
    </FlexBox>
  );
}

// function ServerProfileIndex() {
//   const index: { name: string; hash: string }[] = [
//     {
//       name: '소개',
//       hash: 'intro',
//     },
//     {
//       name: '서버 상태',
//       hash: 'status',
//     },
//   ];
//   const ref = useRef<HTMLDivElement>(null);

//   const onClickSmoothScroll: React.MouseEventHandler<HTMLAnchorElement> = (
//     event: React.MouseEvent,
//   ) => {
//     event.preventDefault();
//     let offset = () => ref.current?.offsetTop;
//     // ref.current?.offsetTop;
//     const href = event.currentTarget.getAttribute('href');
//     const anchorID = href?.split('#')[1];
//     const anchor = document.getElementById(anchorID!)!;
//     const offsetTop = anchor.getBoundingClientRect().top + window.scrollY;
//     window.scroll({
//       top: offsetTop - offset()!,
//       behavior: 'smooth',
//     });
//   };
//   return (
//     <FlexBox sx={{ columnGap: 2 }} ref={ref}>
//       {index.map((indexItem, idx) => (
//         <FlexPaper sx={{ padding: 1 }} key={`idx-item-${idx}`}>
//           <Link hash={indexItem.hash} onClick={onClickSmoothScroll}>
//             {indexItem.name}
//           </Link>
//         </FlexPaper>
//       ))}
//     </FlexBox>
//   );
// }

export default function ProfileRead() {
  const postID = useParams({
    from: '/server/read/$postID',
    select: (params) => params.postID,
    strict: true,
  });

  console.log(`postID : ${postID}`);

  const { data: postData } = useQuery({
    queryKey: ['server profile', postID],
    queryFn: serverProfilePostApi.queryFn.getServerProfilePost,
    enabled: !!postID,
  });

  if (postData) {
    const { server_info, server_community, minecraft_info, title } = postData;
    return (
      <Container sx={{ height: '100%' }} maxWidth={'md'}>
        <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
          <PostManagements postID={postID} topic="server" creator={postData.creator!} />
          <ServerProfileHeader title={title} serverInfo={server_info} />
          <ServerSystemDetail version={minecraft_info.version} launcher={minecraft_info.launcher} />
          <ServerExternalLinks community={server_community} />
          <EditorReader data={postData} />
          <PostreadActions topic="server" />
          <PostManagements postID={postID} topic="server" creator={postData.creator!} />
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
