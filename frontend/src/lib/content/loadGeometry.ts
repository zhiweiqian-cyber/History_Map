import provinceGeometryJson from "../../../../content/geo/provinces.geojson?raw";

export interface ProvinceFeature {
  id: string;
  type: "Feature";
  properties: {
    kind: "province";
    map_shape_ref: string;
    name: string;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

export interface ProvinceGeometryCollection {
  type: "FeatureCollection";
  features: ProvinceFeature[];
}

export function loadProvinceGeometry(): ProvinceGeometryCollection {
  return JSON.parse(provinceGeometryJson) as ProvinceGeometryCollection;
}
