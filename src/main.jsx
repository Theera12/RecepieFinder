import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';
import { RecipeProvider } from './contexts/RecipeContext';

createRoot(document.getElementById('root')).render(
  <RecipeProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </RecipeProvider>
);
