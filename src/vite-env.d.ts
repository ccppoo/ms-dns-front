/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_IMAGE_API_HOST: string;
  readonly VITE_MODE: 'dev' | 'production' | 'preview';
}
