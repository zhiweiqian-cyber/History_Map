import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { HometownEntry } from "../../components/layout/HometownEntry";
import { NationalMap } from "../../components/map/NationalMap";
import { loadChronicleContent } from "../../lib/content/loadContent";
import { loadProvinceGeometry } from "../../lib/content/loadGeometry";
import { useHistoryContext } from "../../lib/state/historyContext";
import {
  recordHomepageVisit,
  recordMapEntrySelection,
} from "../../lib/state/interactionMetrics";

export function HomePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useHistoryContext();
  const content = useMemo(() => loadChronicleContent(), []);
  const geometry = useMemo(() => loadProvinceGeometry(), []);

  useEffect(() => {
    recordHomepageVisit();
  }, []);

  const selectedProvinceId =
    state.scope.kind === "national" ? null : state.scope.provinceId;

  function handleProvinceSelect(provinceId: string, dynastySegmentId: string) {
    recordMapEntrySelection();
    dispatch({ type: "selectProvince", provinceId });
    dispatch({ type: "selectDynastySegment", dynastySegmentId });
    navigate(`/province/${provinceId}`);
  }

  return (
    <section className="home-page" aria-labelledby="home-page-title">
      <header className="home-page__hero">
        <p className="eyebrow">National map entry</p>
        <h2 id="home-page-title">Enter Chinese history through the map</h2>
        <p>
          Start from the land itself. Each province opens a dynastic reading of how
          that place changed over time, then later expands into roam and card views.
        </p>
      </header>

      <NationalMap
        provinces={content.provinces}
        features={geometry.features}
        selectedProvinceId={selectedProvinceId}
        onProvinceSelect={handleProvinceSelect}
      />

      <HometownEntry cities={content.cities} provinces={content.provinces} />
    </section>
  );
}
