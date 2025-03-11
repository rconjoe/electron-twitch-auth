import { BrowserWindow } from 'electron';
import * as path from 'path';
import secrets from '../../secrets.json';

interface TwitchOAuthConfig {
  clientId: string;
  redirectUri: string;
  scopes: string[];
}

interface TwitchTokenResponse {
  access_token: string;
  expires_in?: number;
  scope?: string[];
  token_type?: string;
}

const oauthConfig: TwitchOAuthConfig = {
  clientId: secrets.TWITCH_CLIENT_ID,
  redirectUri: 'http://localhost:5173',
  scopes: ['user:read:chat', 'user:write:chat'],
}

export function createAuthWindow(mainWindow: BrowserWindow): void {
  const authWindow = new BrowserWindow({
    width: 500,
    height: 700,
    show: true,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, 'auth-preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  const scopeString = oauthConfig.scopes.join(' ');
  const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${oauthConfig.clientId
    }&redirect_uri=${encodeURIComponent(oauthConfig.redirectUri)
    }&response_type=token&scope=${encodeURIComponent(scopeString)
    }`;

  authWindow.loadURL(authUrl);
  authWindow.show();

  // handle the redirect adn extract the token
  authWindow.webContents.on('will-redirect', (details) => {
    const newUrl = details.url;
    console.log(newUrl);
    if (newUrl.startsWith(oauthConfig.redirectUri)) {
      try {
        const parsedUrl = new URL(newUrl);
        const hash = parsedUrl.hash;

        if (hash) {
          // extract token from url fragment (#access_token=...)
          const hashParams = new URLSearchParams(hash.substring(1));
          const accessToken = hashParams.get('access_token');

          if (accessToken) {
            // create typed token reponse
            const tokenResponse: TwitchTokenResponse = {
              access_token: accessToken,
              expires_in: Number(hashParams.get('expires_in')) || undefined,
              scope: hashParams.get('scope')?.split(' ') || undefined,
              token_type: hashParams.get('token_type') || undefined
            };

            // send token back to main window
            mainWindow.webContents.send('twitch-token', tokenResponse);
            authWindow.close();
          }
        }
      } catch (error) {
        console.error('Error parsing redirect url: ', error);
      }
    }
  });

  authWindow.on('closed', () => {
    // handle case where user closes without authorizing
    // wip
    console.error('fuck i didnt handle this case')
  })

}























