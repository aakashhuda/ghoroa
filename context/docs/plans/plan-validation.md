# Plan: Zod Validation Implementation

## Context

Currently, the Ghoroa platform has **zero input validation** — 29 API routes use manual `if (!field) throw createError(...)` checks, Prisma constraint violations bubble up as raw technical error messages, and there is no shared validation between frontend and backend. The coding standards already mandate "Validate all inputs with Zod," but this was never implemented.

## Phases

### Phase 1 — Install Zod + Create `shared/` Foundation

- Install `zod` as a direct dependency
- Create `shared/` directory structure with schemas, validators, errors, and types
- Nuxt 4's `#shared` alias auto-maps `shared/` — no extra config needed

```
shared/
  schemas/          # Zod schemas — safe for client + server (import only zod)
    common.schema.ts
    tenant.schema.ts
    flat.schema.ts
    electric-meter.schema.ts
    gas-meter.schema.ts
    rent-transaction.schema.ts
    auth.schema.ts
    email.schema.ts
  validators/       # Uses h3 — server only
    validate-body.ts
    validate-query.ts
    validate-params.ts
  errors/           # Uses prisma — server only
    prisma-error.ts
  types/
    api-response.ts
  index.ts
```

### Phase 2 — Build Validator Helpers + Prisma Error Handler

- `validateBody(event, schema)` — `readBody` + `safeParse`, returns typed data or throws 400 with structured errors
- `validateQuery(event, schema)` — same for `getQuery`
- `validateParams(event, schema)` — same for `getRouterParams`
- `handlePrismaError(err)` — maps P2002→409, P2025→404, P2003→400, others→400

### Phase 3 — Write Zod Schemas Per Domain

Each domain gets `*Schema` (create) + `*UpdateSchema` (partial) + `*QuerySchema` (list params) + inferred TypeScript types.

Match Prisma constraints: `@unique` fields, `Decimal(10,2)`, `BigInt` for meterNo, `DateTime` as date strings, `Json` as `z.record(z.unknown())`.

Common primitives in `common.schema.ts`: `uuidSchema`, `paginationSchema`, `idParamSchema`, `dateStringSchema`, `phoneSchema`, `decimalSchema`.

### Phase 4 — Migrate API Routes (Domain-by-Domain)

Each route: Zod import → validator call → Prisma wrapped in try/catch with `handlePrismaError`.

**Migration order (simplest → most complex):**
1. Electric Meter (5 routes)
2. Gas Meter (5 routes)
3. Rent Transaction (3 routes)
4. Flat (5 routes)
5. Tenant (5 routes)
6. Auth (2 routes)
7. Email (1 route)

### Phase 5 — Update `extractApiError` for Zod Errors

Update `app/utils/errorHandler.ts` to handle the structured `data.errors` array from Zod validation responses.

### Phase 6 — Frontend Validation Reuse

Components import schemas from `#shared/schemas/*` for client-side validation via `safeParse()`. Create `shared/utils/zod-antd.ts` helper to convert Zod schemas to Ant Design form `Rule[]`.

### Phase 7 — Business Validation in Services (Optional)

Create `server/services/` with business validation (email uniqueness, flat availability, etc.). This further thins API routes by moving Prisma queries + business checks into server-side services.

## Critical Files

| File | Role |
|---|---|
| `prisma/schema.prisma` | Source of truth for field constraints |
| `shared/schemas/common.schema.ts` | Foundation: UUID, pagination, date, phone, decimal |
| `shared/validators/validate-body.ts` | Core helper for all create/update routes |
| `shared/errors/prisma-error.ts` | Prisma → user-friendly error translator |
| `server/api/tenant/index.post.ts` | Most complex migration — pattern for all others |
| `server/api/electric-meter/index.post.ts` | Simplest migration — start here |
| `app/utils/errorHandler.ts` | Update to handle structured Zod errors |

## Verification

1. `npm run build` must pass with no type errors
2. Tenant create with missing fields → 400 with structured `{ errors: [...] }`
3. Tenant create with duplicate email → 409 with field name
4. Tenant create with non-existent flatId → 400
5. Valid tenant create → 200 with `{ success: true, data: ... }`
6. Paginated queries return correct pagination metadata
