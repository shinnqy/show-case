export type IMapBoxProjection = {
  name:
    | 'albers'
    | 'equalEarth'
    | 'equirectangular'
    | 'lambertConformalConic'
    | 'mercator'
    | 'naturalEarth'
    | 'winkelTripel'
    | 'globe';
  center?: [number, number];
  parallels?: [number, number];
};
