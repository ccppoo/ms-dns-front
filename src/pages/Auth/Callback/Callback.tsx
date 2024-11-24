import { useEffect } from "react"
// import { useSearchParams } from 'react-router-dom';
import { useSearch } from "@tanstack/react-router"

import { Box, Button, ButtonBase, Paper, Typography } from "@mui/material"
import Container from "@mui/material/Container"

import { useQuery } from "@tanstack/react-query"

// import { xbox } from '@/api/auth/oauth';
import { FlexBox, FullSizeCenteredFlexBox, Image } from "@/components/styled"
// import useAuthState from '@/store/auth';
import api from "@/pages/Auth/api"

const closeThisTab = (): void => {
  window.close()
}

export default function CallBack() {
  const { code, scope, authuser, prompt } = useSearch({
    strict: false,
  })
  // const oauth_code = searchParams.get("code") //

  // const [_, __, { setAuthTokens }] = useAuthState();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["oauth callback", code!],
    queryFn: async () =>
      await api.callbackGoogle({ code, scope, authuser, prompt }),
    retry: false,
    enabled: !!code,
  })

  // console.log(`data : ${JSON.stringify(data)}`);

  console.log(`searchParams code : ${code}`)

  // return (
  //   <FullSizeCenteredFlexBox
  //     sx={{ alignItems: "center", justifyContent: "center" }}
  //   >
  //     <Paper sx={{ width: 400, height: 600 }}>
  //       <FlexBox
  //         sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
  //       >
  //         <Typography>{JSON.stringify(code)}</Typography>
  //       </FlexBox>
  //     </Paper>
  //   </FullSizeCenteredFlexBox>
  // )

  if (isLoading) {
    return (
      <FullSizeCenteredFlexBox
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Paper sx={{ width: 400, height: 600 }}>
          <FlexBox
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Loading...</Typography>
          </FlexBox>
        </Paper>
      </FullSizeCenteredFlexBox>
    )
  }

  // // 할 것 - 백엔드에서 Token 또는 인증 성공시 탭 닫기 (원래 이전에 있던 창으로 돌아가기)
  if (isSuccess && data) {
    console.log(`isSuccess`)
    // setAuthTokens(data);
    // closeThisTab();
  }

  return (
    <Container sx={{ height: "100%" }}>
      <FullSizeCenteredFlexBox
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Paper sx={{ width: 400, height: 600 }}>
          <FlexBox
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Redirecting...</Typography>
          </FlexBox>
        </Paper>
      </FullSizeCenteredFlexBox>
    </Container>
  )
}
