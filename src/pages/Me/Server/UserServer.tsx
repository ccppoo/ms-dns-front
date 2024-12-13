import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';
import api from '@/pages/User/api';

export default function MyServer() {
  // /me/server

  // const { data } = useQuery({
  //   queryKey: [userID],
  //   queryFn: api.queryFn.getUserProfile,
  // });

  return (
    <Container sx={{ height: '100%' }} maxWidth={'md'}>
      <FlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          paddingY: 3,
          rowGap: 2,
        }}
      >
        my server page
      </FlexBox>
      <FlexBox></FlexBox>
    </Container>
  );
}
