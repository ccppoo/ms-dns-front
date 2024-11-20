import * as React from "react"
import { Outlet, createRootRoute, Link } from "@tanstack/react-router"
import Header from "@/sections/Header"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
