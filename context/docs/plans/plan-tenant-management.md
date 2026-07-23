# Tenant Management — Implementation Plan

## Overview

Build the full CRUD UI and API layer for Tenant, Flat, Gas Meter, Electric Meter, and Rent Transaction entities. All database models already exist in Prisma with migrations applied. The sidebar has placeholder menu items but no pages exist yet.

## Architecture

Follows the established pattern: **Pages → Components → Stores → Services → Axios → API Routes → Prisma**

## Phase 0: Axios Setup

- Install `axios`, create Nuxt plugin `app/plugins/axios.ts` with baseURL and interceptors
- Migrate existing `authService.ts` from `$fetch` to Axios

## Phase 1: API Routes (20 files under `server/api/`)

CRUD endpoints for all 5 entities. Every list endpoint uses `Promise.all([findMany, count])` with Prisma `include` to prevent N+1 queries. Decimal/BigInt values are serialized to Number.

```
server/api/tenant/index.get.ts        # List + search + pagination
server/api/tenant/index.post.ts       # Create
server/api/tenant/[id].get.ts         # Detail with relations
server/api/tenant/[id].put.ts         # Update
server/api/tenant/[id].delete.ts      # Delete

server/api/flat/index.get.ts
server/api/flat/index.post.ts
server/api/flat/[id].get.ts
server/api/flat/[id].put.ts
server/api/flat/[id].delete.ts

server/api/gas-meter/index.get.ts
server/api/gas-meter/index.post.ts
server/api/gas-meter/[id].get.ts
server/api/gas-meter/[id].put.ts
server/api/gas-meter/[id].delete.ts

server/api/electric-meter/index.get.ts
server/api/electric-meter/index.post.ts
server/api/electric-meter/[id].get.ts
server/api/electric-meter/[id].put.ts
server/api/electric-meter/[id].delete.ts

server/api/rent-transaction/index.get.ts
server/api/rent-transaction/index.post.ts
server/api/rent-transaction/[id].get.ts
```

### N+1 Prevention

- Tenant list: `include: { user: true, flat: { include: { electricMeter: true, gasMeter: true } } }`
- Tenant detail: includes user, flat with meters, rentTransactions with receivedBy — all in one query
- Flat list: `include: { electricMeter: true, gasMeter: true, tenant: { include: { user: true } } }`
- RentTransaction list: `include: { tenant: { include: { user: true, flat: true } }, receivedBy: true }`
- Never loop over results to fetch relations

## Phase 2: Services (5 files under `app/services/`)

Plain object pattern using Axios instance. Each: `list()`, `getById()`, `create()`, `update()`, `remove()`.

## Phase 3: Pinia Stores (5 files under `app/stores/`)

Setup store pattern. Each manages loading, error, entity list, current entity, pagination state. Actions with Ant message notifications.

## Phase 4: Shared Components (2 files)

- **PageHeader.vue** — title, back button, add button
- **DataTable.vue** — reusable table with search, filter, pagination, action column slots

## Phase 5: Form Components (5 files under `app/components/rent/`)

Each form: `isEdit` prop, `initialData` prop, emits `submit`/`cancel`. Fields derived from Prisma schema.

## Phase 6: Pages (18 files under `app/pages/rent/`)

Each entity: `index.vue` (list), `add.vue` (create), `edit-[id].vue` (update), `[id].vue` (detail). Rent Transaction: list + add only (immutable).

```
app/pages/rent/tenants/{index,add,edit-[id],[id]}.vue
app/pages/rent/flats/{index,add,edit-[id],[id]}.vue
app/pages/rent/gas-meters/{index,add,edit-[id],[id]}.vue
app/pages/rent/electric-meters/{index,add,edit-[id],[id]}.vue
app/pages/rent/rent-collection/{index,add}.vue
```

Tenant detail page uses `a-tabs` for inline management of related entities (Rent Transactions, Flat Info, Meters).

## Phase 7: Sidebar Update

Add "Flats", "Gas Meters", "Electric Meters" under Rent Management submenu in `DashboardSidebar.vue`.
