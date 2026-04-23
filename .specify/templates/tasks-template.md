---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories),
research.md, data-model.md, contracts/

**Tests**: Include tests when the feature specification requires them.

**Organization**: Tasks are grouped by user story so each slice can be built,
validated, and demonstrated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize framework, build tooling, and content-loading infrastructure
- [ ] T003 [P] Configure linting, formatting, and baseline testing tools

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can
be implemented

- [ ] T004 Define geography, dynasty, event, place-node, trivia, and
      source-reference models
- [ ] T005 [P] Establish provenance and editorial validation flow for historical
      content
- [ ] T006 [P] Create the shared interaction and motion system for map,
      timeline, and cards
- [ ] T007 Create base layout and navigation for national map, province pages,
      and city pages
- [ ] T008 Configure performance and error monitoring for immersive desktop
      interactions
- [ ] T009 Define content ingestion or seed-data conventions for the province
      skeleton

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - [Title] (Priority: P1)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL)

- [ ] T010 [P] [US1] Add journey test for the primary place-based entry path
- [ ] T011 [P] [US1] Add state test for selected place and dynasty context

### Implementation for User Story 1

- [ ] T012 [P] [US1] Implement the national map entry experience
- [ ] T013 [P] [US1] Add province-level data loading and summary presentation
- [ ] T014 [US1] Connect province selection to the default timeline experience
- [ ] T015 [US1] Implement place and dynasty state management for the MVP flow
- [ ] T016 [US1] Add loading, empty, and incomplete-coverage states
- [ ] T017 [US1] Add instrumentation for map-entry and province-entry usage

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL)

- [ ] T018 [P] [US2] Add journey test for the roam experience
- [ ] T019 [P] [US2] Add regression test for timeline-to-roam context handoff

### Implementation for User Story 2

- [ ] T020 [P] [US2] Implement roam view scenes, stops, or transitions
- [ ] T021 [US2] Implement shared event-to-place mapping for roam and timeline
- [ ] T022 [US2] Add historically grounded motion, materials, and transitions
- [ ] T023 [US2] Integrate roam view with the selected place and dynasty context

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL)

- [ ] T024 [P] [US3] Add test coverage for card browsing and trivia reveal
- [ ] T025 [P] [US3] Add verification for provenance or uncertainty display

### Implementation for User Story 3

- [ ] T026 [P] [US3] Implement card view for events, people, artifacts, and trivia
- [ ] T027 [US3] Add source and uncertainty display affordances where required
- [ ] T028 [US3] Implement hometown module entry and its handoff into province
      and city flows

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Historical content review and provenance audit
- [ ] TXXX Performance optimization across map, timeline, and roam interactions
- [ ] TXXX [P] Additional tests for chronology accuracy and navigation state
- [ ] TXXX Motion polish review against the historical tone guidelines
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

- Setup precedes Foundational.
- Foundational blocks all user stories.
- User stories may proceed in priority order or in parallel after foundation is ready.
- Each story must remain independently testable.
- Cross-cutting polish happens after desired stories are complete.

## Notes

- Include provenance-related work whenever historical content changes.
- Include experience validation whenever map, motion, or immersive UI changes.
- Avoid tasks that mix unrelated user stories in one file-heavy change.
