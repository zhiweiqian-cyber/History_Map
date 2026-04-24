import { describe, expect, it } from "vitest";

import {
  createLimitedContentModel,
  requireProvinceSkeleton,
  resolveDynastySegmentId,
} from "../../src/lib/content/contentGuards";

describe("contentGuards", () => {
  it("returns the requested dynasty segment when it exists", () => {
    expect(
      resolveDynastySegmentId({
        requestedId: "shaanxi-ming",
        availableIds: ["shaanxi-han", "shaanxi-ming"],
      }),
    ).toBe("shaanxi-ming");
  });

  it("falls back to the first available dynasty segment", () => {
    expect(
      resolveDynastySegmentId({
        requestedId: "missing",
        availableIds: ["shaanxi-han", "shaanxi-ming"],
      }),
    ).toBe("shaanxi-han");
  });

  it("creates a limited-content model with a next-step prompt", () => {
    expect(
      createLimitedContentModel({
        placeName: "Gansu",
        heroSummary: "A frontier corridor linking interior and western routes.",
        promptHref: "/",
        promptLabel: "Return to the national map",
      }),
    ).toEqual({
      title: "Gansu",
      summary: "A frontier corridor linking interior and western routes.",
      promptHref: "/",
      promptLabel: "Return to the national map",
    });
  });

  it("rejects a province skeleton missing summary, map link, or dynastic spine", () => {
    expect(() =>
      requireProvinceSkeleton({
        id: "gansu",
        name: "Gansu",
        hero_summary: "",
        map_shape_ref: "",
        dynasty_segment_ids: [],
        source_ids: [],
      }),
    ).toThrow("Province skeleton is incomplete for gansu");
  });
});
