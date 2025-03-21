import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';

import announcementPostApi from '@/api/post/announcement';
import AnnouncementEditor from '@/components/editor/AnnouncementEditor';
import { FlexBox } from '@/components/styled';

export default function AnnouncementEdit() {
  const postID = useSearch({
    from: '/announcement/edit',
    select: (params) => params.id,
    strict: true,
  });

  // console.log(`serverID  : ${serverID}`);

  // 양식, 공지사항, 등 내용 있을 경우 api로 불러오는 것
  const { data } = useQuery({
    queryKey: ['get post', postID],
    queryFn: announcementPostApi.queryFn.getAnnouncementPost,
    enabled: !!postID,
  });

  if (postID) {
    if (data) {
      return (
        <Container sx={{ height: '100%' }} maxWidth={'md'}>
          <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
            <AnnouncementEditor readOnly={false} data={data} />
          </FlexBox>
        </Container>
      );
    }
  }
  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <AnnouncementEditor readOnly={false} />
      </FlexBox>
    </Container>
  );
}
