import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import ServerProfileEditor from '@/components/editor/ServerPostEditor';
import { FlexBox } from '@/components/styled';

export default function ServerProfileWrite() {
  // const serverID = useParams({
  //   from: '/new/write',
  //   select: (params) => params.serverID,
  //   strict: true,
  // });

  // console.log(`serverID  : ${serverID}`);

  // 양식, 공지사항, 등 내용 있을 경우 api로 불러오는 것
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['create post', 'server profile'],
    // queryFn: api.queryFn.getPostEditMode,
    // enabled: isPostEditMode,
  });

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox sx={{ paddingY: 3, flexDirection: 'column', rowGap: 2 }}>
        <ServerProfileEditor readOnly={false} />
      </FlexBox>
    </Container>
  );
}
