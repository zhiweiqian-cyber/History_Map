import { describe, expect, it } from "vitest";

import {
  createInitialHistoryState,
  historyStateReducer,
} from "../../src/lib/state/historyContext";

describe("historyStateReducer", () => {
  it("starts on the national timeline view", () => {
    expect(createInitialHistoryState()).toEqual({
      scope: { kind: "national" },
      viewMode: "timeline",
      activeDynastySegmentId: null,
    });
  });

  it("preserves province and dynasty when switching view modes", () => {
    const selectedProvince = historyStateReducer(createInitialHistoryState(), {
      type: "selectProvince",
      provinceId: "shaanxi",
    });
    const selectedDynasty = historyStateReducer(selectedProvince, {
      type: "selectDynastySegment",
      dynastySegmentId: "shaanxi-ming",
    });

    const nextState = historyStateReducer(selectedDynasty, {
      type: "selectViewMode",
      viewMode: "roam",
    });

    expect(nextState).toEqual({
      scope: { kind: "province", provinceId: "shaanxi" },
      viewMode: "roam",
      activeDynastySegmentId: "shaanxi-ming",
    });
  });

  it("returns from city scope to province scope without losing the dynasty", () => {
    const cityState = historyStateReducer(createInitialHistoryState(), {
      type: "selectCity",
      provinceId: "shaanxi",
      cityId: "xian",
    });
    const withDynasty = historyStateReducer(cityState, {
      type: "selectDynastySegment",
      dynastySegmentId: "xian-tang",
    });

    const nextState = historyStateReducer(withDynasty, {
      type: "selectProvince",
      provinceId: "shaanxi",
    });

    expect(nextState).toEqual({
      scope: { kind: "province", provinceId: "shaanxi" },
      viewMode: "timeline",
      activeDynastySegmentId: "xian-tang",
    });
  });
});
