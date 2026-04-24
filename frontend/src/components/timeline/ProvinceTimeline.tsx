import type {
  DynastySegmentRecord,
  HistoricalEventRecord,
  SourceReferenceRecord,
} from "../../lib/schema/content";

interface ProvinceTimelineProps {
  provinceName: string;
  provinceSummary: string;
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

export function ProvinceTimeline({
  provinceName,
  provinceSummary,
  segments,
  activeSegmentId,
  events,
  sources,
  onSelectSegment,
}: ProvinceTimelineProps) {
  const activeSegment = segments.find((segment) => segment.id === activeSegmentId) ?? segments[0] ?? null;
  const structuralEvents = activeSegment
    ? events.filter(
        (event) =>
          event.dynasty_segment_id === activeSegment.id && event.event_type === "structural",
      )
    : [];
  const activeSegmentSources = activeSegment
    ? collectSourceTitles(activeSegment.source_ids, sources)
    : [];

  return (
    <section className="province-timeline" aria-labelledby="province-timeline-title">
      <header className="province-timeline__header">
        <p className="eyebrow">Timeline view</p>
        <h3 id="province-timeline-title">{provinceName} chronology</h3>
        <p>{provinceSummary}</p>
      </header>

      <div className="province-timeline__segment">
        <h4>Active dynastic segment</h4>
        {segments.length > 0 ? (
          <div
            className="province-timeline__segment-controls"
            role="tablist"
            aria-label={`${provinceName} dynastic segments`}
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
            {activeSegment.uncertainty_note ? (
              <p>{activeSegment.uncertainty_note}</p>
            ) : null}
            <p>Sources: {activeSegmentSources.join(", ")}</p>
          </>
        ) : (
          <p>No dynastic segment is available for this province yet.</p>
        )}
      </div>

      <div className="province-timeline__events">
        <h4>Structural events</h4>
        {structuralEvents.length > 0 ? (
          <ol>
            {structuralEvents.map((event) => (
              <li key={event.id}>
                <article>
                  <p>{event.year_label}</p>
                  <h5>{event.title}</h5>
                  <p>{event.summary}</p>
                  {event.impact_line ? <p>{event.impact_line}</p> : null}
                  {event.uncertainty_note ? <p>{event.uncertainty_note}</p> : null}
                  <p>Sources: {collectSourceTitles(event.source_ids, sources).join(", ")}</p>
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <p>
            This province is in skeleton mode for the current segment, so the default timeline lane
            is intentionally quiet.
          </p>
        )}
      </div>
    </section>
  );
}
