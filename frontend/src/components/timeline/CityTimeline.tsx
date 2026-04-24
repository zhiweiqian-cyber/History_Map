import type {
  DynastySegmentRecord,
  HistoricalEventRecord,
  SourceReferenceRecord,
} from "../../lib/schema/content";

interface CityTimelineProps {
  cityName: string;
  citySummary: string;
  segments: DynastySegmentRecord[];
  activeSegmentId: string | null;
  events: HistoricalEventRecord[];
  sources: SourceReferenceRecord[];
  onSelectSegment?: (segmentId: string) => void;
}

function formatYear(year: number) {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

function formatYearRange(startYear: number, endYear: number) {
  return `${formatYear(startYear)} to ${formatYear(endYear)}`;
}

function collectSourceTitles(
  sourceIds: string[],
  sources: SourceReferenceRecord[],
) {
  const sourceLookup = new Map(sources.map((source) => [source.id, source]));

  return sourceIds.map((sourceId) => sourceLookup.get(sourceId)?.title ?? sourceId);
}

export function CityTimeline({
  cityName,
  citySummary,
  segments,
  activeSegmentId,
  events,
  sources,
  onSelectSegment,
}: CityTimelineProps) {
  const activeSegment = segments.find((segment) => segment.id === activeSegmentId) ?? segments[0] ?? null;
  const structuralEvents = activeSegment
    ? events.filter(
        (event) =>
          event.dynasty_segment_id === activeSegment.id && event.event_type === "structural",
      )
    : [];

  return (
    <section className="city-timeline" aria-labelledby="city-timeline-title">
      <header className="province-timeline__header">
        <p className="eyebrow">City timeline</p>
        <h3 id="city-timeline-title">{cityName} chronology</h3>
        <p>{citySummary}</p>
      </header>

      <div className="city-timeline__segment">
        <h4>Active dynastic segment</h4>
        {segments.length > 1 ? (
          <div
            className="province-timeline__segment-controls"
            role="tablist"
            aria-label={`${cityName} dynastic segments`}
          >
            {segments.map((segment) => {
              const isActive = segment.id === activeSegment?.id;

              return (
                <button
                  key={segment.id}
                  aria-selected={isActive}
                  className="province-timeline__segment-button"
                  data-active={isActive ? "true" : "false"}
                  onClick={() => onSelectSegment?.(segment.id)}
                  role="tab"
                  type="button"
                >
                  {segment.dynasty_name}
                </button>
              );
            })}
          </div>
        ) : null}
        {activeSegment ? (
          <>
            <p>
              {activeSegment.dynasty_name} - {formatYearRange(activeSegment.start_year, activeSegment.end_year)}
            </p>
            <p>{activeSegment.summary}</p>
            {activeSegment.uncertainty_note ? <p>{activeSegment.uncertainty_note}</p> : null}
            <p>
              Sources: {collectSourceTitles(activeSegment.source_ids, sources).join(", ")}
            </p>
          </>
        ) : (
          <p>No dynastic segment is available for this city yet.</p>
        )}
      </div>

      <div className="city-timeline__events">
        <h4>Structural events</h4>
        {structuralEvents.length > 0 ? (
          <ol>
            {structuralEvents.map((event) => (
              <li key={event.id}>
                <article>
                  <p>{event.year_label}</p>
                  <h5>{event.title}</h5>
                  <p>{event.summary}</p>
                  <p>{event.impact_line}</p>
                  <p>Sources: {collectSourceTitles(event.source_ids, sources).join(", ")}</p>
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <p>This flagship city does not yet have structural events for the current segment.</p>
        )}
      </div>
    </section>
  );
}
