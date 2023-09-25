import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { TodoContextProvider } from './context'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoContextProvider>
        <Router />
    </TodoContextProvider>
   
  </React.StrictMode>,
)
