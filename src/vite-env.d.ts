/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TWITCH_CLIENT_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
