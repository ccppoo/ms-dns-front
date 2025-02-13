/// <reference types="vite/client" />
/// <reference types="vitest" />
import * as path from 'path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { defineConfig as testConfig } from 'vitest/config';

const certPath = path.resolve(__dirname, './certs/cert.pem');
const keyPath = path.resolve(__dirname, './certs/key.pem');

export default defineConfig(({ command, mode }) => {
  const isDev = mode == 'dev';
  const defaultPlugins = [TanStackRouterVite(), react()];
  console.log(`isDev : ${isDev}`);

  return {
    // plugins: isDev ? [...defaultPlugins, mkcert({})] : defaultPlugins,
    plugins: defaultPlugins,
    server: {
      hmr: {
        host: isDev ? 'localhost' : undefined,
      },
      port: 5173,
      https: {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      },
    },
    preview: {
      strictPort: true,
      port: 5173,
      https: {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      },
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
    build: {
      minify: false,
    },
  };
});
