import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './config';
import { App } from './App';
import { initializeIcons } from '@fluentui/react';

initializeIcons();

ReactDOM.createRoot(document.getElementById('react-root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
