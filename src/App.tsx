import React from 'react'
import { createRoot } from 'react-dom/client';

import './index.css';
import { ThemeProvider } from './ui/components/theme-provider';
import Header from './ui/components/header';
import TwitchConnect from './ui/blocks/twitch-connect';

export default function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <div className="flex items-center justify-center">
        <TwitchConnect />
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


