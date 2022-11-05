import { LngLatLike } from 'mapbox-gl';
import { config } from '../config';
import { IZoomToOption } from '../constants';

const layerTypes = {
  fill: ['fill-opacity'],
  line: ['line-opacity'],
  circle: ['circle-opacity', 'circle-stroke-opacity'],
  symbol: ['icon-opacity', 'text-opacity'],
  raster: ['raster-opacity'],
  'fill-extrusion': ['fill-extrusion-opacity'],
  heatmap: ['heatmap-opacity'],
};

const transformRequest = (url: string) => {
  const hasQuery = url.indexOf('?') !== -1;
  const suffix = hasQuery
    ? '&pluginName=scrollytellingV2'
    : '?pluginName=scrollytellingV2';
  return {
    url: url + suffix,
  };
};

export class MapBoxStoryTelling {
  private static _instance: MapBoxStoryTelling;
  private map: mapboxgl.Map;
  private insetMap: mapboxgl.Map;
  private marker: mapboxgl.Marker;
  private scroller: any;
  private initLoad: boolean = true;
  private static cbLayer: string = 'country-boundaries';
  private static wbLayer: string = 'water-boundaries';

  public static instance(): MapBoxStoryTelling {
    if (!MapBoxStoryTelling._instance) {
      MapBoxStoryTelling._instance = new MapBoxStoryTelling();
    }
    return MapBoxStoryTelling._instance;
  }

  public static mapInstance(): mapboxgl.Map {
    return MapBoxStoryTelling.instance().map;
  }

  constructor() {
    this.init();
  }

  public hightlightCountry(countryId: string, zoomToOption: IZoomToOption) {
    console.log({ countryId, zoomToOption });
    // this.setPitch(45, 0);
    this.doHighlightLayer(countryId);
    this.map.setPitch(0);
    this.map.zoomTo(zoomToOption.zoomTo, {
      duration: 1000,
      offset: zoomToOption.offset,
    });
  }

  private init() {
    // @ts-ignore
    mapboxgl.accessToken = config.accessToken;

    // @ts-ignore
    const map = (this.map = new mapboxgl.Map({
      container: 'map',
      style: config.style,
      center: config.chapters[0].location.center as LngLatLike,
      zoom: config.chapters[0].location.zoom,
      bearing: config.chapters[0].location.bearing,
      pitch: config.chapters[0].location.pitch,
      interactive: false,
      transformRequest: transformRequest,
      projection: config.projection as any, // TODO:
    }));

    // Create a inset map if enabled in config.js
    if (config.inset) {
      // @ts-ignore
      this.insetMap = new mapboxgl.Map({
        container: 'mapInset', // container id
        style: 'mapbox://styles/mapbox/dark-v10', //hosted style id
        center: config.chapters[0].location.center as LngLatLike,
        // Hardcode above center value if you want insetMap to be static.
        zoom: 3, // starting zoom
        hash: false,
        interactive: false,
        attributionControl: false,
        //Future: Once official mapbox-gl-js has globe view enabled,
        //insetmap can be a globe with the following parameter.
        //projection: 'globe'
      });
    }

    if (config.showMarkers) {
      // @ts-ignore
      const marker = (this.marker = new mapboxgl.Marker({
        color: config.markerColor,
      }));
      marker
        .setLngLat(config.chapters[0].location.center as LngLatLike)
        .addTo(map);
    }

    // @ts-ignore TOOD:
    const scroller = (this.scroller = scrollama());

    map.on('style.load', () => {
      map.setFog({ 'horizon-blend': 0.1 });
    });

    map.on('load', () => {
      this.addHighlightLayer(map);
      this.resetHighlightLayerStatus();

      if (config.use3dTerrain) {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15,
          },
        });
      }

      if (config.inset) {
        map.on('move', this.getInsetBounds.bind(this));
      }

