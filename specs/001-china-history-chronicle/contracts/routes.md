# Route Contract

## Purpose

Define the user-visible route structure and the invariants each route must keep.

## Routes

### `/`

**Responsibility**: National map homepage

**Must provide**:

- National map overview
- Hometown entry module
- Entry points into province pages

### `/province/:provinceId`

**Responsibility**: Province timeline default view

**Must provide**:

- Province identity
- Active dynastic segment
- Structural events for the active segment
- Navigation to roam and card views

### `/province/:provinceId/roam`

**Responsibility**: Province roam view

**Must preserve**:

- Same `provinceId`
- Same active dynastic segment as the last province context when possible

### `/province/:provinceId/cards`

**Responsibility**: Province card view

**Must preserve**:

- Same `provinceId`
- Same active dynastic segment as the last province context when possible

### `/city/:cityId`

**Responsibility**: Featured city default view

**Must provide**:

- City identity
- Parent province link
- Active dynastic segment

### `/city/:cityId/roam`

**Responsibility**: Featured city roam view

**Must preserve**:

- Same `cityId`
- Same active dynastic segment as the last city context when possible

### `/city/:cityId/cards`

**Responsibility**: Featured city card view

**Must preserve**:

- Same `cityId`
- Same active dynastic segment as the last city context when possible

## Navigation Invariants

- View switching must not silently change the active place.
- Users must always be able to navigate city -> province -> national map.
- Skeleton-only provinces must still resolve to a valid route state with a
  meaningful limited-content presentation.
