import { describe, expect, it } from "vitest";

import {
  HistoricalEventSchema,
  ProvinceRecordSchema,
} from "../../src/lib/schema/content";
import { loadChronicleContent } from "../../src/lib/content/loadContent";

describe("content schemas", () => {
  it("loads the province skeleton and flagship city content bundle", () => {
    const content = loadChronicleContent();

    expect(content.provinces).toHaveLength(34);
    expect(content.cities).toHaveLength(5);
    expect(content.segments).toHaveLength(40);
    expect(content.events).toHaveLength(40);
    expect(content.trivia).toHaveLength(5);
    expect(content.sources.length).toBeGreaterThanOrEqual(11);
  });

  it("supports multi-segment province chronology for routed switching", () => {
    const content = loadChronicleContent();
    const shaanxi = content.provinces.find((province) => province.id === "shaanxi");

    expect(shaanxi?.dynasty_segment_ids).toEqual([
      "shaanxi-capital-heartland",
      "shaanxi-frontier-reorientation",
    ]);
  });

  it("requires map_shape_ref and dynastic segments on province records", () => {
    expect(() =>
      ProvinceRecordSchema.parse({
        id: "gansu",
        name: "Gansu",
        hero_summary: "A corridor province.",
        map_shape_ref: "",
        dynasty_segment_ids: [],
        source_ids: ["china-historical-atlas"],
      }),
    ).toThrow();
  });

  it("requires structural events to include an impact line", () => {
    expect(() =>
      HistoricalEventSchema.parse({
        id: "gansu-structural",
        scope_type: "province",
        scope_id: "gansu",
        dynasty_segment_id: "gansu-skeleton",
        title: "Gansu forms a western corridor",
        event_type: "structural",
        year_label: "Han to Qing",
        summary: "The corridor channels movement between interior and frontier.",
        impact_line: "",
        source_ids: ["china-historical-atlas"],
      }),
    ).toThrow();
  });

  it("fails when a province points to a missing source", async () => {
    const { validateChronicleContent } = await import(
      "../../src/lib/content/validateContent"
    );

    expect(() =>
      validateChronicleContent({
        provinces: [
          {
            id: "gansu",
            name: "Gansu",
            hero_summary: "A corridor province.",
            map_shape_ref: "gansu",
            dynasty_segment_ids: ["gansu-skeleton"],
            source_ids: ["missing-source"],
          },
        ],
        cities: [],
        segments: [
          {
            id: "gansu-skeleton",
            scope_type: "province",
            scope_id: "gansu",
            dynasty_name: "Han to Qing",
            start_year: 206,
            end_year: 1912,
            summary: "A western corridor province.",
            emphasis_level: "skeleton",
            event_ids: ["gansu-structural"],
            source_ids: ["china-historical-atlas"],
          },
        ],
        events: [
          {
            id: "gansu-structural",
            scope_type: "province",
            scope_id: "gansu",
            dynasty_segment_id: "gansu-skeleton",
            title: "Gansu forms a western corridor",
            event_type: "structural",
            year_label: "Han to Qing",
            summary: "The corridor channels movement between interior and frontier.",
            impact_line: "Explains the province's corridor identity.",
            source_ids: ["china-historical-atlas"],
          },
        ],
        trivia: [],
        sources: [
          {
            id: "china-historical-atlas",
            title: "China Historical Atlas",
            source_kind: "book",
            author_or_org: "Tan Qixiang (ed.)",
            publication_note: "multi-volume historical atlas",
            locator: "regional plates and overview maps",
            confidence_level: "high",
          },
        ],
      }),
    ).toThrow("Province gansu references missing source missing-source");
  });
});
