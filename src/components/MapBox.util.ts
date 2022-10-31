import { LngLatLike } from 'mapbox-gl';
import { config } from '../config';

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
  private static map: mapboxgl.Map;
  private static insetMap: mapboxgl.Map;
  private static marker: mapboxgl.Marker;
  private static scroller: any;
  private static initLoad: boolean = true;

  public static init() {
    // @ts-ignore
    mapboxgl.accessToken = config.accessToken;

    // @ts-ignore
    const map = (MapBoxStoryTelling.map = new mapboxgl.Map({
      container: 'map',
      style: config.style,
      center: config.chapters[0].location.center as LngLatLike,
      zoom: config.chapters[0].location.zoom,
      bearing: config.chapters[0].location.bearing,
      pitch: config.chapters[0].location.pitch,
      interactive: false,
      transformRequest: transformRequest,
      projection: config.projection,
    }));

    // Create a inset map if enabled in config.js
    if (config.inset) {
      // @ts-ignore
      MapBoxStoryTelling.insetMap = new mapboxgl.Map({
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
      const marker = (MapBoxStoryTelling.marker = new mapboxgl.Marker({
        color: config.markerColor,
      }));
      marker
        .setLngLat(config.chapters[0].location.center as LngLatLike)
        .addTo(map);
    }

    const scroller = (MapBoxStoryTelling.scroller = scrollama());

    map.on('style.load', () => {
      map.setFog({ 'horizon-blend': 0.1 });
    });

    map.on('load', function () {
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
        map.on('move', MapBoxStoryTelling.getInsetBounds);
      }

      MapBoxStoryTelling.initScroller();
    });

    // setup resize event
    window.addEventListener('resize', scroller.resize);
  }

  private static initScroller() {
    // instantiate the scrollama
    const map = MapBoxStoryTelling.map;
    const insetMap = MapBoxStoryTelling.insetMap;

    MapBoxStoryTelling.scroller
      .setup({
        step: '.step',
        offset: 0.5,
        progress: true,
      })
      .onStepEnter(async (response) => {
        var chapter = config.chapters.find(
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
          MapBoxStoryTelling.marker.setLngLat(
            chapter.location.center as LngLatLike
          );
        }
        if (chapter.onChapterEnter.length > 0) {
          chapter.onChapterEnter.forEach(MapBoxStoryTelling.setLayerOpacity);
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
          chapter.onChapterExit.forEach(MapBoxStoryTelling.setLayerOpacity);
        }
      });
  }

  private static getInsetBounds() {
    let bounds = MapBoxStoryTelling.map.getBounds();

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
                [bounds._sw.lng, bounds._sw.lat],
                [bounds._ne.lng, bounds._sw.lat],
                [bounds._ne.lng, bounds._ne.lat],
                [bounds._sw.lng, bounds._ne.lat],
                [bounds._sw.lng, bounds._sw.lat],
              ],
            ],
          },
        },
      ],
    };

    if (MapBoxStoryTelling.initLoad) {
      MapBoxStoryTelling.addInsetLayer(boundsJson);
      MapBoxStoryTelling.initLoad = false;
    } else {
      MapBoxStoryTelling.updateInsetLayer(boundsJson);
    }
  }

  private static addInsetLayer(bounds: any) {
    const insetMap = MapBoxStoryTelling.insetMap;

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

  private static updateInsetLayer(bounds) {
    MapBoxStoryTelling.insetMap.getSource('boundsSource').setData(bounds);
  }

  private static setLayerOpacity(layer: any) {
    const map = MapBoxStoryTelling.map;

    const paintProps = MapBoxStoryTelling.getLayerPaintType(layer.layer);
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

  private static getLayerPaintType(layer: any) {
    const map = MapBoxStoryTelling.map;

    const layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
  }
}
