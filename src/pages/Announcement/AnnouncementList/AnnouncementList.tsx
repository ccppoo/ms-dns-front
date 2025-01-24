import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Chip, Divider, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

import { useQuery } from '@tanstack/react-query';
import { Link, useSearch } from '@tanstack/react-router';

import { FlexBox, FlexPaper, Image } from '@/components/styled';

import api from '../api';
import type { ServerProfileListing } from '../models';

function ServerProfileListItem({
  serverProfileListing,
}: {
  serverProfileListing: ServerProfileListing;
}) {
  const {
    creator: creatorID,
    title,
    id: postID,
    server_info,
    minecraft_info,
  } = serverProfileListing;

  const { data } = useQuery({
    queryKey: [creatorID],
    queryFn: api.queryFn.getUserProfile,
  });

  const serverLogo = server_info.server_logo;

  if (data) {
    return (
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 0.5 }}>
        <FlexPaper sx={{ padding: 1, columnGap: 1, width: '100%' }}>
          <Box
            component={Link}
            to={`/server/profile/read?id=${postID}`}
            sx={{ display: 'flex', columnGap: 2, width: '100%', textDecoration: 'none' }}
            style={{ color: 'black' }}
          >
            <FlexPaper
              sx={{
                width: 75,
                height: 75,
                flexShrink: 0,
                padding: 0.5,
                justifyContent: 'center',
              }}
              elevation={2}
            >
              <Image
                src={serverLogo}
                sx={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                }}
              />
            </FlexPaper>
            <FlexBox
              sx={{
                width: '100%',
                paddingTop: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h5">{title}</Typography>
              <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1 }}>
                {server_info.tags.map((tag, idx) => (
                  <Chip label={tag} key={`serverInfo-tag-${idx}`} variant="outlined" size="small" />
                ))}
              </FlexBox>
            </FlexBox>
          </Box>
        </FlexPaper>
        <FlexPaper sx={{ rowGap: 1, paddingX: 1, paddingY: 0.3, backgroundColor: '#e0e0e0' }}>
          {/* 버전 */}
          <FlexBox sx={{ width: '100%', columnGap: 1, rowGap: 0.1 }}>
            <FlexBox sx={{ alignItems: 'center', width: 30, flexShrink: '0' }}>
              <Typography variant="subtitle2">버전</Typography>
            </FlexBox>
            <FlexBox
              sx={{
                overflowX: 'hidden',
                flexWrap: 'wrap',
                alignItems: 'center',
                rowGap: 0.3,
                columnGap: 0.5,
              }}
            >
              {minecraft_info.version.map((vrson, idx) => (
                <Chip
                  label={vrson}
                  key={`mc-version-${idx}`}
                  variant="filled"
                  size="small"
                  sx={{ backgroundColor: '#f7f7f7' }}
                />
              ))}
            </FlexBox>
          </FlexBox>
          {/* 런처 */}
          <FlexBox sx={{ width: '100%', columnGap: 1, rowGap: 0.1 }}>
            <FlexBox sx={{ alignItems: 'center', width: 30, flexShrink: '0' }}>
              <Typography variant="subtitle2">런처</Typography>
            </FlexBox>
            <FlexBox
              sx={{ overflowX: 'hidden', alignItems: 'center', rorowGap: 0.3, columnGap: 0.5 }}
            >
              {minecraft_info.launcher.map((launcher, idx) => (
                <Chip
                  label={launcher}
                  key={`mc-launcher-${idx}`}
                  variant="outlined"
                  size="small"
                  sx={{ backgroundColor: '#f7f7f7' }}
                />
              ))}
            </FlexBox>
          </FlexBox>
        </FlexPaper>
      </FlexBox>
    );
  }

  return;
}

interface IServerProfileLists {
  list: ServerProfileListing[];
}

function ServerProfileLists(props: IServerProfileLists) {
  const { list } = props;

  return (
    <>
      {list.map((srvProfile) => (
        <ServerProfileListItem serverProfileListing={srvProfile} key={srvProfile.id} />
      ))}
    </>
  );
}

function ServerProfileWriteButton() {
  return (
    <Paper
      sx={{
        display: 'flex',
        columnGap: 0.5,
        paddingX: 0.5,
        paddingY: 0.2,
        textDecoration: 'none',
        flexGrow: 0,
      }}
      style={{ color: 'black' }}
      component={Link}
      to={'/server/new/write'}
    >
      <EditOutlinedIcon />
      <Typography>새로 쓰기</Typography>
    </Paper>
  );
}

export default function ServerProfileList() {
  // const serverID = useParams({
  //   from: '/server/list',
  //   select: (params) => params.serverID,
  //   strict: true,
  // });

  const listingParams = useSearch({
    from: '/announcement/list',
  });

  const { page } = listingParams;
  const [listingPage, setListingPage] = useState<number>(page || 1);

  const { data } = useQuery({
    queryKey: ['server', 'list', listingPage],
    queryFn: api.queryFn.getServerProfileList,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setListingPage(value);
  };

  if (data) {
    console.log(`data : ${JSON.stringify(data)}`);
    return (
      <Container sx={{ height: '100%' }} maxWidth={'md'}>
        <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
          <Typography>서버 목록</Typography>
          <FlexBox sx={{ justifyContent: 'end' }}>
            <ServerProfileWriteButton />
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column', rowGap: 1, minHeight: 300 }}>
            {!!data ? <ServerProfileLists list={data} /> : <CircularProgress />}
          </FlexBox>

          <FlexBox
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 3,
              rowGap: 1,
              flexDirection: 'column',
            }}
          >
            <Divider variant="middle" />
            <Pagination count={3} page={listingPage} onChange={handleChange} size="medium" />
          </FlexBox>

          <FlexBox sx={{ justifyContent: 'end' }}>
            <ServerProfileWriteButton />
          </FlexBox>
        </FlexBox>
      </Container>
    );
  }
}
