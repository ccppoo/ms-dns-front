import { useState } from 'react';

import { Box, Chip, Divider, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

import { useQuery } from '@tanstack/react-query';
import { Link, useSearch } from '@tanstack/react-router';

import serverProfilePostApi from '@/api/post/server_profile';
import type { PaginationOptions } from '@/api/post/types';
import { defaultPaginationOptions } from '@/api/post/values';
import PostListActions from '@/components/post/PostListActions';
import ServerLogoPreview from '@/components/server_logo/ServerLogoPreview';
import { FlexBox, FlexPaper, Image } from '@/components/styled';
import type { ServerProfileListing } from '@/schema/post/server_profile';

interface IServerProfileListItem {
  serverProfileListing: ServerProfileListing;
  page?: number;
}

export function ServerProfileListItem(props: IServerProfileListItem) {
  const { page, serverProfileListing } = props;
  const {
    creator: creatorID,
    title,
    id: postID,
    server_info,
    minecraft_info,
  } = serverProfileListing;

  const serverLogo = server_info.server_logo;
  const _goto = `/server/read/${postID}`;
  const goto = !!page ? `${_goto}?page=${page}` : _goto;
  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 0.5 }}>
      <FlexPaper sx={{ padding: 1, columnGap: 1, width: '100%' }}>
        <Box
          component={Link}
          to={goto}
          sx={{ display: 'flex', columnGap: 2, width: '100%', textDecoration: 'none' }}
          style={{ color: 'black' }}
        >
          <ServerLogoPreview logo_id={serverLogo} notOpaqueOnDefault />
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

export default function ServerProfileList() {
  const listingParams = useSearch({
    from: '/server/list',
  });

  const { page, order, limit } = listingParams;
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    ...defaultPaginationOptions,
    ...(!!page && { page }),
    ...(!!order && { order }),
    ...(!!limit && { limit }),
  });

  const { data } = useQuery({
    queryKey: ['server list', paginationOptions, {}],
    queryFn: serverProfilePostApi.queryFn.getServerProfilePostList,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationOptions((prev) => {
      return { ...prev, page: value };
    });
  };

  if (!!data) {
    const listingItems = data.list;
    const maxPage = data.pages;
    const itemLimit = data.limit;
    return (
      <Container sx={{ height: '100%' }} maxWidth={'md'}>
        <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
          <Typography>서버 목록</Typography>
          <PostListActions topic="server" />
          <FlexBox sx={{ flexDirection: 'column', rowGap: 1, minHeight: 500 }}>
            {listingItems.map((item) => (
              <ServerProfileListItem
                serverProfileListing={item}
                key={item.id}
                page={paginationOptions.page}
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
              count={maxPage}
              page={paginationOptions.page}
              onChange={handleChange}
              size="medium"
            />
          </FlexBox>

          <PostListActions topic="server" />
        </FlexBox>
      </Container>
    );
  }
  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <Typography>서버 목록</Typography>
        <FlexBox sx={{ flexDirection: 'column', rowGap: 1, minHeight: 500 }}>
          <CircularProgress />
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
