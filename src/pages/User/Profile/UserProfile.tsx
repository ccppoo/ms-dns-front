import { useEffect } from "react"
import { useParams } from "@tanstack/react-router"

import Container from "@mui/material/Container"

import { FlexBox, FullSizeCenteredFlexBox } from "@/components/styled"
import { Image } from "@/components/styled"

export default function UserProfile() {
  const userID = useParams({
    from: "/user/$userID",
    select: params => params.userID,
    strict: true,
  })

  console.log(`userID : ${userID}`)
  return (
    <Container sx={{ height: "100%" }} maxWidth={"xl"}>
      <FlexBox
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          paddingY: 3,
          rowGap: 2,
        }}
      >
        user profile page
      </FlexBox>
    </Container>
  )
}
