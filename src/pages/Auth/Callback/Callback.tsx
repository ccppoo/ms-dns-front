import { useEffect } from 'react';

import { Box, Button, ButtonBase, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import { useParams, useSearch } from '@tanstack/react-router';

import { getMyProfile } from '@/api/authed/profile';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import useUserProfile from '@/hooks/useUserProfile';
import api from '@/pages/Auth/api';

const closeThisTab = (): void => {
  window.close();
};

export default function CallBack() {
  const SSO_Provider = useParams({
    from: '/auth/callback/sso/$SSO_Provider',
    select: (params) => params.SSO_Provider,
  });
  const { code } = useSearch({
    strict: false,
  });
  const [_, { setNickname, setProfileImage, setUID }] = useUserProfile();
  // callback하고 받는 데이터에 user profile 담에서 보내기
  // 여기서 redux에 사용자 정보 저장하기

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['oauth callback', code!],
    queryFn: async () => await api.callbackSSO(SSO_Provider, { code }),
    retry: false,
    enabled: !!code,
  });

  // const { data: profileData, isSuccess: profileDataSucces } = useQuery({
  //   queryKey: ['get profile'],
  //   queryFn: async () => await getMyProfile(),
  //   retry: false,
  //   enabled: !!isSuccess,
  // });

  // console.log(`data : ${JSON.stringify(data)}`);
  // console.log(`searchParams code : ${code}`);

  if (isLoading) {
    return (
      <FullSizeCenteredFlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ width: 400, height: 600 }}>
          <FlexBox
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>Loading...</Typography>
          </FlexBox>
        </Paper>
      </FullSizeCenteredFlexBox>
    );
  }

  // // 할 것 - 백엔드에서 Token 또는 인증 성공시 탭 닫기 (원래 이전에 있던 창으로 돌아가기)
  if (isSuccess && data) {
    // console.log(`isSuccess`);
    // data.nickname
    // console.log(`data : ${JSON.stringify(data)}`);
    setNickname(data.nickname, data.expires);
    setProfileImage(data.profileImage, data.expires);
    setUID(data.uid, data.expires);
    closeThisTab();

    return (
      <Container sx={{ height: '100%' }}>
        <FullSizeCenteredFlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Paper sx={{ width: 400, height: 600 }}>
            <FlexBox
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>Fetching data...</Typography>
            </FlexBox>
          </Paper>
        </FullSizeCenteredFlexBox>
      </Container>
    );
  }

  // if (isSuccess && profileDataSucces) {
  //   console.log(`profileData: ${JSON.stringify(profileData)}`);
  //   // dispatch(setUserProfile(profileData!));
  //   // setNickname()

  //   return (
  //     <Container sx={{ height: '100%' }}>
  //       <FullSizeCenteredFlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
  //         <Paper sx={{ width: 400, height: 600 }}>
  //           <FlexBox
  //             sx={{
  //               width: '100%',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //             }}
  //           >
  //             <Typography>Good!</Typography>
  //           </FlexBox>
  //         </Paper>
  //       </FullSizeCenteredFlexBox>
  //     </Container>
  //   );
  // }
  return (
    <Container sx={{ height: '100%' }}>
      <FullSizeCenteredFlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ width: 400, height: 600 }}>
          <FlexBox
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>Problem with login</Typography>
          </FlexBox>
        </Paper>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
