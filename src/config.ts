import { COUNTRIES } from './constants';

export const config = {
  style: 'mapbox://styles/mapbox/streets-v11',
  accessToken:
    'pk.eyJ1Ijoic2hpbm5xeSIsImEiOiJjbDlldGR3ZWMwMGQwM3VzMmN4Mm0yZjFnIn0.xlIOvMBGrnPE6zc_9IUWvA',
  showMarkers: true,
  markerColor: '#3FB1CE',
  //projection: 'equirectangular',
  //Read more about available projections here
  //https://docs.mapbox.com/mapbox-gl-js/example/projections/
  inset: true,
  theme: 'dark',
  use3dTerrain: false, //set true for enabling 3D maps.
  title: 'The Title Text of this Story',
  subtitle: 'A descriptive and interesting subtitle to draw in the reader',
  byline: 'By a Digital Storyteller',
  footer:
    'Source: source citations, etc. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
  chapters: [
    {
      id: 'slug-style-id',
      alignment: 'left',
      hidden: false,
      title: COUNTRIES.CHILE.label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRIES.CHILE.key}"></div>`,
      location: {
        center: [-69.86224, -26.57585],
        zoom: 5.02,
        pitch: 45.0,
        bearing: 0.0,
      },
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
      id: 'second-identifier',
      alignment: 'right',
      hidden: false,
      title: COUNTRIES.TANZANIA.label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRIES.TANZANIA.key}"></div>`,
      location: {
        center: [35.03632, -6.14125],
        zoom: 5.75,
        pitch: 45.0,
        bearing: 0.0,
        // flyTo additional controls-
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        //speed: 2, // make the flying slow
        //curve: 1, // change the speed at which it zooms out
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'third-identifier',
      alignment: 'left',
      hidden: false,
      title: COUNTRIES.FINLAND.label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRIES.FINLAND.key}"></div>`,
      location: {
        center: [26.39834, 62.85022],
        zoom: 5.4,
        pitch: 45.0,
        bearing: 0.0,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'fourth-identifier',
      alignment: 'right',
      hidden: false,
      title: COUNTRIES.AUSTRALIA.label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRIES.AUSTRALIA.key}"></div>`,
      location: {
        center: [134.67169, -25.4369],
        zoom: 4.57,
        pitch: 45.0,
        bearing: 0.0,
        // flyTo additional controls-
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        //speed: 2, // make the flying slow
        //curve: 1, // change the speed at which it zooms out
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'fifth-identifier',
      alignment: 'left',
      hidden: false,
      title: COUNTRIES.INDIA.label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRIES.INDIA.key}"></div>`,
      location: {
        center: [78.69278, 22.35687],
        zoom: 4.9,
        pitch: 45.0,
        bearing: 0.0,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'sixth-identifier',
      alignment: 'right',
      hidden: false,
      title: COUNTRIES.US.label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRIES.US.key}"></div>`,
      location: {
        center: [-97.27997, 39.66817],
        zoom: 4.41,
        pitch: 45.0,
        bearing: 0.0,
        // flyTo additional controls-
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        //speed: 2, // make the flying slow
        //curve: 1, // change the speed at which it zooms out
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: 'seventh-identifier',
      alignment: 'left',
      hidden: false,
      title: COUNTRIES.CN.label,
      // image: './path/to/image/source.png',
      description: `<div id="${COUNTRIES.CN.key}"></div>`,
      location: {
        center: [116.35209, 40.00668],
        zoom: 4.01,
        pitch: 45.0,
        bearing: 0.0,
      },
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

window.config = config;
