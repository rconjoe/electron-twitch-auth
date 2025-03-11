import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';

import './index.css';
import { ThemeProvider } from './ui/components/theme-provider';
import Header from './ui/components/header';
import TwitchConnect from './ui/blocks/twitch-connect';

export default function App() {
  const [twitchToken, setTwitchToken] = useState<string | null>(null);

  const handleAuthSuccess = (token: string) => {
    setTwitchToken(token);
    console.log('Authenticated with Twitch!!!!!!!!!!');
    console.log(token)
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <div className="flex items-center justify-center">
        <TwitchConnect onAuthSuccess={handleAuthSuccess} />

        {twitchToken && (
          <div>
            <h2>it worked you wizard</h2>
            <p>use token to tall twitch api's</p>
            <p>{twitchToken}</p>
          </div>
        )}
      </div>
    </ThemeProvider>
  )

}

// eslint-disable-next-line
const root = createRoot(document.getElementById('app')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

