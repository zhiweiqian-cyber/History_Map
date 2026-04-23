---

description: "Task list for Interactive China History Chronicle implementation"
---

# Tasks: Interactive China History Chronicle

**Input**: Design documents from `/specs/001-china-history-chronicle/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Validation tasks are included because the current spec now requires
route coverage, province-skeleton completeness, provenance validation, and
first-impression verification before release.

**Organization**: Tasks are grouped by user story so each slice can be built,
validated, and demonstrated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline workspace setup

- [ ] T001 Create the frontend workspace files in `frontend/package.json`, `frontend/tsconfig.json`, `frontend/vite.config.ts`, and `frontend/index.html`
- [ ] T002 Create the application entry files in `frontend/src/main.tsx`, `frontend/src/app/App.tsx`, and `frontend/src/app/router.tsx`
- [ ] T003 [P] Create baseline styling and tooling files in `frontend/src/styles/global.css`, `frontend/.eslintrc.cjs`, and `frontend/.prettierrc`
- [ ] T004 [P] Configure the test stack in `frontend/vitest.config.ts`, `frontend/playwright.config.ts`, and `frontend/tests/setup.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T005 Define content schemas in `frontend/src/lib/schema/content.ts` for province, city, dynasty segment, event, place node, trivia, person, and source records
- [ ] T006 [P] Implement content loading and validation helpers in `frontend/src/lib/content/loadContent.ts` and `frontend/src/lib/content/validateContent.ts`
- [ ] T007 [P] Add province geometry assets and loaders in `content/geo/provinces.geojson` and `frontend/src/lib/content/loadGeometry.ts`
- [ ] T008 Create the province skeleton manifest in `content/provinces/index.json` with one province record per shipped province-level map region
- [ ] T009 [P] Create the locked flagship city manifest in `content/cities/flagship-index.json` for Beijing, Xi'an, Chengdu, Hangzhou, and Guangzhou
- [ ] T010 Create shared history context state in `frontend/src/lib/state/historyContext.ts` to preserve place, view mode, and dynastic segment selection
- [ ] T011 [P] Create shared layout and design tokens in `frontend/src/components/layout/AppShell.tsx`, `frontend/src/styles/tokens.css`, and `frontend/src/styles/motion.css`
- [ ] T012 Create route-safe content guards and limited-state helpers in `frontend/src/lib/content/contentGuards.ts` and `frontend/src/components/layout/LimitedContentState.tsx`
- [ ] T013 [P] Add foundational schema and geometry validation tests in `frontend/tests/unit/content-schema.test.ts` and `frontend/tests/unit/province-geometry.test.ts`
- [ ] T050 Create province dynastic segment records in `content/segments/province-segments.json` for every province-level region in the shipped map dataset
- [ ] T051 Create province structural event records in `content/events/province-structural-events.json` for the national skeleton timeline
- [ ] T052 [P] Create the shared source registry in `content/sources/index.json` covering province skeleton and flagship city content

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Enter History Through the Map (Priority: P1) MVP

**Goal**: Let users enter the experience from a national map and reach a province timeline with clear place and dynastic context

**Independent Test**: Open `/`, select a province, land on `/province/:provinceId`, and verify the province identity plus active dynastic segment are obvious without using any city flow

### Implementation for User Story 1

- [ ] T014 [P] [US1] Add homepage and province route tests in `frontend/tests/integration/homepage-map-entry.test.tsx` and `frontend/tests/integration/province-route.test.tsx`
- [ ] T015 [P] [US1] Create the homepage screen in `frontend/src/features/home/HomePage.tsx`
- [ ] T016 [P] [US1] Implement the national map component in `frontend/src/components/map/NationalMap.tsx`
- [ ] T017 [US1] Wire the homepage and province default routes in `frontend/src/app/router.tsx` and `frontend/src/app/App.tsx`
- [ ] T018 [P] [US1] Create the province screen in `frontend/src/features/province/ProvincePage.tsx`
- [ ] T019 [P] [US1] Implement the province timeline component in `frontend/src/components/timeline/ProvinceTimeline.tsx`
- [ ] T020 [US1] Connect map selection to province loading in `frontend/src/features/home/HomePage.tsx` and `frontend/src/lib/state/historyContext.ts`
- [ ] T021 [US1] Add province summary, dynastic segment switching, and major event display in `frontend/src/features/province/ProvincePage.tsx` and `frontend/src/components/timeline/ProvinceTimeline.tsx`
- [ ] T022 [US1] Add empty, loading, and skeleton-only province states in `frontend/src/features/province/ProvincePage.tsx` and `frontend/src/components/layout/LimitedContentState.tsx`
- [ ] T023 [US1] Add homepage first-impression validation protocol in `frontend/tests/e2e/homepage-first-impression.spec.ts` and `specs/001-china-history-chronicle/quickstart.md`
- [ ] T024 [US1] Add map-entry usage instrumentation in `frontend/src/lib/state/interactionMetrics.ts`

