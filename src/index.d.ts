// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Vite
// plugin that tells the Electron app where to look for the Vite-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

interface Versions {
  node: () => string;
  chrome: () => string;
  electron: () => string;
}

interface TwitchAuth {
  requestAuth: () => void;
  onAuthResult: (callback: (data: {
    access_token: string;
    expires_in?: number;
    scope?: string[];
    token_type?: string;
  }) => void) => () => void;
}

declare interface Window {
  versions: Versions
  twitchAuth: TwitchAuth
}
