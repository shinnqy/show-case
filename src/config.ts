import { COUNTRIES, COUNTRY_KEY, COUNTRY_LOCATION } from './constants';

export const satelliteStyle = 'mapbox://styles/mapbox/satellite-streets-v11';
const streetStyle = 'mapbox://styles/mapbox/streets-v11';
const lightStyle = 'mapbox://styles/mapbox/light-v10';
const myStyle = 'mapbox://styles/shinnqy/cla3q2izl00nc14p07l884hxr';

export const config: IConfig = {
  style: lightStyle,
  accessToken:
    'pk.eyJ1Ijoic2hpbm5xeSIsImEiOiJjbDlldGR3ZWMwMGQwM3VzMmN4Mm0yZjFnIn0.xlIOvMBGrnPE6zc_9IUWvA',
  showMarkers: true,
  markerColor: '#3FB1CE',
  projection: 'globe',
  //Read more about available projections here
  //https://docs.mapbox.com/mapbox-gl-js/example/projections/
  inset: true,
  theme: 'dark',
  use3dTerrain: false, //set true for enabling 3D maps.
  title: 'weanalyze全球创新地图',
  subtitle:
    '全球创新地图是动态捕捉全球创新发展趋势的三维实时观察基站，并实时更新和帮助用户跟踪全球的创新进展：包括全球独角兽估值动态、最新的领域论文、最新的科技类投资、最新实验室的动态等',
  // byline: 'By WeAnalyze',
  // footer: 'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
  footer: '',
  chapters: [
    {
      id: COUNTRY_KEY.Chile,
      alignment: 'left',
      hidden: false,
      title: COUNTRIES[COUNTRY_KEY.Chile].label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRY_KEY.Chile}"></div>`,
      location: COUNTRY_LOCATION[COUNTRY_KEY.Chile],
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        // {
        //     layer: 'layer-name',
        //     opacity: 1,
        //     duration: 5000
        // }
      ],
      onChapterExit: [
        // {
        //     layer: 'layer-name',
        //     opacity: 0
        // }
      ],
    },
    {
      id: COUNTRY_KEY.TANZANIA,
      alignment: 'right',
      hidden: false,
      title: COUNTRIES[COUNTRY_KEY.TANZANIA].label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRY_KEY.TANZANIA}"></div>`,
      location: COUNTRY_LOCATION[COUNTRY_KEY.TANZANIA],
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: COUNTRY_KEY.Finland,
      alignment: 'left',
      hidden: false,
      title: COUNTRIES[COUNTRY_KEY.Finland].label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRY_KEY.Finland}"></div>`,
      location: COUNTRY_LOCATION[COUNTRY_KEY.Finland],
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: COUNTRY_KEY.Australia,
      alignment: 'right',
      hidden: false,
      title: COUNTRIES[COUNTRY_KEY.Australia].label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRY_KEY.Australia}"></div>`,
      location: COUNTRY_LOCATION[COUNTRY_KEY.Australia],
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: COUNTRY_KEY.India,
      alignment: 'left',
      hidden: false,
      title: COUNTRIES[COUNTRY_KEY.India].label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRY_KEY.India}"></div>`,
      location: COUNTRY_LOCATION[COUNTRY_KEY.India],
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: COUNTRY_KEY.US,
      alignment: 'right',
      hidden: false,
      title: COUNTRIES[COUNTRY_KEY.US].label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRY_KEY.US}"></div>`,
      location: COUNTRY_LOCATION[COUNTRY_KEY.US],
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: COUNTRY_KEY.CN,
      alignment: 'left',
      hidden: false,
      title: COUNTRIES[COUNTRY_KEY.CN].label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRY_KEY.CN}"></div>`,
      location: COUNTRY_LOCATION[COUNTRY_KEY.CN],
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    // {
    //   id: 'last-chapter',
    //   alignment: 'fully',
    //   hidden: false,
    //   title: 'Third Title',
    //   // image: './path/to/image/source.png',
    //   description: 'Copy these sections to add to your story.',
    //   location: {
    //     center: [-58.54195, -34.716],
    //     zoom: 4,
    //     pitch: 0,
    //     bearing: 0,
    //   },
    //   mapAnimation: 'flyTo',
    //   rotateAnimation: false,
    //   callback: '',
    //   onChapterEnter: [],
    //   onChapterExit: [],
    // },
  ],
};

export const alignments = {
  left: 'lefty',
  center: 'centered',
  right: 'righty',
  full: 'fully',
};

export interface IConfig {
  style: string;
  accessToken: string;
  showMarkers: boolean;
  markerColor: string;
  projection: string;
  inset: boolean;
  theme: 'dark';
  use3dTerrain: boolean;
  title: string;
  subtitle?: string;
  byline?: string;
  footer?: string;
  chapters: IChapter[];
}

export interface IChapter {
  id: COUNTRY_KEY;
  alignment: 'left' | 'right';
  hidden: boolean;
  title: string;
  description: string;
  location: ILocation;
  mapAnimation: 'flyTo';
  rotateAnimation: boolean;
  callback: string;
  onChapterEnter?: any[];
  onChapterExit?: any[];
}

interface ILocation {
  center: [number, number];
  zoom: number;
  pitch: number;
  bearing: number;
}

window.config = config;
