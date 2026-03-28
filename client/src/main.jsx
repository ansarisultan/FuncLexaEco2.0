import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppModeProvider } from './context/AppModeContext';
import { AuthProvider } from './context/AuthContext';
import { LocalModeProvider } from './context/LocalModeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppModeProvider>
        <AuthProvider>
          <LocalModeProvider>
            <App />
          </LocalModeProvider>
        </AuthProvider>
      </AppModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
