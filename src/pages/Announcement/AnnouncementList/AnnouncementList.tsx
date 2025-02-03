import { useState } from 'react';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Chip, Divider, Paper, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';

import { useQuery } from '@tanstack/react-query';
import { Link, useSearch } from '@tanstack/react-router';

import type { PaginationOptions } from '@/api/post/types';
import { defaultPaginationOptions } from '@/api/post/values';
import userApi from '@/api/user';
import PostListActions from '@/components/post/PostListActions';
import { FlexBox, FlexPaper, Image } from '@/components/styled';

import api from '../api';
import type { AnnouncementListing } from '../models';

interface IListItemCreator {
  creatorID: string;
}
function ListItemCreator(props: IListItemCreator) {
  const { creatorID } = props;

  const { data, isSuccess } = useQuery({
    queryKey: ['user profile', creatorID],
    queryFn: userApi.queryFn.getUserProfile,
  });

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 1,
      }}
    >
      <Divider orientation="vertical" />
      <FlexBox sx={{ alignItems: 'center', columnGap: 0.1 }}>
        {isSuccess && data && (
          <>
            <Avatar src={data.profileImage} sx={{ width: 30, height: 30 }} />
            <Typography style={{ fontSize: '0.9rem' }}>{data.nickname}</Typography>
          </>
        )}
      </FlexBox>
      <Divider orientation="vertical" />
    </FlexBox>
  );
}

export function AnnouncementListItem({
  announcementListing,
  page,
}: {
  announcementListing: AnnouncementListing;
  page: number;
}) {
  const { creator: creatorID, title, id: postID, created_at } = announcementListing;

  const writeDate = new Date(created_at).toLocaleDateString();
  return (
    <FlexPaper sx={{ padding: 1, columnGap: 1, width: '100%' }}>
      <Box
        component={Link}
        to={`/announcement/read/${postID}?page=${page}`}
        sx={{ columnGap: 2, width: '100%', flexGrow: 1, textDecoration: 'none' }}
        style={{ color: 'black' }}
      >
        <Grid container spacing={1}>
          <Grid size={{ md: 7, sm: 12 }}>
            <FlexBox
              sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                paddingX: 1,
              }}
            >
              <Typography variant="body1">{title}</Typography>
            </FlexBox>
          </Grid>
          <Grid size={{ md: 3.2, sm: 8 }}>
            <ListItemCreator creatorID={creatorID} />
          </Grid>
          <Grid size={{ md: 1.8, sm: 4 }}>
            <FlexBox
              sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingX: 1,
              }}
            >
              <Typography style={{ fontSize: '0.9rem' }}>{writeDate}</Typography>
            </FlexBox>
          </Grid>
        </Grid>
      </Box>
    </FlexPaper>
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
    queryKey: ['announcement list', paginationOptions, {}],
    queryFn: api.queryFn.getAnnouncementPostList,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationOptions((prev) => {
      return { ...prev, page: value };
    });
  };

  if (!!data) {
    const listingItems = data.list;
    const maxPages = data.pages;
    const itemLimit = data.limit;
    return (
      <Container sx={{ height: '100%' }} maxWidth={'md'}>
        <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
          <Typography>공지사항</Typography>
          <PostListActions topic="announcement" adminOnly />
          <FlexBox sx={{ flexDirection: 'column', rowGap: 1, minHeight: 500 }}>
            {listingItems.map((item) => (
              <AnnouncementListItem
                announcementListing={item}
                key={item.id}
                page={paginationOptions.page!}
              />
            ))}
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
              count={maxPages}
              page={paginationOptions.page}
              onChange={handleChange}
              size="medium"
            />
          </FlexBox>

          <PostListActions topic="announcement" adminOnly />
        </FlexBox>
      </Container>
    );
  }
  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <Typography>공지사항</Typography>
      </FlexBox>
      <FlexBox>
        <CircularProgress />
      </FlexBox>
    </Container>
  );
}
