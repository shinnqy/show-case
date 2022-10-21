import { COUNTRIES } from '../constants';

export const indicators = [
  { name: 'Institutions', max: 100 },
  { name: 'Creative outputs', max: 100 },
  { name: 'Knowledge and\ntechnology outputs', max: 100 },
  { name: 'Business sophistication', max: 100 },
  { name: 'Market sophistication', max: 100 },
  { name: 'Infrastructure', max: 100 },
  { name: 'Human capital \nand research', max: 100 },
];

export const giiData = {
  [COUNTRIES.CHILE.key]: [66.5, 23.6, 25.1, 29.9, 37.7, 50.3, 34],
  [COUNTRIES.TANZANIA.key]: [48.4, 20.4, 25.3, 17.9, 23.9, 37.2, 37.4],
  [COUNTRIES.FINLAND.key]: [82.5, 39, 59.6, 61.6, 51.7, 65.9, 60.6],
  [COUNTRIES.AUSTRALIA.key]: [77.2, 37.8, 32.2, 48.6, 50.1, 58.8, 61.7],
  [COUNTRIES.INDIA.key]: [60.1, 24.3, 33.8, 30.9, 50.4, 40.7, 38.3],
  [COUNTRIES.US.key]: [80.9, 48.4, 60.8, 64.5, 80.8, 58.7, 59.9],
  [COUNTRIES.CN.key]: [64.8, 49.3, 56.8, 55.9, 56, 57.5, 53.1],
};
