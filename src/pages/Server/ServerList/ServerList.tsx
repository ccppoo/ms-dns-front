import { useEffect, useRef } from 'react';

import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Button, ButtonBase, Chip, Divider, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useParams, useSearch } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { z } from 'zod';

import { FlexBox, FlexPaper } from '@/components/styled';
import { ExternalLink, ExternalLinkNewTab, Image } from '@/components/styled';
import { icon, sample } from '@/static';

export default function ServerList() {
  // const serverID = useParams({
  //   from: '/server/list',
  //   select: (params) => params.serverID,
  //   strict: true,
  // });

  const searchParams = useSearch({
    strict: false,
  });

  // console.log(`serverID  : ${serverID}`);
  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <FlexBox>배너, 공유 등</FlexBox>
      </FlexBox>
    </Container>
  );
}
