# Data Model: Interactive China History Chronicle

## Overview

The data model is place-first and chronology-aware. Every surfaced experience
must answer three questions:

1. Which place is this about?
2. Which dynastic segment is active?
3. Why does this content matter here?

## Entities

### Province

**Purpose**: Primary regional container for the national skeleton.

**Fields**:

- `id`: stable slug, e.g. `shaanxi`
- `name`: localized display name
- `region_group`: larger region grouping, e.g. `northwest`
- `hero_summary`: short narrative introduction
- `map_shape_ref`: reference to map geometry or region asset
- `default_city_id`: optional featured city to highlight
- `featured_city_ids`: ordered list of featured city ids
- `dynasty_segment_ids`: ordered list of dynasty segment ids relevant to the province
- `source_ids`: supporting sources for province summary

**Relationships**:

- One province has many featured cities
- One province has many dynasty segments
- One province references many events, trivia items, and sources through segments

### FeaturedCity

**Purpose**: Curated deep-dive local experience inside a province.

**Fields**:

- `id`: stable slug, e.g. `xian`
- `province_id`: parent province id
- `name`: display name
- `hero_summary`: local introduction
- `lat` / `lng`: map anchor coordinates
- `place_identity_line`: short descriptor for the city role in history
- `dynasty_segment_ids`: ordered list of dynastic segments relevant to the city
- `source_ids`: supporting sources for city summary

**Relationships**:

- Many featured cities belong to one province
- One featured city has many events, people, place nodes, and trivia items

### DynastySegment

**Purpose**: Time-bounded narrative layer for a specific place.

**Fields**:

- `id`: stable slug
- `scope_type`: `province` or `city`
- `scope_id`: province id or city id
- `dynasty_name`: display dynasty label
- `start_year`: inclusive start year
- `end_year`: inclusive end year
- `summary`: short narrative for the place in this period
- `emphasis_level`: `skeleton`, `standard`, or `flagship`
- `event_ids`: ordered event references
- `place_node_ids`: ordered roam references
- `trivia_ids`: optional enrichment references
- `source_ids`: supporting sources
- `uncertainty_note`: optional note for disputed framing

**Relationships**:

- Each segment belongs to exactly one place scope
- Each segment references many events, place nodes, trivia items, and sources

### HistoricalEvent

**Purpose**: Core historical narrative unit.

**Fields**:

- `id`: stable slug
- `scope_type`: `province` or `city`
- `scope_id`: place owner
- `dynasty_segment_id`: parent segment
- `title`: display title
- `event_type`: `structural`, `context`, or `micro`
- `year_label`: display-safe year or period label
- `summary`: user-facing explanation
- `impact_line`: brief statement of why it matters to this place
- `related_person_ids`: optional person references
- `related_place_node_ids`: optional place-node references
- `source_ids`: supporting sources
- `uncertainty_note`: optional note

### PlaceNode

**Purpose**: Spatial storytelling unit for roam view.

**Fields**:

- `id`: stable slug
- `scope_type`: `province` or `city`
- `scope_id`: place owner
- `title`: display label
- `node_type`: `capital`, `trade`, `battle`, `culture`, `administration`, or similar
- `lat` / `lng`: coordinates
- `story`: concise roam narrative
- `dynasty_segment_ids`: relevant periods
- `source_ids`: supporting sources

### HistoricalPerson

**Purpose**: Person card or contextual figure tied to a place and period.

**Fields**:

- `id`: stable slug
- `name`: display name
- `scope_ids`: relevant provinces or cities
- `dynasty_segment_ids`: relevant periods
- `summary`: short narrative
- `role_label`: e.g. poet, official, ruler, reformer
- `source_ids`: supporting sources

### TriviaItem

**Purpose**: Premium surprise layer tied to place and time.

**Fields**:

- `id`: stable slug
- `scope_type`: `province` or `city`
- `scope_id`: place owner
- `dynasty_segment_id`: linked period
- `trivia_type`: `contrast`, `daily-life`, or `time-space`
- `title`: short hook
- `body`: supporting explanation
- `source_ids`: supporting sources
- `display_weight`: used to keep trivia sparse

### SourceReference

**Purpose**: Provenance record for surfaced content.

**Fields**:

- `id`: stable slug
- `title`: source title
- `source_kind`: book, archive, article, museum, academic paper, or curated dataset
- `author_or_org`: author or institution
- `publication_note`: date or edition note
- `locator`: page, chapter, URL, or archive identifier
- `confidence_level`: `high`, `medium`, or `contextual`

## Relationships Summary

- Province -> many FeaturedCity
- Province/FeaturedCity -> many DynastySegment
- DynastySegment -> many HistoricalEvent
- DynastySegment -> many PlaceNode
- DynastySegment -> many TriviaItem
- HistoricalEvent -> optional many HistoricalPerson
- All surfaced narrative entities -> many SourceReference

## Validation Rules

- Every event, trivia item, and place node must belong to a place scope and a
  dynastic segment.
- Every surfaced narrative entity must reference at least one source.
- Only `structural` events may appear on the default timeline lane.
- A province may exist without featured cities, but a featured city may not
  exist without a parent province.
- `flagship` emphasis segments are allowed only for curated deep-dive provinces
  or cities.

## State Transitions

### Reading Context

`homepage` -> `province selected` -> `dynasty segment active` -> `view switched`

The selected place remains stable while the view mode changes.

### Hometown Flow

`homepage` -> `hometown module open` -> `province selected` -> `featured city selected`

Users may return from city to province, then from province to national map.
