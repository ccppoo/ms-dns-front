import { TextField, Typography } from '@mui/material';
import { Box, Chip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import serverProfilePostApi from '@/api/post/server_profile';
import ServerLogoPreview from '@/components/server_logo/ServerLogoPreview';
import { FlexBox, FlexPaper, Image } from '@/components/styled';
import type { ServerProfileListing } from '@/schema/post/server_profile';

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
          <ServerLogoPreview logo_id={serverLogo} notOpaqueOnDefault />

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

export default function ServerList() {
  // NOTE: 최대 5개까지
  const { data } = useQuery({
    queryKey: ['server list', { page: 1, limit: 5 }, {}],
    queryFn: serverProfilePostApi.queryFn.getServerProfilePostList,
  });

  // console.log(`userID : ${userID}`);

  if (!!data) {
    const listingItems = data.list;
    return (
      <FlexBox sx={{ paddingY: 0, flexDirection: 'column', rowGap: 2 }}>
        <FlexBox>
          <Typography variant="body1">최근 업로드 된 서버</Typography>
        </FlexBox>
        <FlexPaper sx={{ flexDirection: 'column', padding: 0.5, rowGap: 1 }}>
          {listingItems.map((srvProfile) => (
            <ServerProfileListItem serverProfileListing={srvProfile} key={srvProfile.id} />
          ))}
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
  return (
    <FlexBox sx={{ paddingY: 0, flexDirection: 'column', rowGap: 2 }}>
      <CircularProgress />
    </FlexBox>
  );
}
