interface InteractionMetricsState {
  mapEntrySelections: number;
  homepageVisits: number;
}

const interactionMetricsState: InteractionMetricsState = {
  mapEntrySelections: 0,
  homepageVisits: 0,
};

export function recordHomepageVisit() {
  interactionMetricsState.homepageVisits += 1;
}

export function recordMapEntrySelection() {
  interactionMetricsState.mapEntrySelections += 1;
}

export function getInteractionMetrics() {
  return { ...interactionMetricsState };
}
