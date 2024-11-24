import { Outlet, createRootRoute, Link } from "@tanstack/react-router"
import Header from "@/sections/Header"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import DevHeader from "@/sections/DevHeader"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <DevHeader />
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
