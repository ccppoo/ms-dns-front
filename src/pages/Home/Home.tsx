import { useEffect } from "react"

import Container from "@mui/material/Container"

import { FlexBox, FullSizeCenteredFlexBox } from "@/components/styled"
import { Image } from "@/components/styled"

export default function Home() {
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
        this is home
      </FlexBox>
    </Container>
  )
}
