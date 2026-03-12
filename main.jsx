import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Vérifie que c'est bien './App.jsx'
import './index.css' // Supprime cette ligne si tu n'as pas de fichier index.css

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
