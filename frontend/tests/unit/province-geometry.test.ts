import { describe, expect, it } from "vitest";

import { loadProvinceGeometry } from "../../src/lib/content/loadGeometry";

const expectedProvinceIds = [
  "beijing",
  "tianjin",
  "hebei",
  "shanxi",
  "inner-mongolia",
  "liaoning",
  "jilin",
  "heilongjiang",
  "shanghai",
  "jiangsu",
  "zhejiang",
  "anhui",
  "fujian",
  "jiangxi",
  "shandong",
  "henan",
  "hubei",
  "hunan",
  "guangdong",
  "guangxi",
  "hainan",
  "chongqing",
  "sichuan",
  "guizhou",
  "yunnan",
  "xizang",
  "shaanxi",
  "gansu",
  "qinghai",
  "ningxia",
  "xinjiang",
  "taiwan",
  "hongkong",
  "macao",
];

describe("loadProvinceGeometry", () => {
  it("loads the full province-level geometry set with stable ids", () => {
    const geometry = loadProvinceGeometry();

    expect(geometry.type).toBe("FeatureCollection");
    expect(geometry.features).toHaveLength(expectedProvinceIds.length);
    expect(geometry.features.map((feature) => feature.id)).toEqual(
      expectedProvinceIds,
    );

    for (const feature of geometry.features) {
      expect(feature.type).toBe("Feature");
      expect(["Polygon", "MultiPolygon"]).toContain(feature.geometry.type);
      expect(feature.properties.kind).toBe("province");
      expect(feature.properties.map_shape_ref).toBe(feature.id);
      expect(feature.properties.name.length).toBeGreaterThan(0);
    }
  });
});
