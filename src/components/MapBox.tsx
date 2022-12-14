import React, { useEffect, useRef, useCallback } from 'react';
import { MapBoxStoryTelling } from './MapBox.util';

export const MapBox = React.memo(function MapBox() {
  useEffect(() => {
    MapBoxStoryTelling.mapInstance();
  }, []);

  return (
    <>
      <div id="map"></div>
      <div id="mapInset"></div>
    </>
  );
});