      this.initScroller();
    });

    // setup resize event
    window.addEventListener('resize', scroller.resize);

    // for test;
    (window as any).test = function (callback) {
      callback(map);
    };
  }

  private addHighlightLayer(map: mapboxgl.Map) {
    map.addLayer(
      {
        id: MapBoxStoryTelling.cbLayer,
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1',
        },
        'source-layer': 'country_boundaries',
        type: 'fill',
        paint: {
          'fill-color': '#000000',
          'fill-opacity': 0.5,
        },
      }
      // 'other-countries'
    );
    map.addLayer(
      {
        id: MapBoxStoryTelling.wbLayer,
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        },
        'source-layer': 'water',
        type: 'fill',
        paint: {
          'fill-color': '#000000',
          'fill-opacity': 0.5,
        },
      }
      // 'other-countries'
    );

    // map.addLayer(
    //   {
    //     id: 'other-countries',
    //     source: {
    //       type: 'vector',
    //       url: 'mapbox://mapbox.mapbox-streets-v8',
    //       // url: 'mapbox://mapbox.satellite',
    //     },
    //     'source-layer': 'water',
    //     type: 'fill',
    //     paint: {
    //       'fill-opacity': 0.3,
    //     },
    //   }
    //   // 'country-boundaries'
    // );

    // map.addLayer(
    //   {
    //     id: 'o-water',
    //     source: {
    //       type: 'vector',
    //       url: 'mapbox://mapbox.mapbox-streets-v8',
    //     },
    //     'source-layer': 'water',
    //     type: 'fill',
    //     paint: {
    //       'fill-color': '#ffffff',
    //     },
    //   },
    //   'other-countries'
    // );
    // map.addLayer(
    //   {
    //     id: 'country-boundaries-line',
    //     source: {
    //       type: 'vector',
    //       url: 'mapbox://mapbox.country-boundaries-v1',
    //     },
    //     'source-layer': 'country_boundaries',
    //     type: 'line',
    //     paint: {
    //       'line-width': 3,
    //       'line-color': '#cccccc',
    //     },
    //   },
    //   'water'
    // );
  }

  private setPitch(start: number, end: number, step: number = 3) {
    let degree = start;
    let reqId = null;
    const aniPitch = () => {
      if (degree > 0) {
        this.map.setPitch(degree);
        degree -= step;
        if (degree < end) degree = end;
        reqId = requestAnimationFrame(aniPitch);
      } else if (degree === 0) {
        this.map.setPitch(degree);
        cancelAnimationFrame(reqId);
      }
    };
    reqId = requestAnimationFrame(aniPitch);
  }

  private resetHighlightLayerStatus() {
    this.map.setFilter(MapBoxStoryTelling.cbLayer, ['in', 'iso_3166_1']);
    this.map.setFilter(MapBoxStoryTelling.wbLayer, ['in', '']);
  }

  private doHighlightLayer(ISOCountryCode: string) {
    this.map.setFilter(MapBoxStoryTelling.cbLayer, [
      '!',
      ['in', ['get', 'iso_3166_1'], ['literal', ISOCountryCode]],
    ]);
    this.map.setFilter(MapBoxStoryTelling.wbLayer, [
      '!',
      ['in', 'iso_3166_1', ''],
    ]);
  }

  private removeLayer() {
    const map = this.map;

    if (map.getLayer(MapBoxStoryTelling.cbLayer)) {
      map.removeLayer(MapBoxStoryTelling.cbLayer);
      map.removeSource(MapBoxStoryTelling.cbLayer);

      map.removeLayer(MapBoxStoryTelling.wbLayer);
      map.removeSource(MapBoxStoryTelling.wbLayer);
    }
  }

  private initScroller() {
    // instantiate the scrollama
    const map = this.map;
    const insetMap = this.insetMap;

    this.scroller
      .setup({
        step: '.step',
        offset: 0.5,
        progress: true,
      })
      .onStepEnter(async (response) => {
        const chapter = config.chapters.find(
          (chap) => chap.id === response.element.id
        );
        response.element.classList.add('active');
        map[chapter.mapAnimation || 'flyTo'](chapter.location);
        // Incase you do not want to have a dynamic inset map,
        // rather want to keep it a static view but still change the
        // bbox as main map move: comment out the below if section.
        if (config.inset) {
          if (chapter.location.zoom < 5) {
            insetMap.flyTo({
              center: chapter.location.center as LngLatLike,
              zoom: 0,
            });
          } else {
            insetMap.flyTo({
              center: chapter.location.center as LngLatLike,
              zoom: 3,
            });
          }
        }
        if (config.showMarkers) {
          this.marker.setLngLat(chapter.location.center as LngLatLike);
        }
        if (chapter.onChapterEnter.length > 0) {
          chapter.onChapterEnter.forEach(this.setLayerOpacity);
        }
        if (chapter.callback) {
          window[chapter.callback]();
        }
        if (chapter.rotateAnimation) {
          map.once('moveend', () => {
            const rotateNumber = map.getBearing();
            map.rotateTo(rotateNumber + 180, {
              duration: 30000,
              easing: function (t) {
                return t;
              },
            });
          });
        }
      })
      .onStepExit((response) => {
        var chapter = config.chapters.find(
          (chap) => chap.id === response.element.id
        );
        response.element.classList.remove('active');
        if (chapter.onChapterExit.length > 0) {
          chapter.onChapterExit.forEach(this.setLayerOpacity);
        }
        // this.removeLayer();
        this.resetHighlightLayerStatus();
      });
  }

  private getInsetBounds() {
    let bounds = this.map.getBounds();

    let boundsJson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                // @ts-ignore // TODO:
                [bounds._sw.lng, bounds._sw.lat],
                // @ts-ignore // TODO:
                [bounds._ne.lng, bounds._sw.lat],
                // @ts-ignore // TODO:
                [bounds._ne.lng, bounds._ne.lat],
                // @ts-ignore // TODO:
                [bounds._sw.lng, bounds._ne.lat],
                // @ts-ignore // TODO:
                [bounds._sw.lng, bounds._sw.lat],
              ],
            ],
          },
        },
      ],
    };

    if (this.initLoad) {
      this.addInsetLayer(boundsJson);
      this.initLoad = false;
    } else {
      this.updateInsetLayer(boundsJson);
    }
  }

  private addInsetLayer(bounds: any) {
    const insetMap = this.insetMap;

    insetMap.addSource('boundsSource', {
      type: 'geojson',
      data: bounds,
    });

    insetMap.addLayer({
      id: 'boundsLayer',
      type: 'fill',
      source: 'boundsSource', // reference the data source
      layout: {},
      paint: {
        'fill-color': '#fff', // blue color fill
        'fill-opacity': 0.2,
      },
    });
    // // Add a black outline around the polygon.
    insetMap.addLayer({
      id: 'outlineLayer',
      type: 'line',
      source: 'boundsSource',
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 1,
      },
    });
  }

  private updateInsetLayer(bounds) {
    // @ts-ignore // TODO:
    this.insetMap.getSource('boundsSource').setData(bounds);
  }

  private setLayerOpacity(layer: any) {
    const map = this.map;

    const paintProps = this.getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
      let options = {};
      if (layer.duration) {
        const transitionProp = prop + '-transition';
        options = { duration: layer.duration };
        map.setPaintProperty(layer.layer, transitionProp, options);
      }
      map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
  }

  private getLayerPaintType(layer: any) {
    const map = this.map;

    const layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
  }
}
