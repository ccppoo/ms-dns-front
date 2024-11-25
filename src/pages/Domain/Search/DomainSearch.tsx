import { useEffect } from "react"

import Container from "@mui/material/Container"

import { FlexBox, FullSizeCenteredFlexBox } from "@/components/styled"
import { Image } from "@/components/styled"
import { useSearch } from "@tanstack/react-router"

export default function DomainSearch() {
  const searchParams = useSearch({
    strict: false,
  })

  console.log(`searchParams : ${JSON.stringify(searchParams)}`)
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
        search domain
      </FlexBox>
    </Container>
  )
}