---

## Phase 4: User Story 2 - Start From My Hometown (Priority: P2)

**Goal**: Let users choose a province and featured city from a hometown module and enter a city-level history experience with orientation preserved

**Independent Test**: Open `/`, use the hometown module to choose a province and featured city, land on `/city/:cityId`, and navigate back to province and national map without losing orientation

### Implementation for User Story 2

- [ ] T025 [P] [US2] Add hometown and city route tests in `frontend/tests/integration/hometown-entry.test.tsx` and `frontend/tests/integration/city-route.test.tsx`
- [ ] T026 [P] [US2] Create the hometown entry module in `frontend/src/components/layout/HometownEntry.tsx`
- [ ] T027 [US2] Integrate the hometown entry module into `frontend/src/features/home/HomePage.tsx`
- [ ] T028 [P] [US2] Create the featured city screen in `frontend/src/features/city/CityPage.tsx`
- [ ] T029 [P] [US2] Create city-level summary and dynastic hero components in `frontend/src/components/layout/CityHero.tsx` and `frontend/src/components/timeline/CityTimeline.tsx`
- [ ] T030 [US2] Wire province-to-city and city-to-province navigation in `frontend/src/app/router.tsx` and `frontend/src/components/layout/Breadcrumbs.tsx`
- [ ] T031 [US2] Connect hometown selection state to city loading in `frontend/src/lib/state/historyContext.ts` and `frontend/src/features/city/CityPage.tsx`
- [ ] T032 [US2] Add limited-state handling for provinces without featured cities in `frontend/src/components/layout/HometownEntry.tsx` and `frontend/src/components/layout/LimitedContentState.tsx`
- [ ] T033 [US2] Author the five flagship city content records, dynastic segments, events, trivia, and source references in `content/cities/flagship-index.json`, `content/segments/flagship-city-segments.json`, `content/events/flagship-city-events.json`, `content/trivia/flagship-city-trivia.json`, and `content/sources/index.json`

---

## Phase 5: User Story 3 - Explore Through Roam, Cards, and Trivia (Priority: P3)

**Goal**: Let users switch among timeline, roam, and card views while preserving the same place and dynastic context, including premium trivia and source-aware details

**Independent Test**: Open a province or city page, switch among timeline, roam, and cards, and confirm the same place and dynastic segment remain active while trivia and source-aware details stay attached to the right content

### Implementation for User Story 3

