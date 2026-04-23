<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template Principle 1 -> I. Geography-First Historical Entry
- Template Principle 2 -> II. Dynastic Chronology as Narrative Spine
- Template Principle 3 -> III. Advanced Interaction, Historically Grounded
- Template Principle 4 -> IV. Source Traceability and Editorial Integrity
- Template Principle 5 -> V. Progressive Depth, Not Maximum Density
Added sections:
- Product Scope and Content Standards
- Workflow and Quality Gates
Removed sections:
- None
Templates requiring updates:
- done: .specify/templates/plan-template.md
- done: .specify/templates/spec-template.md
- done: .specify/templates/tasks-template.md
- done: AGENTS.md
Follow-up TODOs:
- None
-->
# SpecCodingProjects Constitution

## Core Principles

### I. Geography-First Historical Entry
Every user-facing feature MUST begin from land, region, province, city, or
place-based discovery before it expands into broader historical interpretation.
This product exists to connect users with Chinese history through places they
know, so features that ignore geographic anchoring or treat place as a cosmetic
filter are out of bounds.

### II. Dynastic Chronology as Narrative Spine
Every province, city, and thematic experience MUST remain legible through
dynastic chronology. Geography is the entry point, but time is the organizing
spine. Features MAY introduce alternative views such as roam or cards only if
they still map cleanly back to dynastic sequence and major turning points.

### III. Advanced Interaction, Historically Grounded
The interface MUST feel advanced, cinematic, and memorable, but its visual
language MUST emerge from historical materials, terrain, inscription, paper,
bronze, stone, or cartographic texture. Motion, lighting, and spatial effects
MUST strengthen historical understanding rather than distracting from it.
Generic dashboard patterns, trend-chasing "AI slop," and style choices that
break the product's historical tone are prohibited.

### IV. Source Traceability and Editorial Integrity
Historical facts, trivia, event summaries, and place interpretations MUST carry
source metadata in the content layer before they are considered production-ready.
When historical interpretation is uncertain or contested, the uncertainty MUST be
represented explicitly in content modeling or editorial workflow. No feature may
prioritize novelty over factual integrity.

### V. Progressive Depth, Not Maximum Density
The experience MUST provide a complete national skeleton at the province level
while reserving richer detail for selected flagship places and cities. Each view
MUST reveal deeper layers progressively rather than overwhelming the user with
maximal information. Scope expansion is allowed only when clarity, curation, and
content quality remain intact.

## Product Scope and Content Standards

The first release MUST support:

- A national map homepage as the primary entry experience.
- An optional "start from my hometown" module that leads users from province to
  selected cities.
- Province pages with timeline, roam, and card views sharing one coherent
  content system.
- City deep dives only for curated flagship cities.
- Event modeling that separates structural events, context events, and micro
  stories or trivia.

Content standards for every released place page:

- Only region-relevant events may appear on that place's main narrative track.
- Structural events MUST be visible in the default timeline view.
- Trivia MUST remain tied to specific place and time, never detached clickbait.
- Every new content type MUST define how it expresses place, dynasty, and
  significance.

## Workflow and Quality Gates

All planning and implementation work MUST pass these gates:

- Spec documents MUST state the geographic entry point, dynastic structure, and
  target reading mode impact.
- Plans MUST explain how advanced interaction supports comprehension rather than
  visual novelty alone.
- Tasks MUST include provenance, content modeling, and experience validation work
  whenever historical content or immersive UI changes are introduced.
- Reviews MUST reject features that weaken place-based entry, chronology, source
  traceability, or progressive-depth discipline.
- Before claiming completion, the team MUST verify both functional behavior and
  constitutional alignment.

## Governance

This constitution overrides conflicting local habits and acts as the project's
highest product-direction authority. Amendments require an updated design or
project rationale, a documented impact review across templates and guidance
files, and approval from the current project owner. Versioning follows semantic
versioning: MAJOR for breaking principle changes, MINOR for new principles or
materially expanded governance, and PATCH for clarifications that do not change
behavior. Every review, plan, and implementation milestone MUST include a brief
constitution compliance check.

**Version**: 1.0.0 | **Ratified**: 2026-04-23 | **Last Amended**: 2026-04-23
