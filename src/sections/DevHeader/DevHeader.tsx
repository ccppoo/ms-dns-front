import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"

import { FlexBox } from "@/components/styled"
import { Link } from "@tanstack/react-router"

type DevLink = {
  name: string
  path: string
}
const goto: DevLink[] = [
  {
    name: "home",
    path: "/",
  },
]

function DevHeaderLink({ name, path }: DevLink) {
  return <Link href={path}>{name}</Link>
}

export default function DevHeader() {
  const naviButtonSize = 35
  const MainTitleWidth = 100

  return (
    // <Box sx={{ width: '100%', position: 'sticky' }} data-pw={`theme-${theme}`}>
    <Box sx={{ width: "100%", position: "sticky" }}>
      <AppBar
        color="transparent"
        elevation={1}
        position="sticky"
        sx={{ top: 0, paddingX: 0 }}
      >
        <FlexBox sx={{ paddingX: 3, columnGap: 3, fontSize: 21 }}>
          {goto.map((devLink, idx) => (
            <DevHeaderLink {...devLink} key={`dev-href-${idx}`} />
          ))}
        </FlexBox>
      </AppBar>
    </Box>
  )
}