- [ ] T034 [P] [US3] Add dedicated route tests for province and city roam/cards views in `frontend/tests/integration/view-route-sync.test.tsx`
- [ ] T035 [P] [US3] Create the roam view component in `frontend/src/components/roam/RoamView.tsx`
- [ ] T036 [P] [US3] Create the card view component in `frontend/src/components/cards/CardView.tsx`
- [ ] T037 [P] [US3] Create the trivia and source detail components in `frontend/src/components/cards/TriviaCard.tsx` and `frontend/src/components/cards/SourceDetail.tsx`
- [ ] T038 [US3] Add dedicated province and city roam/cards routes in `frontend/src/app/router.tsx`
- [ ] T039 [US3] Add view-switching controls to `frontend/src/features/province/ProvincePage.tsx` and `frontend/src/features/city/CityPage.tsx`
- [ ] T040 [US3] Connect roam view to place nodes and active dynastic segments in `frontend/src/components/roam/RoamView.tsx` and `frontend/src/lib/state/historyContext.ts`
- [ ] T041 [US3] Connect card view to events, people, and trivia items in `frontend/src/components/cards/CardView.tsx` and `frontend/src/lib/content/loadContent.ts`
- [ ] T042 [US3] Surface source metadata and uncertainty affordances in `frontend/src/components/cards/SourceDetail.tsx` and `frontend/src/components/layout/UncertaintyNote.tsx`
- [ ] T043 [US3] Add historically grounded motion and transitions for timeline, roam, and cards in `frontend/src/styles/motion.css` and `frontend/src/components/layout/AppShell.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T044 [P] Update delivery and usage notes in `specs/001-china-history-chronicle/quickstart.md` and `docs/superpowers/plans/2026-04-23-china-history-chronicle-execution-log.md`
- [ ] T045 Run a provenance audit against `content/provinces/`, `content/cities/`, `content/events/`, `content/trivia/`, and `content/sources/`
- [ ] T046 Run a province skeleton completeness audit against `content/provinces/index.json` and `content/geo/provinces.geojson`
- [ ] T047 Optimize rendering and loading behavior in `frontend/src/components/map/NationalMap.tsx`, `frontend/src/components/timeline/ProvinceTimeline.tsx`, and `frontend/src/components/roam/RoamView.tsx`
- [ ] T048 Validate the main journeys and dedicated routes from `specs/001-china-history-chronicle/quickstart.md` and record results in `docs/superpowers/plans/2026-04-23-china-history-chronicle-execution-log.md`
- [ ] T049 Review final motion, typography, limited-state quality, and historical tone alignment in `frontend/src/styles/tokens.css`, `frontend/src/styles/global.css`, `frontend/src/styles/motion.css`, and `frontend/src/components/layout/LimitedContentState.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 must finish before Phase 2.
- Phase 2 blocks all user-story work.
- Phase 3 is the MVP and should finish before broader feature expansion.
- Phase 4 depends on shared routing, content loading, and place state from Phases 1-3.
- Phase 5 depends on the place-state and page structure built in Phases 2-4.
- Phase 6 depends on the desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational and delivers the first usable slice.
- **US2 (P2)**: Starts after US1 route and state patterns are established.
- **US3 (P3)**: Starts after US1 page structure exists and benefits from US2 city-level navigation.

### Parallel Opportunities

- T003-T004 can run in parallel with T001-T002.
- T006, T007, T009, T011, T013, and T052 can run in parallel after T005 is defined.
- Within US1, T014-T016 and T018-T019 can run in parallel before integration tasks.
- Within US2, T025-T029 can run in parallel before wiring tasks.
- Within US3, T034-T037 can run in parallel before route and synchronization tasks.

---

## Parallel Example: User Story 1

```bash
Task: "T015 [US1] Create the homepage screen in frontend/src/features/home/HomePage.tsx"
Task: "T016 [US1] Implement the national map component in frontend/src/components/map/NationalMap.tsx"
Task: "T018 [US1] Create the province screen in frontend/src/features/province/ProvincePage.tsx"
Task: "T019 [US1] Implement the province timeline component in frontend/src/components/timeline/ProvinceTimeline.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "T026 [US2] Create the hometown entry module in frontend/src/components/layout/HometownEntry.tsx"
Task: "T028 [US2] Create the featured city screen in frontend/src/features/city/CityPage.tsx"
Task: "T029 [US2] Create city-level summary and dynastic hero components in frontend/src/components/layout/CityHero.tsx and frontend/src/components/timeline/CityTimeline.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "T035 [US3] Create the roam view component in frontend/src/components/roam/RoamView.tsx"
Task: "T036 [US3] Create the card view component in frontend/src/components/cards/CardView.tsx"
Task: "T037 [US3] Create the trivia and source detail components in frontend/src/components/cards/TriviaCard.tsx and frontend/src/components/cards/SourceDetail.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup
2. Complete Foundational
3. Complete User Story 1
4. Validate the homepage-to-province journey
5. Stop and review before expanding scope

### Incremental Delivery

1. Deliver US1 as the first usable history experience
2. Add US2 to unlock hometown and featured-city emotional entry
3. Add US3 to deepen immersion through roam, cards, and premium trivia
4. Finish with provenance, performance, and historical-tone polish

### Suggested Initial Implementation Slice

If you want the fastest safe start, begin with:

- T001-T013
- T050-T052
- T014-T024

That slice gives you the first real product loop: national map -> province page -> dynastic timeline.

---

## Notes

- Total tasks: 52
- Suggested MVP scope: T001-T024 plus T050-T052
- Keep the execution log updated after each subagent task batch in `docs/superpowers/plans/2026-04-23-china-history-chronicle-execution-log.md`
- Do not start parallel implementation before shared state and schema rules are stable
