import { z } from "zod";

const requiredTrimmedString = z.string().trim().min(1);
const sourceIdListSchema = z.array(requiredTrimmedString).min(1);

export const ProvinceRecordSchema = z.object({
  id: requiredTrimmedString,
  name: requiredTrimmedString,
  region_group: requiredTrimmedString.optional(),
  hero_summary: requiredTrimmedString,
  map_shape_ref: requiredTrimmedString,
  default_city_id: requiredTrimmedString.optional(),
  featured_city_ids: z.array(requiredTrimmedString).default([]),
  dynasty_segment_ids: z.array(requiredTrimmedString).min(1),
  source_ids: sourceIdListSchema,
});

export const FeaturedCityRecordSchema = z.object({
  id: requiredTrimmedString,
  province_id: requiredTrimmedString,
  name: requiredTrimmedString,
  hero_summary: requiredTrimmedString,
  lat: z.number(),
  lng: z.number(),
  place_identity_line: requiredTrimmedString,
  dynasty_segment_ids: z.array(requiredTrimmedString).min(1),
  source_ids: sourceIdListSchema,
});

export const DynastySegmentSchema = z.object({
  id: requiredTrimmedString,
  scope_type: z.enum(["province", "city"]),
  scope_id: requiredTrimmedString,
  dynasty_name: requiredTrimmedString,
  start_year: z.number().int(),
  end_year: z.number().int(),
  summary: requiredTrimmedString,
  emphasis_level: z.enum(["skeleton", "standard", "flagship"]),
  event_ids: z.array(requiredTrimmedString).min(1),
  place_node_ids: z.array(requiredTrimmedString).default([]),
  trivia_ids: z.array(requiredTrimmedString).default([]),
  source_ids: sourceIdListSchema,
  uncertainty_note: requiredTrimmedString.optional(),
});

export const HistoricalEventSchema = z
  .object({
    id: requiredTrimmedString,
    scope_type: z.enum(["province", "city"]),
    scope_id: requiredTrimmedString,
    dynasty_segment_id: requiredTrimmedString,
    title: requiredTrimmedString,
    event_type: z.enum(["structural", "context", "micro"]),
    year_label: requiredTrimmedString,
    summary: requiredTrimmedString,
    impact_line: z.string().trim(),
    related_person_ids: z.array(requiredTrimmedString).default([]),
    related_place_node_ids: z.array(requiredTrimmedString).default([]),
    source_ids: sourceIdListSchema,
    uncertainty_note: requiredTrimmedString.optional(),
  })
  .superRefine((value, context) => {
    if (value.event_type === "structural" && value.impact_line.length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Structural events must include a non-empty impact_line.",
        path: ["impact_line"],
      });
    }
  });

export const PlaceNodeSchema = z.object({
  id: requiredTrimmedString,
  scope_type: z.enum(["province", "city"]),
  scope_id: requiredTrimmedString,
  title: requiredTrimmedString,
  node_type: requiredTrimmedString,
  lat: z.number(),
  lng: z.number(),
  story: requiredTrimmedString,
  dynasty_segment_ids: z.array(requiredTrimmedString).min(1),
  source_ids: sourceIdListSchema,
});

export const HistoricalPersonSchema = z.object({
  id: requiredTrimmedString,
  name: requiredTrimmedString,
  scope_ids: z.array(requiredTrimmedString).min(1),
  dynasty_segment_ids: z.array(requiredTrimmedString).min(1),
  summary: requiredTrimmedString,
  role_label: requiredTrimmedString,
  source_ids: sourceIdListSchema,
});

export const TriviaItemSchema = z.object({
  id: requiredTrimmedString,
  scope_type: z.enum(["province", "city"]),
  scope_id: requiredTrimmedString,
  dynasty_segment_id: requiredTrimmedString,
  trivia_type: z.enum(["contrast", "daily-life", "time-space"]),
  title: requiredTrimmedString,
  body: requiredTrimmedString,
  source_ids: sourceIdListSchema,
  display_weight: z.number().int().positive().default(1),
});

export const SourceReferenceSchema = z.object({
  id: requiredTrimmedString,
  title: requiredTrimmedString,
  source_kind: z.enum([
    "book",
    "archive",
    "article",
    "museum",
    "academic paper",
    "curated dataset",
  ]),
  author_or_org: requiredTrimmedString,
  publication_note: requiredTrimmedString.optional(),
  locator: requiredTrimmedString,
  confidence_level: z.enum(["high", "medium", "contextual"]),
});

export const ProvinceIndexSchema = z.object({
  provinces: z.array(ProvinceRecordSchema),
});

export const CityIndexSchema = z.object({
  cities: z.array(FeaturedCityRecordSchema),
});

export const DynastySegmentIndexSchema = z.object({
  segments: z.array(DynastySegmentSchema),
});

export const HistoricalEventIndexSchema = z.object({
  events: z.array(HistoricalEventSchema),
});

export const TriviaIndexSchema = z.object({
  trivia: z.array(TriviaItemSchema),
});

export const SourceIndexSchema = z.object({
  sources: z.array(SourceReferenceSchema),
});

export type ProvinceRecord = z.infer<typeof ProvinceRecordSchema>;
export type FeaturedCityRecord = z.infer<typeof FeaturedCityRecordSchema>;
export type DynastySegmentRecord = z.infer<typeof DynastySegmentSchema>;
export type HistoricalEventRecord = z.infer<typeof HistoricalEventSchema>;
export type PlaceNodeRecord = z.infer<typeof PlaceNodeSchema>;
export type HistoricalPersonRecord = z.infer<typeof HistoricalPersonSchema>;
export type TriviaItemRecord = z.infer<typeof TriviaItemSchema>;
export type SourceReferenceRecord = z.infer<typeof SourceReferenceSchema>;
