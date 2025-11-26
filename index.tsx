import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './src/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Check if page was pre-rendered (has child nodes)
if (rootElement.hasChildNodes()) {
  // Hydrate pre-rendered content
  hydrateRoot(rootElement, app);
} else {
  // Normal client-side render
  createRoot(rootElement).render(app);
}