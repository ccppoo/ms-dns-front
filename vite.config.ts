/// <reference types="vite/client" />
import * as path from 'path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ command, mode }) => {
  const isDev = mode == 'dev';
  const isBuild = command == 'build';
  const certPath = isDev ? path.resolve(__dirname, './certs/cert.pem') : '';
  const keyPath = isDev ? path.resolve(__dirname, './certs/key.pem') : '';
  const defaultPlugins = [TanStackRouterVite(), react()];

  console.log(`isDev : ${isDev} | isBuild : ${isBuild}`);

  return {
    plugins: defaultPlugins,
    server: {
      hmr: {
        host: isDev ? 'localhost' : undefined,
      },
      port: 5173,
      https: isDev
        ? {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
          }
        : undefined,
    },
    preview: {
      strictPort: true,
      port: 5173,
      https: isDev
        ? {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath),
          }
        : undefined,
    },
    envDir: './env',
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      root: path.resolve(__dirname, './src'),
    },
    // build: {
    //   minify: false,
    // },
  };
});
