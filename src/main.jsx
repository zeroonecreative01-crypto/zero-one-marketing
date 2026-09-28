import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './site.css'
import './enhancements.css'
import './dynamic-island.css'
import './award-pass.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
