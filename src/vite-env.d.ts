/// <reference types="vite/client" />

declare module '@editorjs/embed' {
  declare class Embed {}
  export default Embed;
}


interface ImportMetaEnv {
  readonly VITE_API_HOST: string
  readonly VITE_CDN_HOST: string
  readonly VITE_MODE: 'dev' | 'production' | 'preview'
}