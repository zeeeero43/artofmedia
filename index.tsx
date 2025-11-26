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

// Check if page was pre-rendered (has child nodes with actual content)
const hasPrerenderedContent = rootElement.hasChildNodes() &&
  rootElement.innerHTML.length > 100;

if (hasPrerenderedContent) {
  // Hydrate pre-rendered content with error recovery
  hydrateRoot(rootElement, app, {
    onRecoverableError: (error) => {
      // Suppress hydration warnings in production
      console.warn('Hydration error:', error);
    }
  });
} else {
  // Normal client-side render
  createRoot(rootElement).render(app);
}