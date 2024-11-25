import { useEffect } from "react"
import { useParams } from "@tanstack/react-router"

import Container from "@mui/material/Container"

import { FlexBox, FullSizeCenteredFlexBox } from "@/components/styled"
import { Image } from "@/components/styled"
import { z } from "zod"

export default function ServerProfile() {
  const serverID = useParams({
    from: "/server/$serverID",
    select: params => params.serverID,
    strict: true,
  })

  console.log(`serverID  : ${serverID}`)
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
        server profile page
      </FlexBox>
    </Container>
  )
}
