import type { ProvinceFeature } from "../../lib/content/loadGeometry";
import type { ProvinceRecord } from "../../lib/schema/content";

interface NationalMapProps {
  provinces: ProvinceRecord[];
  features: ProvinceFeature[];
  selectedProvinceId: string | null;
  onProvinceSelect: (provinceId: string, dynastySegmentId: string) => void;
}

function getFeatureTypeLabel(feature: ProvinceFeature) {
  return feature.geometry.type === "MultiPolygon"
    ? "archipelago shape loaded"
    : "province shape loaded";
}

export function NationalMap({
  provinces,
  features,
  selectedProvinceId,
  onProvinceSelect,
}: NationalMapProps) {
  const featureLookup = new Map(features.map((feature) => [feature.id, feature]));

  return (
    <section className="national-map" aria-labelledby="national-map-title">
      <div className="national-map__header">
        <h3 id="national-map-title">Province routes</h3>
        <p>{features.length} province-level regions are available in the national skeleton.</p>
      </div>

      <ul className="national-map__grid">
        {provinces.map((province) => {
          const feature = featureLookup.get(province.id);
          const isSelected = selectedProvinceId === province.id;

          return (
            <li key={province.id}>
              <button
                aria-label={`Open ${province.name} province`}
                className="national-map__province"
                data-selected={isSelected ? "true" : "false"}
                onClick={() =>
                  onProvinceSelect(province.id, province.dynasty_segment_ids[0])
                }
                type="button"
              >
                <strong>{province.name}</strong>
                <span>{province.hero_summary}</span>
                <span>
                  {feature ? getFeatureTypeLabel(feature) : "geometry pending"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
