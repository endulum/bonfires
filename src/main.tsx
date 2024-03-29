import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Modal from 'react-modal'
import App from './App.tsx'

const root = document.getElementById('root')

if (root !== null) {
  Modal.setAppElement('#root')
  ReactDOM.createRoot(root).render(
    // <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
    // </React.StrictMode>
  )
}
