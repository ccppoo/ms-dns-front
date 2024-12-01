import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { FlexBox, Image } from '@/components/styled';
import api from '@/pages/Me/api';

export default function MyProfile() {
  // '/me/profile'

  const { data } = useQuery({
    queryKey: [],
    queryFn: api.queryFn.getMyProfile,
  });

  return (
    <Container sx={{ height: '100%' }} maxWidth={'xl'}>
      <FlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          paddingY: 3,
          rowGap: 2,
        }}
      >
        my profile page
      </FlexBox>
      <FlexBox>
        <Image src="https://cdn.discordapp.com/avatars/387217054823874560/ffefe8cfd342138ce0ae3581a79c66c3.png" />
      </FlexBox>
      <FlexBox>{JSON.stringify(data)}</FlexBox>
    </Container>
  );
}
