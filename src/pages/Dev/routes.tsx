import { createRoute } from "@tanstack/react-router"
import { Route as rootRoute } from "@/routes/__root"
import DevPage from "@/pages/Dev/Dev"

const devRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "dev",
  component: DevPage,
})

export default devRoute
