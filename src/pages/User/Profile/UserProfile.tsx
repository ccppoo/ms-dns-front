import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox } from '@/components/styled';
import api from '@/pages/User/api';

export default function UserProfile() {
  const userID = useParams({
    from: '/user/$userID',
    select: (params) => params.userID,
    strict: true,
  });

  console.log(`userID : ${userID}`);

  const { data } = useQuery({
    queryKey: [userID],
    queryFn: api.queryFn.getUserProfile,
  });

  return (
    <Container sx={{ height: '100%' }} maxWidth={'lg'}>
      <FlexBox
        sx={{
          flexDirection: 'column',
        }}
      >
        user profile page
      </FlexBox>
      <FlexBox>{JSON.stringify(data)}</FlexBox>
    </Container>
  );
}
