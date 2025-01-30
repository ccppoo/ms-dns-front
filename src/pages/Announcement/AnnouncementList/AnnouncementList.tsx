import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Chip, Divider, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

import { useQuery } from '@tanstack/react-query';
import { Link, useSearch } from '@tanstack/react-router';

import type { PaginationOptions } from '@/api/post/types';
import { defaultPaginationOptions } from '@/api/post/values';
import { FlexBox, FlexPaper, Image } from '@/components/styled';

import api from '../api';
import type { AnnouncementListing } from '../models';

function AnnouncementListItem({
  announcementListing,
}: {
  announcementListing: AnnouncementListing;
}) {
  const { creator: creatorID, title, id: postID } = announcementListing;

  const { data } = useQuery({
    queryKey: [creatorID],
    queryFn: api.queryFn.getUserProfile,
  });

  if (data) {
    return (
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 0.5 }}>
        <FlexPaper sx={{ padding: 1, columnGap: 1, width: '100%' }}>
          <Box
            component={Link}
            to={`/announcement/read/${postID}`}
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
                // src={serverLogo}
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
              <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1 }}>asdasd</FlexBox>
            </FlexBox>
          </Box>
        </FlexPaper>
      </FlexBox>
    );
  }

  return;
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
      to={'/announcement/edit'}
    >
      <EditOutlinedIcon />
      <Typography>새로 쓰기</Typography>
    </Paper>
  );
}

export default function ServerProfileList() {
  const listingParams = useSearch({
    from: '/announcement/list',
  });

  const { page, order, limit } = listingParams;
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    ...defaultPaginationOptions,
    ...(!!page && { page }),
    ...(!!order && { order }),
    ...(!!limit && { limit }),
  });

  const { data } = useQuery({
    queryKey: ['announcement list', paginationOptions],
    queryFn: api.queryFn.getAnnouncementPostList,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationOptions((prev) => {
      return { ...prev, page: value };
    });
  };

  // console.log(`data : ${JSON.stringify(data)}`);
  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <Typography>서버 목록</Typography>
        <FlexBox sx={{ justifyContent: 'end' }}>
          <ServerProfileWriteButton />
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column', rowGap: 1, minHeight: 300 }}>
          {!!data ? (
            data.list.map((item) => (
              <AnnouncementListItem announcementListing={item} key={item.id} />
            ))
          ) : (
            <CircularProgress />
          )}
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
          <Pagination
            count={3}
            page={paginationOptions.page}
            onChange={handleChange}
            size="medium"
          />
        </FlexBox>

        <FlexBox sx={{ justifyContent: 'end' }}>
          <ServerProfileWriteButton />
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
