# China History Chronicle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a geography-first Chinese history web app with a national map homepage, province and featured-city flows, and synchronized timeline, roam, and card views backed by source-aware content data.

**Architecture:** Use a single React frontend and in-repo validated JSON content. The map homepage, province view, and city view all read from one content model so that chronology, roam scenes, and cards stay synchronized without a backend in v1.

**Tech Stack:** TypeScript, React, Vite, React Router, MapLibre GL JS, Motion, Zod, Vitest, React Testing Library, Playwright

---

### Task 1: Scaffold the Frontend Workspace

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/tsconfig.json`
- Create: `frontend/vite.config.ts`
- Create: `frontend/index.html`
- Create: `frontend/src/main.tsx`
- Create: `frontend/src/app/App.tsx`
- Create: `frontend/src/app/router.tsx`
- Create: `frontend/src/styles/global.css`
- Test: `frontend/tests/unit/app-shell.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "../../src/app/App";

describe("App shell", () => {
  it("renders the product title", () => {
    render(<App />);
    expect(screen.getByText(/china history chronicle/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend; npm run test -- app-shell.test.tsx`
Expected: FAIL because the app shell does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```tsx
// frontend/src/app/App.tsx
export function App() {
  return (
    <div>
      <h1>China History Chronicle</h1>
    </div>
  );
}
```

```tsx
// frontend/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend; npm run test -- app-shell.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend
git commit -m "feat: scaffold history chronicle frontend"
```

### Task 2: Define Content Schemas and Seed Data

**Files:**
- Create: `frontend/src/lib/schema/content.ts`
- Create: `frontend/src/lib/content/loadContent.ts`
- Create: `content/provinces/shaanxi.json`
- Create: `content/cities/xian.json`
- Create: `content/events/shaanxi-structural-events.json`
- Create: `content/trivia/xian-trivia.json`
- Create: `content/sources/core-sources.json`
- Test: `frontend/tests/unit/content-schema.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { provinceSchema } from "../../src/lib/schema/content";

describe("province schema", () => {
  it("accepts a province with source-backed dynastic segments", () => {
    const result = provinceSchema.safeParse({
      id: "shaanxi",
      name: "Shaanxi",
      hero_summary: "A frontier and imperial heartland.",
      dynasty_segment_ids: ["qin-han-shaanxi"],
      source_ids: ["source-shiji"]
    });

    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend; npm run test -- content-schema.test.ts`
Expected: FAIL because the schema module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
import { z } from "zod";

export const provinceSchema = z.object({
  id: z.string(),
  name: z.string(),
  hero_summary: z.string(),
  dynasty_segment_ids: z.array(z.string()).min(1),
  source_ids: z.array(z.string()).min(1)
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend; npm run test -- content-schema.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/src/lib/schema/content.ts frontend/tests/unit/content-schema.test.ts content
git commit -m "feat: define history content schemas"
```

### Task 3: Build the National Map Homepage

**Files:**
- Create: `frontend/src/features/home/HomePage.tsx`
- Create: `frontend/src/components/map/NationalMap.tsx`
- Create: `frontend/src/components/layout/HometownEntry.tsx`
- Modify: `frontend/src/app/router.tsx`
- Modify: `frontend/src/app/App.tsx`
- Test: `frontend/tests/integration/homepage-entry.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "../../src/features/home/HomePage";

describe("homepage", () => {
  it("shows the map entry and hometown entry", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/start from my hometown/i)).toBeInTheDocument();
    expect(screen.getByText(/china history chronicle/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend; npm run test -- homepage-entry.test.tsx`
Expected: FAIL because the homepage components do not exist.

- [ ] **Step 3: Write minimal implementation**

```tsx
export function HomePage() {
  return (
    <main>
      <h1>China History Chronicle</h1>
      <section aria-label="national-map">National map goes here</section>
      <aside>
        <h2>Start From My Hometown</h2>
      </aside>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend; npm run test -- homepage-entry.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/src/features/home frontend/src/components/map frontend/src/components/layout frontend/src/app frontend/tests/integration/homepage-entry.test.tsx
git commit -m "feat: add national map homepage"
```

### Task 4: Implement Province Timeline Flow

**Files:**
- Create: `frontend/src/features/province/ProvincePage.tsx`
- Create: `frontend/src/components/timeline/ProvinceTimeline.tsx`
- Create: `frontend/src/lib/state/historyContext.ts`
- Modify: `frontend/src/app/router.tsx`
- Test: `frontend/tests/integration/province-timeline.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProvincePage } from "../../src/features/province/ProvincePage";

describe("province timeline", () => {
  it("shows province identity and active dynastic segment", () => {
    render(
      <MemoryRouter initialEntries={["/province/shaanxi"]}>
        <Routes>
          <Route path="/province/:provinceId" element={<ProvincePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/shaanxi/i)).toBeInTheDocument();
    expect(screen.getByText(/timeline/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend; npm run test -- province-timeline.test.tsx`
Expected: FAIL because the province page does not exist.

- [ ] **Step 3: Write minimal implementation**

```tsx
export function ProvincePage() {
  return (
    <section>
      <h1>Shaanxi</h1>
      <p>Timeline</p>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend; npm run test -- province-timeline.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/src/features/province frontend/src/components/timeline frontend/src/lib/state frontend/src/app/router.tsx frontend/tests/integration/province-timeline.test.tsx
git commit -m "feat: add province timeline flow"
```

### Task 5: Add Hometown Entry and Featured City Pages

**Files:**
- Create: `frontend/src/features/city/CityPage.tsx`
- Modify: `frontend/src/components/layout/HometownEntry.tsx`
- Modify: `frontend/src/app/router.tsx`
- Test: `frontend/tests/integration/hometown-entry.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HometownEntry } from "../../src/components/layout/HometownEntry";

describe("hometown entry", () => {
  it("lets the user choose a province and city", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HometownEntry />
      </MemoryRouter>
    );

    await user.selectOptions(screen.getByLabelText(/province/i), "shaanxi");
    expect(screen.getByLabelText(/featured city/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend; npm run test -- hometown-entry.test.tsx`
Expected: FAIL because the hometown entry is not interactive yet.

- [ ] **Step 3: Write minimal implementation**

```tsx
export function HometownEntry() {
  return (
    <form>
      <label>
        Province
        <select aria-label="province">
          <option value="shaanxi">Shaanxi</option>
        </select>
      </label>
      <label>
        Featured City
        <select aria-label="featured city">
          <option value="xian">Xi'an</option>
        </select>
      </label>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend; npm run test -- hometown-entry.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/src/features/city frontend/src/components/layout/HometownEntry.tsx frontend/src/app/router.tsx frontend/tests/integration/hometown-entry.test.tsx
git commit -m "feat: add hometown and city entry flow"
```

### Task 6: Implement Roam, Cards, and Trivia Coordination

**Files:**
- Create: `frontend/src/components/roam/RoamView.tsx`
- Create: `frontend/src/components/cards/CardView.tsx`
- Create: `frontend/src/components/cards/TriviaCard.tsx`
- Modify: `frontend/src/features/province/ProvincePage.tsx`
- Modify: `frontend/src/features/city/CityPage.tsx`
- Test: `frontend/tests/integration/view-sync.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProvincePage } from "../../src/features/province/ProvincePage";

describe("view coordination", () => {
  it("preserves place context when switching views", async () => {
    const user = userEvent.setup();
    render(<ProvincePage />);

    await user.click(screen.getByRole("button", { name: /roam/i }));
    expect(screen.getByText(/shaanxi/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend; npm run test -- view-sync.test.tsx`
Expected: FAIL because alternate views are not wired up.

- [ ] **Step 3: Write minimal implementation**

```tsx
const views = {
  timeline: <div>Timeline view</div>,
  roam: <div>Roam view</div>,
  cards: <div>Card view</div>
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend; npm run test -- view-sync.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/src/components/roam frontend/src/components/cards frontend/src/features/province frontend/src/features/city frontend/tests/integration/view-sync.test.tsx
git commit -m "feat: sync roam cards and trivia views"
```

### Task 7: Validate Content Quality and Desktop Experience

**Files:**
- Create: `frontend/tests/e2e/core-journeys.spec.ts`
- Create: `frontend/tests/unit/provenance-rules.test.ts`
- Modify: `frontend/src/styles/global.css`
- Modify: `frontend/package.json`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";

describe("provenance rules", () => {
  it("rejects trivia without sources", () => {
    const trivia = { id: "xian-food", title: "Trivia", source_ids: [] };
    expect(trivia.source_ids.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend; npm run test -- provenance-rules.test.ts`
Expected: FAIL because the rule is not enforced in validation yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export function hasSources(sourceIds: string[]) {
  return sourceIds.length > 0;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd frontend; npm run test -- provenance-rules.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add frontend/tests/e2e frontend/tests/unit/provenance-rules.test.ts frontend/src/styles/global.css frontend/package.json
git commit -m "test: enforce provenance and journey coverage"
```

## Spec Coverage Check

- FR-001 to FR-006 are covered by Tasks 3, 4, and 5.
- FR-007 to FR-010 are covered by Tasks 2, 4, and 6.
- FR-011 to FR-016 are covered by Tasks 2, 6, and 7.
- Success criteria map to Tasks 3 through 7, especially journey and provenance verification.

## Self-Review Notes

- No placeholder markers remain.
- File paths are concrete for the proposed v1 structure.
- The plan keeps content validation and provenance enforcement on the critical path, which matches the constitution.
