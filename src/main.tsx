import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './config';
import { detectDOM } from './untils/detect-dom';
import { RadarChart } from './entries/RadarChart';
import { COUNTRIES } from './constants';
import { giiData } from './data/gii';

const entries: Array<{ id: string; data: number[] }> = [
  {
    id: COUNTRIES.CHILE.key,
    data: giiData[COUNTRIES.CHILE.key],
  },
  {
    id: COUNTRIES.TANZANIA.key,
    data: giiData[COUNTRIES.TANZANIA.key],
  },
  {
    id: COUNTRIES.FINLAND.key,
    data: giiData[COUNTRIES.FINLAND.key],
  },
  {
    id: COUNTRIES.AUSTRALIA.key,
    data: giiData[COUNTRIES.AUSTRALIA.key],
  },
  {
    id: COUNTRIES.INDIA.key,
    data: giiData[COUNTRIES.INDIA.key],
  },
  {
    id: COUNTRIES.US.key,
    data: giiData[COUNTRIES.US.key],
  },
  {
    id: COUNTRIES.CN.key,
    data: giiData[COUNTRIES.CN.key],
  },
];

entries.forEach(({ id, data }) => {
  detectDOM(`#${id}`).then(() => {
    ReactDOM.createRoot(document.getElementById(id)).render(
      <React.StrictMode>
        <RadarChart
          id={id}
          data={data}
        />
      </React.StrictMode>
    );
  });
});
