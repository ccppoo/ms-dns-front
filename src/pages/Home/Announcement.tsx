import { ChangeEvent, useState } from 'react';

import { TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from '@tanstack/react-query';

import announcementPostApi from '@/api/post/announcement';
import type { PaginationOptions } from '@/api/post/types';
import { FlexBox, FlexPaper, Image } from '@/components/styled';
import { AnnouncementListItem } from '@/pages/Announcement/AnnouncementList/AnnouncementList';

export default function Announcement() {
  // NOTE: 최대 2개
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    page: 1,
    limit: 2,
  });
  const { data } = useQuery({
    queryKey: ['announcement list', paginationOptions, {}],
    queryFn: announcementPostApi.queryFn.getAnnouncementPostList,
  });

  // console.log(`data : ${JSON.stringify(data)}`);
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
    </FlexBox>
  );
}
