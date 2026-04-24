import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { Breadcrumbs } from "../../components/layout/Breadcrumbs";
import { LimitedContentState } from "../../components/layout/LimitedContentState";
import { ProvinceTimeline } from "../../components/timeline/ProvinceTimeline";
import { loadChronicleContent } from "../../lib/content/loadContent";
import { resolveDynastySegmentId } from "../../lib/content/contentGuards";
import { useHistoryContext } from "../../lib/state/historyContext";

interface ProvincePageProps {
  provinceId?: string;
  activeDynastySegmentId?: string | null;
  isLoading?: boolean;
}

function formatYear(year: number) {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

function formatYearRange(startYear: number, endYear: number) {
  return `${formatYear(startYear)} to ${formatYear(endYear)}`;
}

function collectSourceTitles(
  sourceIds: string[],
  sources: Array<{ id: string; title: string }>,
) {
  const sourceLookup = new Map(sources.map((source) => [source.id, source]));

  return sourceIds.map((sourceId) => sourceLookup.get(sourceId)?.title ?? sourceId);
}

export function ProvincePage({
  provinceId,
  activeDynastySegmentId = null,
  isLoading = false,
}: ProvincePageProps) {
  const params = useParams();
  const content = useMemo(() => loadChronicleContent(), []);
  const { state, dispatch } = useHistoryContext();
  const resolvedProvinceId = provinceId ?? params.provinceId ?? null;
  const provinceBundle = useMemo(() => {
    if (!resolvedProvinceId) {
      return { province: undefined, segments: [], events: [] };
    }

    return {
      province: content.provinces.find((entry) => entry.id === resolvedProvinceId),
      segments: content.segments.filter(
        (segment) =>
          segment.scope_type === "province" && segment.scope_id === resolvedProvinceId,
      ),
      events: content.events.filter(
        (event) =>
          event.scope_type === "province" && event.scope_id === resolvedProvinceId,
      ),
    };
  }, [content, resolvedProvinceId]);
  const province = provinceBundle.province;
  const segments = provinceBundle.segments;
  const events = provinceBundle.events;
  const requestedDynastySegmentId =
    activeDynastySegmentId ??
    (state.scope.kind === "province" && state.scope.provinceId === resolvedProvinceId
      ? state.activeDynastySegmentId
      : null);
  const availableSegmentIds = province?.dynasty_segment_ids ?? [];
  const activeSegmentId = resolveDynastySegmentId({
    requestedId: requestedDynastySegmentId,
    availableIds: availableSegmentIds,
  });
  const activeSegment = segments.find((segment) => segment.id === activeSegmentId) ?? null;
  const activeStructuralEvents = activeSegment
    ? events.filter(
        (event) =>
          event.dynasty_segment_id === activeSegment.id && event.event_type === "structural",
      )
    : [];

  useEffect(() => {
    if (!province) {
      return;
    }

    dispatch({ type: "selectProvince", provinceId: province.id });
    dispatch({ type: "selectDynastySegment", dynastySegmentId: activeSegmentId });
  }, [activeSegmentId, dispatch, province]);

  if (!resolvedProvinceId) {
    return (
      <LimitedContentState
        eyebrow="Province entry"
        placeName="Province page"
        heroSummary="Select a province from the national map to open its dynastic timeline."
        promptHref="/"
        promptLabel="Return to the national map"
      />
    );
  }

  if (isLoading) {
    return (
      <LimitedContentState
        eyebrow="Loading province"
        placeName="Loading province dossier"
        heroSummary="The province summary, dynastic lane, and structural events are being prepared."
        promptHref="/"
        promptLabel="Return to the national map"
      />
    );
  }

  if (!province) {
    return (
      <LimitedContentState
        eyebrow="Province unavailable"
        placeName="Province unavailable"
        heroSummary="This province route does not yet resolve to a released skeleton record."
        promptHref="/"
        promptLabel="Return to the national map"
      />
    );
  }

  const provinceSourceTitles = collectSourceTitles(province.source_ids, content.sources);
  const featuredCity = province.default_city_id
    ? content.cities.find((city) => city.id === province.default_city_id) ?? null
    : null;

  return (
    <section className="province-page" aria-labelledby="province-page-title">
      <Breadcrumbs provinceName={province.name} />

      <header className="province-page__hero">
        <p className="eyebrow">Province dossier</p>
        <h2 id="province-page-title">{province.name}</h2>
        <p>{province.hero_summary}</p>
        <dl className="province-page__facts">
          <div>
            <dt>Province identity</dt>
            <dd>{province.name}</dd>
          </div>
          <div>
            <dt>Map shape</dt>
            <dd>{province.map_shape_ref}</dd>
          </div>
          <div>
            <dt>Dynastic span</dt>
            <dd>
              {activeSegment
                ? `${activeSegment.dynasty_name}, ${formatYearRange(
                    activeSegment.start_year,
                    activeSegment.end_year,
                  )}`
                : "No dynastic segment available"}
            </dd>
          </div>
          <div>
            <dt>Structural events</dt>
            <dd>{activeStructuralEvents.length}</dd>
          </div>
          <div>
            <dt>Featured city</dt>
            <dd>
              {featuredCity ? (
                <Link to={`/city/${featuredCity.id}`}>{featuredCity.name}</Link>
              ) : (
                "No featured city released yet"
              )}
            </dd>
          </div>
        </dl>
        <p className="province-page__sources">
          Sources: {provinceSourceTitles.join(", ")}
        </p>
      </header>

      {activeSegment?.emphasis_level === "skeleton" ? (
        <LimitedContentState
          eyebrow="Skeleton province"
          placeName={`${province.name} is currently released as the national skeleton`}
          heroSummary="This page already shows the core place identity, active dynastic lane, and major structural event for the selected period. Deeper roam and cards layers expand only when curated province content is ready."
          promptHref="/"
          promptLabel="Browse another province on the national map"
        />
      ) : null}

      <ProvinceTimeline
        provinceName={province.name}
        provinceSummary={province.hero_summary}
        segments={segments}
        activeSegmentId={activeSegmentId}
        events={events}
        sources={content.sources}
        onSelectSegment={(segmentId) =>
          dispatch({ type: "selectDynastySegment", dynastySegmentId: segmentId })
        }
      />
    </section>
  );
}
