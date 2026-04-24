import cityIndex from "../../../../content/cities/flagship-index.json";
import cityEventIndex from "../../../../content/events/flagship-city-events.json";
import eventIndex from "../../../../content/events/province-structural-events.json";
import provinceIndex from "../../../../content/provinces/index.json";
import citySegmentIndex from "../../../../content/segments/flagship-city-segments.json";
import segmentIndex from "../../../../content/segments/province-segments.json";
import sourceIndex from "../../../../content/sources/index.json";
import triviaIndex from "../../../../content/trivia/flagship-city-trivia.json";

import { type ChronicleContent, validateChronicleContent } from "./validateContent";

export function loadChronicleContent(): ChronicleContent {
  return validateChronicleContent({
    provinces: provinceIndex.provinces,
    cities: cityIndex.cities,
    segments: [...segmentIndex.segments, ...citySegmentIndex.segments],
    events: [...eventIndex.events, ...cityEventIndex.events],
    trivia: triviaIndex.trivia,
    sources: sourceIndex.sources,
  });
}

export function getProvinceById(provinceId: string) {
  return loadChronicleContent().provinces.find(
    (province) => province.id === provinceId,
  );
}

export function getFlagshipCityById(cityId: string) {
  return loadChronicleContent().cities.find((city) => city.id === cityId);
}

export function getProvinceSegments(provinceId: string) {
  return loadChronicleContent().segments.filter(
    (segment) =>
      segment.scope_type === "province" && segment.scope_id === provinceId,
  );
}

export function getProvinceEvents(provinceId: string) {
  return loadChronicleContent().events.filter(
    (event) => event.scope_type === "province" && event.scope_id === provinceId,
  );
}

export function getProvinceBundle(provinceId: string) {
  const content = loadChronicleContent();
  const province = content.provinces.find((entry) => entry.id === provinceId);
  const segments = content.segments.filter(
    (segment) =>
      segment.scope_type === "province" && segment.scope_id === provinceId,
  );
  const events = content.events.filter(
    (event) => event.scope_type === "province" && event.scope_id === provinceId,
  );

  return {
    province,
    segments,
    events,
  };
}

export function getFlagshipCitiesForProvince(provinceId: string) {
  return loadChronicleContent().cities.filter((city) => city.province_id === provinceId);
}

export function getCityBundle(cityId: string) {
  const content = loadChronicleContent();
  const city = content.cities.find((entry) => entry.id === cityId);
  const province = city
    ? content.provinces.find((entry) => entry.id === city.province_id)
    : undefined;
  const segments = content.segments.filter(
    (segment) => segment.scope_type === "city" && segment.scope_id === cityId,
  );
  const events = content.events.filter(
    (event) => event.scope_type === "city" && event.scope_id === cityId,
  );
  const trivia = content.trivia.filter(
    (item) => item.scope_type === "city" && item.scope_id === cityId,
  );

  return {
    city,
    province,
    segments,
    events,
    trivia,
  };
}
