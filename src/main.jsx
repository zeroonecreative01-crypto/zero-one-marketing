import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './award-site.css'
import './award-polish.css'
import './work-upgrade.css'
import './case-study.css'
import './case-study.js'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
