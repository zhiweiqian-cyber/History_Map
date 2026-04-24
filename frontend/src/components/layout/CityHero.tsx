import type {
  DynastySegmentRecord,
  FeaturedCityRecord,
  SourceReferenceRecord,
} from "../../lib/schema/content";

interface CityHeroProps {
  city: FeaturedCityRecord;
  provinceName: string;
  activeSegment: DynastySegmentRecord | null;
  structuralEventCount: number;
  sources: SourceReferenceRecord[];
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

export function CityHero({
  city,
  provinceName,
  activeSegment,
  structuralEventCount,
  sources,
}: CityHeroProps) {
  return (
    <header className="city-hero">
      <p className="eyebrow">Featured city dossier</p>
      <h2 id="city-page-title">{city.name}</h2>
      <p>{city.hero_summary}</p>
      <dl className="province-page__facts">
        <div>
          <dt>Parent province</dt>
          <dd>{provinceName}</dd>
        </div>
        <div>
          <dt>City identity</dt>
          <dd>{city.place_identity_line}</dd>
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
          <dd>{structuralEventCount}</dd>
        </div>
      </dl>
      <p className="province-page__sources">
        Sources: {collectSourceTitles(city.source_ids, sources).join(", ")}
      </p>
    </header>
  );
}
