import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
})

// type the twitch token response
interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  scope?: string[];
  token_type?: string;
}

// type the API that will be exposes to the renderer
interface TwitchAuthApi {
  requestAuth: () => void;
  onAuthResult: (callback: (data: TwitchTokenResponse) => void) => () => void;
}

contextBridge.exposeInMainWorld('twitchAuth', {
  requestAuth: () => ipcRenderer.send('request-twitch-auth'),
  onAuthResult: (callback: (data: TwitchTokenResponse) => void): (() => void) => {
    const subscription = (_event: IpcRendererEvent, data: TwitchTokenResponse) => callback(data);
    ipcRenderer.on('twitch-token', subscription);
    return () => {
      ipcRenderer.removeListener('twitch-token', subscription);
    };
  }
} as TwitchAuthApi)
