import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './config';
import { detectDOM } from './untils/detect-dom';
import { Chile } from './entries/Chile';
import { COUNTRIES } from './constants';
import { Tanzania } from './entries/Tanzania';
import { Finland } from './entries/finland';
import { Australia } from './entries/Australia';
import { India } from './entries/india';
import { US } from './entries/US';
import { China } from './entries/China';

const entries: Array<{ id: string; entryJSX: React.ReactNode }> = [
  {
    id: COUNTRIES.CHILE.key,
    entryJSX: <Chile />,
  },
  {
    id: COUNTRIES.TANZANIA.key,
    entryJSX: <Tanzania />,
  },
  {
    id: COUNTRIES.FINLAND.key,
    entryJSX: <Finland />,
  },
  {
    id: COUNTRIES.AUSTRALIA.key,
    entryJSX: <Australia />,
  },
  {
    id: COUNTRIES.INDIA.key,
    entryJSX: <India />,
  },
  {
    id: COUNTRIES.US.key,
    entryJSX: <US />,
  },
  {
    id: COUNTRIES.CN.key,
    entryJSX: <China />,
  },
];

entries.forEach(({ id, entryJSX }) => {
  detectDOM(`#${id}`).then(() => {
    ReactDOM.createRoot(document.getElementById(id)).render(
      <React.StrictMode>{entryJSX}</React.StrictMode>
    );
  });
});
