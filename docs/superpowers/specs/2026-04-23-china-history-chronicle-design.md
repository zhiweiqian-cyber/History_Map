# China History Chronicle Design

**Date**: 2026-04-23  
**Status**: Approved for planning  
**Product Direction**: Geography-first interactive Chinese history chronicle

## Product Intent

Build an interactive Chinese history chronicle that helps people enter history
through the land they know. The experience starts from a China map, lets users
move into provinces and key cities, and then explains that place through
dynastic chronology, major events, and memorable trivia.

The product is primarily for mass-market historical discovery, with a secondary
layer of deeper exploration. The interaction must feel advanced and cool, but
the visual language must grow out of historical texture rather than feeling like
a generic sci-fi interface placed on top of history.

## Core Product Decisions

1. Geography is the primary entry point.
2. Dynastic chronology remains the organizing spine inside each place.
3. Desktop is the first-class experience.
4. The product uses a hybrid direction: map-led narrative with strong
   chronological structure.
5. Interaction language blends "terrain sandbox" immersion with "digital scroll"
   order and pacing.

## Audience and Value

### Primary Audience

- General users who want an engaging and readable way to learn Chinese history.
- Users who are more likely to care when history connects to their hometown or a
  place they know.

### Secondary Audience

- Curious learners who want to explore how places changed across dynasties.
- Users who enjoy historical trivia and spatial storytelling.

### Value Proposition

The product turns history from an abstract national timeline into a lived
regional journey: "What happened on the land I know, and how did it change over
time?"

## Information Architecture

### National Layer

The homepage presents a designed China map that communicates national structure
before detail. It introduces the product as a historical space, not a utilitarian
map tool.

### Regional Layer

Users enter a province page from the map. Each province page explains that
region through dynastic phases, region-specific turning points, and historical
context relevant to that land.

### City Layer

Users can drill down into selected flagship cities. City pages act like compact
local history museums, combining chronology, place, people, and trivia.

### Geographic Granularity

The first release uses a two-step regional structure:

- Province-level coverage for national completeness.
- Selected deep-dive cities per province or historical region for richer
  storytelling.

## Entry Structure

### Primary Entry

The default homepage interaction is a national map overview that leads users
into provinces and major historical regions.

### Secondary Emotional Entry

The homepage includes a clearly visible but non-dominant module:
"Start from my hometown."

This lets users select a province and then a featured city. It is optional, not
mandatory, so the national frame remains legible.

### Entry Recommendation

Use national-map overview plus hometown module as a combined entry system:

- National map preserves scale and orientation.
- Hometown entry creates immediate emotional relevance.

## View System

The product offers one shared content system with three reading modes, not three
separate products.

### Timeline View

This is the default view inside a province or city. It explains dynastic order,
major turning points, and long-term change. Its purpose is comprehension.

### Roam View

This is the immersive exploration view. It lets users move through a place as
historical nodes surface across space and time. Its purpose is curiosity and
presence.

### Card View

This is the detail and browsing view. It turns events, people, institutions,
artifacts, and trivia into readable, collectible knowledge cards. Its purpose
is lightweight absorption and sharing.

## Interaction and Visual Language

### Chosen Direction

The experience blends two design languages:

- Terrain Sandbox: spatial immersion, topographic presence, route glow, map-led
  discovery, and a sense of a future museum table coming alive.
- Digital Scroll: chronological order, unfolding sequences, historical pacing,
  layered reveals, and a documentary tone that feels rooted in archives and
  inscriptions.

### What "Cool" Means Here

The interaction should feel advanced, cinematic, and tactile. It must not feel
like a generic dashboard, a GIS tool, or a cyberpunk game map.

The right tone is:

"A future museum interface for historical China."

### Motion Principles

- Reveal, unfold, inscribe, illuminate.
- Prefer slow confidence over noisy twitchiness.
- Use transitions to strengthen time-and-place understanding.
- Remove any motion that looks impressive but weakens historical clarity.

### Material and Tone Principles

- Base visual cues on terrain, mineral, paper, ink, bronze, and stone.
- Avoid neon-heavy palettes and modern product-dashboard chrome.
- Let advanced UI structure coexist with historical texture.

## Content Model

### Primary Content Axes

Each content item is anchored to:

- Place
- Dynastic phase
- Historical significance

### Event Levels

#### Level 1: Structural Events

These change the destiny of a place and appear on the main timeline track.
Examples include capital shifts, regime transitions, major wars, administrative
restructuring, trade-route formation, and periods of cultural centrality.

#### Level 2: Context Events

These explain the causes or consequences of structural events. They appear in
expanded detail panels, side stories, or roam stops.

#### Level 3: Micro Events

These are local stories, smaller reforms, customs, or anecdotes. They fit best
in cards and trivia modules.

### Supporting Entities

- Region
- Province
- City
- Dynasty Segment
- Historical Event
- Place Node
- Person
- Trivia Item
- Source Reference

## Trivia Strategy

Trivia is a premium surprise layer, not filler.

### Approved Trivia Types

1. Local contrast trivia
2. Daily-life detail trivia
3. Time-space dislocation trivia

### Trivia Rules

- Trivia must not interrupt the main narrative.
- Trivia must remain tied to place and time.
- Trivia quality matters more than count.
- All trivia needs provenance in the content layer.

## Release Scope

### V1 Scope

- Full province-level historical skeleton across Chinese history.
- Selected deep-dive provinces and cities with richer content.
- National map homepage.
- Province and city pages with timeline, roam, and card modes.
- Hometown entry module.
- Curated trivia for flagship regions.

### Suggested Initial Deep-Dive Focus

Prioritize historically weighty regions and cities such as:

- Shaanxi / Xi'an
- Sichuan / Chengdu
- Zhejiang / Hangzhou
- Guangdong / Guangzhou
- Beijing

The exact launch list can be finalized during planning.

## Quality Bar

### Historical Quality

- Only region-relevant historical events belong on that place page.
- Facts require source metadata.
- Uncertainty or disputed interpretation must be labeled in the content layer.

### Experience Quality

- The homepage must create a strong first impression within seconds.
- The province page must make chronology legible immediately.
- The roam view must deepen understanding, not only decorate it.
- The card view must reward browsing without fragmenting the story.

### Scope Discipline

- National completeness comes from the skeleton.
- Delight comes from a smaller number of deeply crafted places.
- Do not attempt universal city-level depth in the first release.

## Open Planning Questions

- Which provinces and cities belong in the first deep-dive set?
- What source model and editorial workflow will support provenance at scale?
- What technical stack best supports map immersion, high-performance motion, and
  future content expansion?

## Approved Direction Summary

The approved direction is a geography-first Chinese history product with a
map-led homepage, optional hometown entry, province-to-city drilling, three
coordinated reading modes, and a hybrid interaction language that is immersive,
advanced, and historically grounded.
