/// <reference types="vitest" />
import * as path from 'path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), mkcert({})],
  server: {
    hmr: {
      host: 'localhost',
    },
  },
  envDir: './env',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    root: path.resolve(__dirname, './src'),
  },
});
