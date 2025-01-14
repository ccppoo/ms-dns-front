import { useEffect, useRef } from 'react';

import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Button, ButtonBase, Chip, Divider, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useSearch } from '@tanstack/react-router';

import { FlexBox, FlexPaper } from '@/components/styled';
import { ExternalLink, ExternalLinkNewTab, Image } from '@/components/styled';
import { icon, sample } from '@/static';

import api from '../api';
import type { ServerProfileListing } from '../models';

function ServerProfileListItem({
  serverProfileListing,
}: {
  serverProfileListing: ServerProfileListing;
}) {
  const { creator: creatorID, title, id: postID } = serverProfileListing;

  const { data } = useQuery({
    queryKey: [creatorID],
    queryFn: api.queryFn.getUserProfile,
  });

  if (data) {
    return (
      <FlexPaper sx={{ height: 60, padding: 1 }}>
        <Link to={`/server/profile/read?id=${postID}`}>
          <FlexBox sx={{ width: '100%' }}>
            <Typography>{title}</Typography>
          </FlexBox>
          <FlexBox></FlexBox>
        </Link>
      </FlexPaper>
    );
  }

  return;
}

export default function ServerProfileList() {
  // const serverID = useParams({
  //   from: '/server/list',
  //   select: (params) => params.serverID,
  //   strict: true,
  // });

  const listingParams = useSearch({
    from: '/server/list',
  });

  const { page } = listingParams;

  const { data } = useQuery({
    queryKey: [],
    queryFn: api.queryFn.getServerProfileList,
  });
  console.log(`data : ${JSON.stringify(data)}`);
  // console.log(`serverID  : ${serverID}`);
  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <Typography>서버 목록</Typography>

        <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
          {!!data ? (
            data.map((srvProfile) => (
              <ServerProfileListItem serverProfileListing={srvProfile} key={srvProfile.id} />
            ))
          ) : (
            <CircularProgress />
          )}
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
