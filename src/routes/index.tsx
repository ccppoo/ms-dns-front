import { createRouter, createRoute } from "@tanstack/react-router"

import { Route as rootRoute } from "./__root"
import Home from "@/pages/Home"
import authRoute from "@/pages/Auth/routes"
import devRoute from "@/pages/Dev/routes"
import userRoute from "@/pages/User/routes"
import serverRoute from "@/pages/Server/routes"
import domainRoute from "@/pages/Domain/routes"

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>
  },
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  authRoute,
  devRoute,
  userRoute,
  serverRoute,
  domainRoute,
])

const router = createRouter({ routeTree })

export default router
