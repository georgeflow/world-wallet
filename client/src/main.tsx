import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming App.tsx
import './index.css';
import ContextProvider from './Context'; // Assuming Context.tsx

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
