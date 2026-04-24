import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { FeaturedCityRecord, ProvinceRecord } from "../../lib/schema/content";
import { useHistoryContext } from "../../lib/state/historyContext";
import { LimitedContentState } from "./LimitedContentState";

interface HometownEntryProps {
  provinces: ProvinceRecord[];
  cities: FeaturedCityRecord[];
}

export function HometownEntry({ provinces, cities }: HometownEntryProps) {
  const navigate = useNavigate();
  const { dispatch } = useHistoryContext();
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  const selectedProvince = useMemo(
    () => provinces.find((province) => province.id === selectedProvinceId) ?? null,
    [provinces, selectedProvinceId],
  );
  const availableCities = useMemo(
    () => cities.filter((city) => city.province_id === selectedProvinceId),
    [cities, selectedProvinceId],
  );

  function handleProvinceChange(provinceId: string) {
    setSelectedProvinceId(provinceId);
    setSelectedCityId("");

    if (provinceId) {
      dispatch({ type: "selectProvince", provinceId });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const city = availableCities.find((entry) => entry.id === selectedCityId);

    if (!city) {
      return;
    }

    dispatch({ type: "selectCity", provinceId: city.province_id, cityId: city.id });
    dispatch({
      type: "selectDynastySegment",
      dynastySegmentId: city.dynasty_segment_ids[0] ?? null,
    });
    navigate(`/city/${city.id}`);
  }

  return (
    <section className="hometown-entry" aria-labelledby="hometown-entry-title">
      <header>
        <p className="eyebrow">Start from my hometown</p>
        <h3 id="hometown-entry-title">Jump from province to featured city</h3>
        <p>
          Choose the place you identify with first, then enter one of the flagship
          city deep dives without losing provincial orientation.
        </p>
      </header>

      <form className="hometown-entry__form" onSubmit={handleSubmit}>
        <label className="hometown-entry__field">
          <span>Choose a province</span>
          <select
            aria-label="Choose a province"
            onChange={(event) => handleProvinceChange(event.target.value)}
            value={selectedProvinceId}
          >
            <option value="">Select a province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
        </label>

        {selectedProvince && availableCities.length > 0 ? (
          <label className="hometown-entry__field">
            <span>Choose a featured city</span>
            <select
              aria-label="Choose a featured city"
              onChange={(event) => setSelectedCityId(event.target.value)}
              value={selectedCityId}
            >
              <option value="">Select a featured city</option>
              {availableCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <button disabled={!selectedCityId} type="submit">
          Open featured city
        </button>
      </form>

      {selectedProvince && availableCities.length === 0 ? (
        <LimitedContentState
          eyebrow="Hometown module"
          placeName={`No hometown city is released yet for ${selectedProvince.name}`}
          heroSummary="This province is present in the national skeleton, but its hometown deep dive has not entered the flagship city set for v1."
          promptHref={`/province/${selectedProvince.id}`}
          promptLabel={`Open ${selectedProvince.name} province instead`}
        />
      ) : null}
    </section>
  );
}
