import { createRoute } from "@tanstack/react-router"
import { Route as rootRoute } from "@/routes/__root"
import ServerProfilePage from "@/pages/Server/Profile"

const serverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/server",
})

const serverProfileRoute = createRoute({
  getParentRoute: () => serverRoute,
  path: "/$serverID",
  component: ServerProfilePage,
})

serverRoute.addChildren([serverProfileRoute])

export default serverRoute
