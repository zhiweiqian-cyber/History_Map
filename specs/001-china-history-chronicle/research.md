# Research: Interactive China History Chronicle

## Decision 1: Use a static-content-first frontend architecture

**Decision**: Build v1 as a single frontend application that reads versioned
historical content from repository-managed JSON files rather than from a custom
backend service.

**Rationale**: The product's first milestone is experience quality and content
shape, not account systems or operational backends. Static content files reduce
delivery risk, simplify provenance review, and make it easier to iterate on the
province skeleton plus flagship cities.

**Alternatives considered**:

- Custom backend with database: rejected for v1 because it adds operational
  overhead before the content model and UI language are stable.
- Headless CMS from day one: rejected for v1 because editorial needs are real
  but initial scale is still manageable in versioned content files.

## Decision 2: Use React + Vite for the immersive desktop UI

**Decision**: Build the application with React and Vite.

**Rationale**: The experience requires coordinated state changes across map,
timeline, roam, and cards. React offers a stable component model for this
multi-view interface, and Vite keeps iteration fast during visual work.

**Alternatives considered**:

- Server-rendered application first: rejected because the immersive interaction
  layer is primarily client-side and would still require rich client behavior.
- Vanilla JavaScript app: rejected because view-state coordination and testing
  would become harder as the experience grows.

## Decision 3: Use MapLibre GL JS for the map foundation

**Decision**: Use MapLibre GL JS as the base map and geographic rendering layer.

**Rationale**: The product needs a controllable map surface rather than a full
  GIS tool. MapLibre supports custom styling, highlighted regions, and animated
  overlays while staying aligned with a browser-first product.

**Alternatives considered**:

- SVG-only handcrafted map: rejected because province interaction, zooming, and
  richer region overlays would become brittle as scope expands.
- Full GIS-heavy stack: rejected because it would push the product toward tool
  behavior instead of curated storytelling.

## Decision 4: Validate historical content with schemas before render

**Decision**: Use Zod-backed schemas for all province, city, event, trivia, and
source content before the app loads it.

**Rationale**: The constitution requires source traceability and progressive
depth discipline. Schema validation is the cheapest way to prevent malformed
content from reaching the interface and breaking chronology or provenance rules.

**Alternatives considered**:

- Trust raw JSON without validation: rejected because content mistakes would
  surface as runtime bugs or broken historical context.
- Manual editorial checklist only: rejected because it does not provide
  enforceable guarantees in development and CI.

## Decision 5: Use layered testing instead of backend-heavy contract tests

**Decision**: Test the experience with schema validation tests, component tests,
journey-level integration tests, and a small set of Playwright flows.

**Rationale**: The highest-risk failures in v1 are broken place-state handoff,
timeline/view desynchronization, malformed content, and poor desktop journeys.
This layered strategy covers those risks directly.

**Alternatives considered**:

- E2E-only testing: rejected because failures would be slower to diagnose and
  would not catch content-model regressions early enough.
- Unit-only testing: rejected because the primary product risk is cross-view
  coordination and not isolated pure functions alone.

## Decision 6: Keep design expression in CSS variables + motion rules

**Decision**: Implement the historical visual system with custom CSS variables,
purposeful layout primitives, and a focused motion layer instead of a generic
UI kit.

**Rationale**: The product's experience depends on a distinctive tone:
advanced, cool, and historically grounded. A generic component library would
speed up scaffolding but likely flatten the product's visual identity.

**Alternatives considered**:

- Generic design-system kit: rejected because it would bias the interface
  toward standard dashboard patterns.
- Fully custom canvas/WebGL UI for every layer: rejected for v1 because it
  increases complexity more than needed for the initial release.
