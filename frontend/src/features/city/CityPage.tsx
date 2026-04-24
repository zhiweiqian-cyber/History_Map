import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { Breadcrumbs } from "../../components/layout/Breadcrumbs";
import { CityHero } from "../../components/layout/CityHero";
import { LimitedContentState } from "../../components/layout/LimitedContentState";
import { CityTimeline } from "../../components/timeline/CityTimeline";
import { loadChronicleContent } from "../../lib/content/loadContent";
import { resolveDynastySegmentId } from "../../lib/content/contentGuards";
import { useHistoryContext } from "../../lib/state/historyContext";

interface CityPageProps {
  cityId?: string;
  activeDynastySegmentId?: string | null;
}

export function CityPage({
  cityId,
  activeDynastySegmentId = null,
}: CityPageProps) {
  const params = useParams();
  const content = useMemo(() => loadChronicleContent(), []);
  const { state, dispatch } = useHistoryContext();
  const resolvedCityId = cityId ?? params.cityId ?? null;
  const cityBundle = useMemo(() => {
    if (!resolvedCityId) {
      return {
        city: undefined,
        province: undefined,
        segments: [],
        events: [],
      };
    }

    const city = content.cities.find((entry) => entry.id === resolvedCityId);

    return {
      city,
      province: city
        ? content.provinces.find((entry) => entry.id === city.province_id)
        : undefined,
      segments: content.segments.filter(
        (segment) => segment.scope_type === "city" && segment.scope_id === resolvedCityId,
      ),
      events: content.events.filter(
        (event) => event.scope_type === "city" && event.scope_id === resolvedCityId,
      ),
    };
  }, [content, resolvedCityId]);
  const { city, province, segments, events } = cityBundle;
  const requestedDynastySegmentId =
    activeDynastySegmentId ??
    (state.scope.kind === "city" && state.scope.cityId === resolvedCityId
      ? state.activeDynastySegmentId
      : null);
  const activeSegmentId = resolveDynastySegmentId({
    requestedId: requestedDynastySegmentId,
    availableIds: city?.dynasty_segment_ids ?? [],
  });
  const activeSegment = segments.find((segment) => segment.id === activeSegmentId) ?? null;
  const activeStructuralEvents = activeSegment
    ? events.filter(
        (event) =>
          event.dynasty_segment_id === activeSegment.id && event.event_type === "structural",
      )
    : [];

  useEffect(() => {
    if (!city || !province) {
      return;
    }

    dispatch({ type: "selectCity", provinceId: province.id, cityId: city.id });
    dispatch({ type: "selectDynastySegment", dynastySegmentId: activeSegmentId });
  }, [activeSegmentId, city, dispatch, province]);

  if (!resolvedCityId) {
    return (
      <LimitedContentState
        eyebrow="Featured city entry"
        placeName="Featured city page"
        heroSummary="Use the hometown module or a province page to enter one of the released flagship city deep dives."
        promptHref="/"
        promptLabel="Return to the national map"
      />
    );
  }

  if (!city || !province) {
    return (
      <LimitedContentState
        eyebrow="Featured city unavailable"
        placeName="Featured city unavailable"
        heroSummary="This city route does not yet resolve to a released flagship city record."
        promptHref="/"
        promptLabel="Return to the national map"
      />
    );
  }

  return (
    <section className="city-page" aria-labelledby="city-page-title">
      <Breadcrumbs
        cityName={city.name}
        provinceHref={`/province/${province.id}`}
        provinceName={province.name}
      />

      <CityHero
        activeSegment={activeSegment}
        city={city}
        provinceName={province.name}
        sources={content.sources}
        structuralEventCount={activeStructuralEvents.length}
      />

      {activeSegment?.emphasis_level === "flagship" ? (
        <LimitedContentState
          eyebrow="Flagship city"
          placeName={`${city.name} is released as a flagship city deep dive`}
          heroSummary="This city layer preserves the parent province context while adding a tighter dynastic reading, structural event focus, and richer local identity."
          promptHref={`/province/${province.id}`}
          promptLabel={`Return to ${province.name} province`}
        />
      ) : null}

      <CityTimeline
        activeSegmentId={activeSegmentId}
        cityName={city.name}
        citySummary={city.hero_summary}
        events={events}
        segments={segments}
        sources={content.sources}
        onSelectSegment={(segmentId) =>
          dispatch({ type: "selectDynastySegment", dynastySegmentId: segmentId })
        }
      />
    </section>
  );
}
