import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { StoreProvider } from './Store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>
);