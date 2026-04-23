# Content Schema Contract

## Purpose

Define the minimum content guarantees required before content can render in the
application.

## Province Record

Required fields:

- `id`
- `name`
- `hero_summary`
- `dynasty_segment_ids`
- `source_ids`

## Featured City Record

Required fields:

- `id`
- `province_id`
- `name`
- `hero_summary`
- `dynasty_segment_ids`
- `source_ids`

## Dynasty Segment Record

Required fields:

- `id`
- `scope_type`
- `scope_id`
- `dynasty_name`
- `start_year`
- `end_year`
- `summary`
- `emphasis_level`
- `event_ids`
- `source_ids`

## Historical Event Record

Required fields:

- `id`
- `scope_type`
- `scope_id`
- `dynasty_segment_id`
- `title`
- `event_type`
- `year_label`
- `summary`
- `impact_line`
- `source_ids`

## Trivia Item Record

Required fields:

- `id`
- `scope_type`
- `scope_id`
- `dynasty_segment_id`
- `trivia_type`
- `title`
- `body`
- `source_ids`

## Source Reference Record

Required fields:

- `id`
- `title`
- `source_kind`
- `author_or_org`
- `locator`
- `confidence_level`

## Validation Rules

- Records missing required fields fail validation.
- Referenced `province_id`, `city_id`, `dynasty_segment_id`, and `source_ids`
  must resolve to existing records.
- Structural events may not be missing `impact_line`.
- Trivia records without source references are invalid.
