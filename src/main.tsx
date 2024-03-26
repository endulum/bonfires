import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Modal from 'react-modal'
import App from './App.tsx'

import './styles/reset.css'
import './styles/colors.css'
import './styles/font-handling/fonts.css'
import './styles/main.css'

const root = document.getElementById('root')

if (root !== null) {
  Modal.setAppElement('#root')
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter><App /></BrowserRouter>
    </React.StrictMode>
  )
}
