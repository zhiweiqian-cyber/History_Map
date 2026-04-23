# Implementation Plan: Interactive China History Chronicle

**Branch**: `001-china-history-chronicle` | **Date**: 2026-04-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-china-history-chronicle/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See
`.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a desktop-first historical web experience where users enter Chinese
history through a national map, drill into provinces and featured cities, and
read the same place-aware content through timeline, roam, and card views. The
implementation will use a static-content-first frontend architecture so the team
can ship the province skeleton and flagship deep dives without waiting on a
backend platform.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: React 19, Vite 6, React Router 7, MapLibre GL JS,
Motion, Zod  
**Storage**: Versioned JSON content files in-repo for provinces, cities,
events, trivia, and source metadata  
**Testing**: Vitest, React Testing Library, Playwright, schema validation tests  
**Target Platform**: Modern desktop web with responsive fallback  
**Project Type**: Single frontend web application with static content pipeline  
**Performance Goals**: Homepage interactive in under 3 seconds on supported
desktop hardware; map pan and timeline transitions stay visually smooth; key
view transitions target 55+ fps on supported desktops  
**Constraints**: Historically grounded interface, source traceability for all
released facts, progressive-depth content strategy, graceful skeleton-only
states, no backend dependency for v1  
**Scale/Scope**: Province-level national skeleton, 5-8 flagship city deep dives,
hundreds of events/trivia items, three coordinated view modes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Geography-first entry is explicit: the feature states which place-based entry
  point it adds or changes and why that improves historical understanding.
- Dynastic spine remains legible: timeline and chronology implications are
  documented even when the feature is map-led, roam-led, or card-led.
- Interaction supports comprehension: advanced motion, spatial effects, or
  immersive UI choices are justified by learning value rather than novelty.
- Source integrity is covered: historical content changes define provenance,
  uncertainty handling, and editorial review requirements.
- Progressive depth is preserved: the plan explains why the feature fits the
  national skeleton plus flagship-depth scope model without overloading v1.

**Gate Result**: PASS. The selected architecture keeps geography-first entry,
dynastic legibility, immersive UI rationale, and provenance enforcement aligned
with the constitution.

## Project Structure

### Documentation (this feature)

```text
specs/001-china-history-chronicle/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
`-- tasks.md
```

### Source Code (repository root)

```text
frontend/
|-- index.html
|-- package.json
|-- tsconfig.json
|-- vite.config.ts
|-- src/
|   |-- app/
|   |   |-- App.tsx
|   |   `-- router.tsx
|   |-- components/
|   |   |-- layout/
|   |   |-- map/
|   |   |-- timeline/
|   |   |-- roam/
|   |   `-- cards/
|   |-- features/
|   |   |-- home/
|   |   |-- province/
|   |   |-- city/
|   |   `-- hometown/
|   |-- lib/
|   |   |-- content/
|   |   |-- schema/
|   |   `-- state/
|   |-- styles/
|   `-- main.tsx
`-- tests/
    |-- unit/
    |-- integration/
    `-- e2e/

content/
|-- provinces/
|-- cities/
|-- events/
|-- trivia/
`-- sources/
```

**Structure Decision**: Use one frontend app plus an in-repo content directory.
This keeps v1 simple, preserves a clean separation between experience code and
historical data, and makes provenance validation possible during build and test.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | - | - |
