import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';
import { RecepieProvider } from './contexts/RecepieContext';

createRoot(document.getElementById('root')).render(
  <RecepieProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </RecepieProvider>
);
