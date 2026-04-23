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
5. Confirm the selected province is one of the valid province-level regions in the shipped map dataset

### Journey 2: Hometown to featured city

1. Open `/`
2. Use the hometown entry module
3. Select a province and then a featured city
4. Confirm the city page opens with parent province context available
5. Confirm the city belongs to the locked flagship set for v1

### Journey 3: View coordination

1. Open a province or city page
2. Switch between timeline, roam, and cards
3. Confirm place context and dynastic context are preserved

### Journey 4: Dedicated route parity

1. Open `/province/shaanxi/roam`
2. Confirm the province remains `shaanxi`
3. Open `/province/shaanxi/cards`
4. Confirm the province remains `shaanxi`
5. Open `/city/xian/roam` and `/city/xian/cards`
6. Confirm the active place remains `xian`

### Journey 5: First-impression check

1. Show the homepage to a test user for 5 seconds
2. Hide the page
3. Ask the user what kind of product it is
4. Record whether they identify it as a map-led Chinese history experience

## Content Validation Checks

1. Run schema validation against all content files
2. Confirm every surfaced event and trivia item has source metadata
3. Confirm every province-level region in the shipped map dataset has a province skeleton record
4. Confirm skeleton-only provinces render the place title, a short historical summary, and a next-step prompt
5. Confirm surfaced province summaries, structural events, and flagship city content resolve to valid source references
6. Confirm disputed or uncertain entries surface the configured uncertainty treatment
