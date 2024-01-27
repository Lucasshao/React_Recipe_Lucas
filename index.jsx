import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'

const rootDom = document.getElementById('root')
const rootReactDom = ReactDOM.createRoot(rootDom)

rootReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)