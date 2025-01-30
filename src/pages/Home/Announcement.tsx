import { ChangeEvent, useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography } from '@mui/material';
import { Box, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { FlexBox, FlexPaper, Image } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';

import api from './api';
import type { ServerProfileListing } from './models';

function AnnouncementListItem({
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

  const serverLogo = server_info.server_logo;
  return (
    <FlexBox sx={{ width: '100%', rowGap: 0.5 }}>
      <FlexPaper sx={{ padding: 1, columnGap: 1, width: '80%' }}>
        <Box
          component={Link}
          to={`/server/read/${postID}`}
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
            <Typography variant="h6">{title}</Typography>
            <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1 }}>
              {server_info.tags.map((tag, idx) => (
                <Chip label={tag} key={`serverInfo-tag-${idx}`} variant="outlined" size="small" />
              ))}
            </FlexBox>
          </FlexBox>
        </Box>
      </FlexPaper>
      <FlexPaper
        sx={{ rowGap: 1, paddingX: 1, paddingY: 0.3, width: '20%', backgroundColor: '#e0e0e0' }}
      >
        {/* 버전 */}
        <FlexBox sx={{ width: '100%', columnGap: 1, rowGap: 0.1, flexDirection: 'column' }}>
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
      </FlexPaper>
    </FlexBox>
  );
}

export default function Announcement() {
  // NOTE: 최대 2개
  const { data } = useQuery({
    queryKey: ['server', ''],
    queryFn: api.queryFn.getHomeServerProfiles,
  });

  if (!data) {
    return (
      <FlexBox sx={{ paddingY: 0, flexDirection: 'column', rowGap: 2 }}>
        <CircularProgress />
      </FlexBox>
    );
  }

  if (!!data) {
    console.log(`data : ${JSON.stringify(data)}`);
    return (
      <FlexBox sx={{ paddingY: 0, flexDirection: 'column', rowGap: 2 }}>
        <FlexBox>
          <Typography variant="body1">공지사항</Typography>
        </FlexBox>
        <FlexPaper sx={{ flexDirection: 'column', padding: 0.5, rowGap: 1 }}>
          {/* {data.map((srvProfile) => (
            <ServerProfileListItem serverProfileListing={srvProfile} key={srvProfile.id} />
          ))} */}
          <FlexBox sx={{ justifyContent: 'end', paddingTop: 1 }}>
            <Box
              component={Link}
              to={`/server/list`}
              sx={{ display: 'flex', columnGap: 2, textDecoration: 'none' }}
              style={{ color: 'black' }}
            >
              <Typography>더 보기</Typography>
            </Box>
          </FlexBox>
        </FlexPaper>
      </FlexBox>
    );
  }
}
