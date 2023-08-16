import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { StoreProvider } from './Store'
import { DarkModeProvider } from './context/darkModeContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
        <ToastContainer />
      </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>
);