import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import userApi from '@/api/user';
import { FlexBox } from '@/components/styled';

export default function UserProfile() {
  const userID = useParams({
    from: '/user/$userID',
    select: (params) => params.userID,
    strict: true,
  });

  console.log(`userID : ${userID}`);

  const { data } = useQuery({
    queryKey: ['user profile', userID],
    queryFn: userApi.queryFn.getUserProfile,
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
