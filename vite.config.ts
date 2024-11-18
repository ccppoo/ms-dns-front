/// <reference types="vitest" />
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

import * as path from "path"
import mkcert from "vite-plugin-mkcert"

import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), mkcert({})],
  server: {
    hmr: {
      host: "localhost",
    },
  },
  envDir: "./env",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    root: path.resolve(__dirname, "./src"),
  },
})
