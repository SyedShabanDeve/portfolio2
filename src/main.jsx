import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PROFILE } from './data/site'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// A note for whoever opens the console.
console.log(
  `%cHi, I'm ${PROFILE.firstName} 👋%c\nThis site is hand-built with React 19 and Vite — no UI libraries.\nPress Ctrl/⌘ + K to jump anywhere, or write to ${PROFILE.email}.`,
  'font: 700 15px system-ui, sans-serif; color: #ff4d5e',
  'font: 12px ui-monospace, monospace',
)
