import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { PreloaderProvider } from './context/PreloaderContext'
import { LanguageProvider } from './context/LanguageContext'
import './styles/globals.css'
import './styles/animations.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider><PreloaderProvider><App /></PreloaderProvider></LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
