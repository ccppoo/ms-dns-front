import { Fragment } from "react"
// import { BrowserRouter } from "react-router-dom"

import CssBaseline from "@mui/material/CssBaseline"

import { withErrorHandler } from "@/error-handling"
import AppErrorBoundaryFallback from "@/error-handling/fallbacks/App"
// import Pages from "@/routes/Pages"
// import DevHeader from "@/sections/DevHeader"
// import Header from "@/sections/Header"
// import HotKeys from "@/sections/HotKeys"
import Notifications from "@/sections/Notifications"
// import SW from '@/sections/SW';
import pageRoutes from "@/routes"
import { RouterProvider } from "@tanstack/react-router"

// const router = createRouter({ routeTree })

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Notifications />
      {/* <HotKeys /> */}
      {/* <SW /> */}
      {/* <BrowserRouter> */}
      {/* <DevHeader /> */}
      {/* <Header /> */}
      {/* <Pages /> */}
      {/* </BrowserRouter> */}
      <RouterProvider router={pageRoutes} />
    </Fragment>
  )
}

export default withErrorHandler(App, AppErrorBoundaryFallback)
