import * as React from "react"
import { createRoute } from "@tanstack/react-router"
import { Route as rootRoute } from "./__root"
import LoginPage from "@/pages/Auth/Login"
import CallbackPage from "@/pages/Auth/CallBack"

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "auth",
})

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/login",
  component: LoginPage,
})

// callback routes by login methods - sso(google, ... etc)

const callbackRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/callback",
  // component: LoginPage,
})

const ssoRoute = createRoute({
  getParentRoute: () => callbackRoute,
  path: "/sso",
})

const googleSSORoute = createRoute({
  getParentRoute: () => ssoRoute,
  path: "/google",
  component: CallbackPage,
})

authRoute.addChildren([loginRoute, callbackRoute])

callbackRoute.addChildren([ssoRoute])

ssoRoute.addChildren([googleSSORoute])
