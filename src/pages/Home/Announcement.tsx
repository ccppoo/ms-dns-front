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

import type { PaginationOptions } from '@/api/post/types';
import { FlexBox, FlexPaper, Image } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import { AnnouncementListItem } from '@/pages/Announcement/AnnouncementList/AnnouncementList';
import announcementApi from '@/pages/Announcement/api';

import api from './api';
import type { ServerProfileListing } from './models';

export default function Announcement() {
  // NOTE: 최대 2개
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    page: 1,
    limit: 2,
  });
  const { data } = useQuery({
    queryKey: ['announcement list', paginationOptions, {}],
    queryFn: announcementApi.queryFn.getAnnouncementPostList,
  });

  // const { data } = useQuery({
  //   queryKey: ['server', ''],
  //   queryFn: api.queryFn.getHomeServerProfiles,
  // });

  console.log(`data : ${JSON.stringify(data)}`);
  return (
    <FlexBox sx={{ paddingY: 0, flexDirection: 'column', rowGap: 0.5 }}>
      <FlexBox>
        <Typography variant="body1">공지사항</Typography>
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column', padding: 0.5, rowGap: 1 }}>
        {!!data ? (
          data.list.map((item) => (
            <AnnouncementListItem
              announcementListing={item}
              key={item.id}
              page={paginationOptions.page!}
            />
          ))
        ) : (
          <CircularProgress />
        )}
      </FlexBox>
      {/* <FlexBox sx={{ justifyContent: 'end', paddingTop: 1 }}>
        <Box
          component={Link}
          to={`/server/list`}
          sx={{ display: 'flex', columnGap: 2, textDecoration: 'none' }}
          style={{ color: 'black' }}
        >
          <Typography>더 보기</Typography>
        </Box>
      </FlexBox> */}
    </FlexBox>
  );
}
