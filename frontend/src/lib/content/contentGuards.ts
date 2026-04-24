export interface ProvinceSkeletonLike {
  id: string;
  name: string;
  hero_summary: string;
  map_shape_ref: string;
  dynasty_segment_ids: string[];
  source_ids: string[];
}

export interface LimitedContentModelInput {
  placeName: string;
  heroSummary: string;
  promptHref: string;
  promptLabel: string;
}

export interface LimitedContentModel {
  title: string;
  summary: string;
  promptHref: string;
  promptLabel: string;
}

export function resolveDynastySegmentId({
  requestedId,
  availableIds,
}: {
  requestedId: string | null;
  availableIds: string[];
}) {
  if (!availableIds.length) {
    return null;
  }

  if (requestedId && availableIds.includes(requestedId)) {
    return requestedId;
  }

  return availableIds[0];
}

export function requireProvinceSkeleton(record: ProvinceSkeletonLike) {
  const hasSummary = record.hero_summary.trim().length > 0;
  const hasShape = record.map_shape_ref.trim().length > 0;
  const hasSegments = record.dynasty_segment_ids.length > 0;

  if (!hasSummary || !hasShape || !hasSegments) {
    throw new Error(`Province skeleton is incomplete for ${record.id}`);
  }

  return record;
}

export function createLimitedContentModel(
  input: LimitedContentModelInput,
): LimitedContentModel {
  return {
    title: input.placeName,
    summary: input.heroSummary.trim(),
    promptHref: input.promptHref,
    promptLabel: input.promptLabel,
  };
}
