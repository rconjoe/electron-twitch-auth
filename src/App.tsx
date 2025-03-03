import React from 'react'
import { createRoot } from 'react-dom/client';

import './index.css';

export default function App() {

  return <><h1>dickhead</h1>
    <p>This app is using node v{window.versions.node()}, electron v{window.versions.electron()}, chrome v{window.versions.chrome()}, and react v{React.version}</p>
  </>
}

const root = createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
