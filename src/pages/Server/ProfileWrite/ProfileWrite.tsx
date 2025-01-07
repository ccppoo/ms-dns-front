import { useEffect, useRef } from 'react';

import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Button, ButtonBase, Chip, Divider, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import ServerProfileEditor from '@/components/editor/ServerPostEditor';
import { FlexBox, FlexPaper } from '@/components/styled';
import { ExternalLink, ExternalLinkNewTab, Image } from '@/components/styled';
import { icon, sample } from '@/static';

const TEMP_IMAGE = 'https://cdn.mc-server.kr/static/mc-server-logo-200x200.png';

export default function ServerProfileWrite() {
  // const serverID = useParams({
  //   from: '/new/write',
  //   select: (params) => params.serverID,
  //   strict: true,
  // });

  // console.log(`serverID  : ${serverID}`);

  // 양식, 공지사항, 등 내용 있을 경우 api로 불러오는 것
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['create post', 'server profile'],
    // queryFn: api.queryFn.getPostEditMode,
    // enabled: isPostEditMode,
  });

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox>
        <Typography>서버 프로필 쓰기</Typography>
      </FlexBox>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <ServerProfileEditor readOnly={false} />
      </FlexBox>
    </Container>
  );
}
