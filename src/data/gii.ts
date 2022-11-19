import { COUNTRIES, COUNTRY_KEY } from '../constants';

export const indicators = [
  { name: 'Institutions', max: 100 },
  { name: 'Creative outputs', max: 100 },
  { name: 'Knowledge and\ntechnology outputs', max: 100 },
  { name: 'Business sophistication', max: 100 },
  { name: 'Market sophistication', max: 100 },
  { name: 'Infrastructure', max: 100 },
  { name: 'Human capital \nand research', max: 100 },
];

const InstitutionsTop10 = [
  COUNTRY_KEY.Australia,
  'Denmark',
  'Hong Kong',
  'Luxembourg',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Singapore',
  'Switzerland',
  'United Arab Emirates',
];
const creativeOutputsTop10 = [
  'France',
  'Germany',
  'Hong Kong',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Republic of Korea',
  'Switzerland',
  'Sweden',
  COUNTRY_KEY.US,
];
const KnowledgeTop10 = [
  COUNTRY_KEY.CN,
  COUNTRY_KEY.Finland,
  'Germany',
  'Israel',
  'Netherlands',
  'Republic of Korea',
  'Sweden',
  'Switzerland',
  'UK',
  COUNTRY_KEY.US,
];
const businessTop10 = [
  COUNTRY_KEY.Finland,
  'Israel',
  'Japan',
  'Luxembourg',
  'Netherlands',
  'Republic of Korea',
  'Singapore',
  'Sweden',
  'Switzerland',
  COUNTRY_KEY.US,
];
const marketTop10 = [
  'Canada',
  'Estonia',
  'France',
  'Hong Kong',
  'Israel',
  'Japan',
  'Singapore',
  'Switzerland',
  'UK',
  COUNTRY_KEY.US,
];
const infrastructureTop10 = [
  COUNTRY_KEY.Australia,
  'Denmark',
  COUNTRY_KEY.Finland,
  'Hong Kong',
  'Norway',
  'Sweden',
  'Switzerland',
  'United Arab Emirates',
  'UK',
];
const humanTop10 = [
  COUNTRY_KEY.Australia,
  'Denmark',
  COUNTRY_KEY.Finland,
  'Germany',
  'Republic of Korea',
  'Singapore',
  'Sweden',
  'Switzerland',
  'UK',
  COUNTRY_KEY.US,
];

export const giiData: {
  [key: string]: [number, number, number, number, number, number, number];
} = {
  [COUNTRY_KEY.Chile]: [66.5, 23.6, 25.1, 29.9, 37.7, 50.3, 34],
  [COUNTRY_KEY.TANZANIA]: [47.2, 5.7, 7.7, 16.8, 12.1, 31.1, 26.1],
  [COUNTRY_KEY.Finland]: [82.5, 39, 59.6, 61.6, 51.7, 65.9, 60.6],
  [COUNTRY_KEY.Australia]: [77.2, 37.8, 32.2, 48.6, 50.1, 58.8, 61.7],
  [COUNTRY_KEY.India]: [60.1, 24.3, 33.8, 30.9, 50.4, 40.7, 38.3],
  [COUNTRY_KEY.US]: [80.9, 48.4, 60.8, 64.5, 80.8, 58.7, 59.9],
  [COUNTRY_KEY.CN]: [64.8, 49.3, 56.8, 55.9, 56, 57.5, 53.1],
  Denmark: [82.8, 46.3, 51.9, 54.3, 53.1, 64.3, 59.4],
  Canada: [80.4, 38.7, 39.3, 52.3, 65, 57, 57.7],
  // Estonia: [],
  // France: [],
  // 'Hong Kong': [],
  // Germany: [],
  // Israel: [],
  // Luxembourg: [],
  // Malta: []
};
