export enum COUNTRY_KEY {
  Chile = 'Chile',
  TANZANIA = 'TANZANIA',
  Finland = 'Finland',
  Australia = 'Australia',
  India = 'India',
  US = 'US',
  CN = 'CN',
}

export const COUNTRIES = {
  [COUNTRY_KEY.Chile]: {
    label: '智利',
    key: COUNTRY_KEY.Chile,
  },
  [COUNTRY_KEY.TANZANIA]: {
    label: '突尼斯',
    key: COUNTRY_KEY.TANZANIA,
  },
  [COUNTRY_KEY.Finland]: {
    label: '芬兰',
    key: COUNTRY_KEY.Finland,
  },
  [COUNTRY_KEY.Australia]: {
    label: '澳大利亚',
    key: COUNTRY_KEY.Australia,
  },
  [COUNTRY_KEY.India]: {
    label: '印度',
    key: COUNTRY_KEY.India,
  },
  [COUNTRY_KEY.US]: {
    label: '美国',
    key: COUNTRY_KEY.US,
  },
  [COUNTRY_KEY.CN]: {
    label: '中国',
    key: COUNTRY_KEY.CN,
  },
};

// https://studio.mapbox.com/tilesets/mapbox.country-boundaries-v1/#3.19/-31.28/-66.01
export const ISO_COUNTRY_MAP: Record<COUNTRY_KEY, Array<string>> = {
  [COUNTRY_KEY.Chile]: ['CL'],
  [COUNTRY_KEY.TANZANIA]: ['TN'],
  [COUNTRY_KEY.Finland]: ['FI'],
  [COUNTRY_KEY.Australia]: ['AU'],
  [COUNTRY_KEY.India]: ['IN'],
  [COUNTRY_KEY.US]: ['US'],
  [COUNTRY_KEY.CN]: ['CN', 'TW', 'D0CNTWVN1', 'D0CNPHTWVN1'],
};

export const COUNTRY_LOCATION: Record<
  COUNTRY_KEY,
  {
    center: [number, number];
    zoom: number;
    pitch: number;
    bearing: number;
  }
> = {
  [COUNTRY_KEY.Chile]: {
    center: [-69.86224, -26.57585],
    zoom: 4,
    pitch: 45.0,
    bearing: 0.0,
  },
  [COUNTRY_KEY.TANZANIA]: {
    center: [9.5795, 34.19061],
    zoom: 5.06,
    pitch: 45.0,
    bearing: 0.0,
    // flyTo additional controls-
    // These options control the flight curve, making it move
    // slowly and zoom out almost completely before starting
    // to pan.
    //speed: 2, // make the flying slow
    //curve: 1, // change the speed at which it zooms out
  },
  [COUNTRY_KEY.Finland]: {
    center: [26.39834, 62.85022],
    zoom: 4.5,
    pitch: 45.0,
    bearing: 0.0,
  },
  [COUNTRY_KEY.Australia]: {
    center: [134.67169, -25.4369],
    zoom: 4.0,
    pitch: 45.0,
    bearing: 0.0,
    // flyTo additional controls-
    // These options control the flight curve, making it move
    // slowly and zoom out almost completely before starting
    // to pan.
    //speed: 2, // make the flying slow
    //curve: 1, // change the speed at which it zooms out
  },
  [COUNTRY_KEY.India]: {
    center: [78.69278, 22.35687],
    zoom: 4.4,
    pitch: 45.0,
    bearing: 0.0,
  },
  [COUNTRY_KEY.US]: {
    center: [-97.27997, 39.66817],
    zoom: 4.0,
    pitch: 45.0,
    bearing: 0.0,
    // flyTo additional controls-
    // These options control the flight curve, making it move
    // slowly and zoom out almost completely before starting
    // to pan.
    //speed: 2, // make the flying slow
    //curve: 1, // change the speed at which it zooms out
  },
  [COUNTRY_KEY.CN]: {
    center: [108.65885, 34.71375],
    zoom: 3.8,
    pitch: 45.0,
    bearing: 0.0,
  },
};

export interface IZoomToOption {
  zoomTo: number;
  offset: [number, number];
}
export const COUNTRY_ZOOM_IN: Record<COUNTRY_KEY, IZoomToOption> = {
  [COUNTRY_KEY.Chile]: {
    zoomTo: 4.6,
    offset: [-700, 300],
  },
  [COUNTRY_KEY.TANZANIA]: {
    zoomTo: 6,
    offset: [400, 0],
  },
  [COUNTRY_KEY.Finland]: {
    zoomTo: 4.8,
    offset: [-1200, -900],
  },
  [COUNTRY_KEY.Australia]: {
    zoomTo: 4.3,
    offset: [900, -100],
  },
  [COUNTRY_KEY.India]: {
    zoomTo: 4.6,
    offset: [-1600, 0],
  },
  [COUNTRY_KEY.US]: {
    zoomTo: 4.4,
    offset: [800, 0],
  },
  [COUNTRY_KEY.CN]: {
    zoomTo: 4,
    offset: [-1800, 0],
  },
};
