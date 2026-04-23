# Quickstart: Interactive China History Chronicle

## Purpose

Boot the planned application, validate the primary journeys, and confirm content
rules hold for the first release.

## Initial Setup

1. Install frontend dependencies in `frontend/`
2. Start the development server
3. Open the homepage in a desktop browser

## Primary Journey Checks

### Journey 1: National map to province

1. Open `/`
2. Select a province from the map
3. Confirm the province page opens in timeline view
4. Confirm the province name and active dynastic segment are obvious

### Journey 2: Hometown to featured city

1. Open `/`
2. Use the hometown entry module
3. Select a province and then a featured city
4. Confirm the city page opens with parent province context available

### Journey 3: View coordination

1. Open a province or city page
2. Switch between timeline, roam, and cards
3. Confirm place context and dynastic context are preserved

## Content Validation Checks

1. Run schema validation against all content files
2. Confirm every surfaced event and trivia item has source metadata
3. Confirm skeleton-only provinces render a graceful limited-content state
4. Confirm disputed or uncertain entries surface the configured uncertainty treatment
