import {
  CityIndexSchema,
  DynastySegmentIndexSchema,
  HistoricalEventIndexSchema,
  ProvinceIndexSchema,
  SourceIndexSchema,
  TriviaIndexSchema,
  type DynastySegmentRecord,
  type FeaturedCityRecord,
  type HistoricalEventRecord,
  type ProvinceRecord,
  type SourceReferenceRecord,
  type TriviaItemRecord,
} from "../schema/content";

export interface ChronicleContent {
  provinces: ProvinceRecord[];
  cities: FeaturedCityRecord[];
  segments: DynastySegmentRecord[];
  events: HistoricalEventRecord[];
  trivia: TriviaItemRecord[];
  sources: SourceReferenceRecord[];
}

export interface ChronicleContentInput {
  provinces: unknown[];
  cities: unknown[];
  segments: unknown[];
  events: unknown[];
  trivia: unknown[];
  sources: unknown[];
}

function assertSourceIds(
  ownerType: string,
  ownerId: string,
  sourceIds: string[],
  sourceIndex: Set<string>,
) {
  for (const sourceId of sourceIds) {
    if (!sourceIndex.has(sourceId)) {
      throw new Error(`${ownerType} ${ownerId} references missing source ${sourceId}`);
    }
  }
}

export function validateChronicleContent(
  input: ChronicleContentInput,
): ChronicleContent {
  const provinceIndex = ProvinceIndexSchema.parse({ provinces: input.provinces });
  const cityIndex = CityIndexSchema.parse({ cities: input.cities });
  const segmentIndex = DynastySegmentIndexSchema.parse({ segments: input.segments });
  const eventIndex = HistoricalEventIndexSchema.parse({ events: input.events });
  const triviaIndex = TriviaIndexSchema.parse({ trivia: input.trivia });
  const sourceIndexObject = SourceIndexSchema.parse({ sources: input.sources });

  const provinceIds = new Set(provinceIndex.provinces.map((record) => record.id));
  const cityIds = new Set(cityIndex.cities.map((record) => record.id));
  const segmentIds = new Set(segmentIndex.segments.map((record) => record.id));
  const eventIds = new Set(eventIndex.events.map((record) => record.id));
  const triviaIds = new Set(triviaIndex.trivia.map((record) => record.id));
  const sourceIds = new Set(sourceIndexObject.sources.map((record) => record.id));

  for (const province of provinceIndex.provinces) {
    assertSourceIds("Province", province.id, province.source_ids, sourceIds);

    for (const segmentId of province.dynasty_segment_ids) {
      if (!segmentIds.has(segmentId)) {
        throw new Error(`Province ${province.id} references missing segment ${segmentId}`);
      }
    }
  }

  for (const city of cityIndex.cities) {
    if (!provinceIds.has(city.province_id)) {
      throw new Error(`City ${city.id} references missing province ${city.province_id}`);
    }

    assertSourceIds("City", city.id, city.source_ids, sourceIds);

    for (const segmentId of city.dynasty_segment_ids) {
      if (!segmentIds.has(segmentId)) {
        throw new Error(`City ${city.id} references missing segment ${segmentId}`);
      }
    }
  }

  for (const segment of segmentIndex.segments) {
    if (
      segment.scope_type === "province" &&
      !provinceIds.has(segment.scope_id)
    ) {
      throw new Error(
        `Segment ${segment.id} references missing province ${segment.scope_id}`,
      );
    }

    if (segment.scope_type === "city" && !cityIds.has(segment.scope_id)) {
      throw new Error(`Segment ${segment.id} references missing city ${segment.scope_id}`);
    }

    assertSourceIds("Segment", segment.id, segment.source_ids, sourceIds);

    for (const eventId of segment.event_ids) {
      if (!eventIds.has(eventId)) {
        throw new Error(`Segment ${segment.id} references missing event ${eventId}`);
      }
    }

    for (const triviaId of segment.trivia_ids) {
      if (!triviaIds.has(triviaId)) {
        throw new Error(`Segment ${segment.id} references missing trivia ${triviaId}`);
      }
    }
  }

  for (const event of eventIndex.events) {
    if (!segmentIds.has(event.dynasty_segment_id)) {
      throw new Error(
        `Event ${event.id} references missing segment ${event.dynasty_segment_id}`,
      );
    }

    if (event.scope_type === "province" && !provinceIds.has(event.scope_id)) {
      throw new Error(`Event ${event.id} references missing province ${event.scope_id}`);
    }

    if (event.scope_type === "city" && !cityIds.has(event.scope_id)) {
      throw new Error(`Event ${event.id} references missing city ${event.scope_id}`);
    }

    assertSourceIds("Event", event.id, event.source_ids, sourceIds);
  }

  for (const trivia of triviaIndex.trivia) {
    if (!segmentIds.has(trivia.dynasty_segment_id)) {
      throw new Error(
        `Trivia ${trivia.id} references missing segment ${trivia.dynasty_segment_id}`,
      );
    }

    if (trivia.scope_type === "province" && !provinceIds.has(trivia.scope_id)) {
      throw new Error(`Trivia ${trivia.id} references missing province ${trivia.scope_id}`);
    }

    if (trivia.scope_type === "city" && !cityIds.has(trivia.scope_id)) {
      throw new Error(`Trivia ${trivia.id} references missing city ${trivia.scope_id}`);
    }

    assertSourceIds("Trivia", trivia.id, trivia.source_ids, sourceIds);
  }

  return {
    provinces: provinceIndex.provinces,
    cities: cityIndex.cities,
    segments: segmentIndex.segments,
    events: eventIndex.events,
    trivia: triviaIndex.trivia,
    sources: sourceIndexObject.sources,
  };
}
