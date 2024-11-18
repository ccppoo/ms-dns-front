import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"

const FlexBox = styled(Box)({
  display: "flex",
})
const Image = styled("img")({
  width: "100%",
  height: "100%",
  margin: 0,
})
const CenteredFlexBox = styled(FlexBox)({
  justifyContent: "center",
  alignItems: "center",
})

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: "100%",
  height: "100%",
})

export { FlexBox, Image, CenteredFlexBox, FullSizeCenteredFlexBox }
