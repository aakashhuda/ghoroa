# Validations (Zod)

## Overview

Add comprehensive Zod-based input validation across all API routes in the Ghoroa platform. Currently, 29 API routes use manual `if (!field) throw createError(...)` checks with no shared validation between frontend and backend. This feature installs Zod, creates reusable schemas in `shared/schemas/`, adds validator helpers to eliminate repetitive validation code, transforms Prisma errors into user-friendly API responses, and enables frontend reuse of the same schemas for form validation.

## Requirements

### Foundation

- Install `zod` as a direct dependency (`npm install zod`)
- Create `shared/schemas/` directory with Zod schemas for each domain (tenant, flat, electric-meter, gas-meter, rent-transaction, auth, email)
- Create `shared/schemas/common.schema.ts` with shared primitives: `uuidSchema`, `paginationSchema`, `idParamSchema`, `dateStringSchema`, `phoneSchema`, `decimalSchema`
- Create `shared/validators/validate-body.ts` — wraps `readBody` + `schema.safeParse()`, returns typed data or throws 400 with structured `data.errors`
- Create `shared/validators/validate-query.ts` — same pattern for `getQuery`
- Create `shared/validators/validate-params.ts` — same pattern for `getRouterParams`
- Create `shared/errors/prisma-error.ts` — maps Prisma error codes (P2002→409, P2025→404, P2003→400) to user-friendly messages
- Schemas must import only `zod` (universal library) so they are safe for client-side import via Nuxt 4's `#shared` alias
- Validators import `h3` types, errors import `prisma` types — these are server-only and must NOT be imported from client code

### Domain Schemas

- Each domain gets: `domainSchema` (create/full), `domainUpdateSchema` (partial for PATCH/PUT), `domainQuerySchema` (list/search params), and inferred TypeScript types via `z.infer<>`
- Schema fields must match Prisma model constraints: `@unique` fields, `Decimal(10,2)` precision (refine for 2 decimal places), `BigInt` for meterNo (coerce number → convert to BigInt before Prisma), DateTime as date strings with `Date.parse()` validation, Json as `z.record(z.unknown())`
- Use `z.coerce.number()` for numeric inputs since HTTP bodies may stringify numbers
- Use `safeParse()` (not `parse()`) to return structured field-level errors

### API Route Migration (Domain-by-Domain)

- Replace manual `if (!field) throw createError(...)` blocks with `validateBody(event, schema)` / `validateQuery(event, schema)` / `validateParams(event, schema)`
- Wrap Prisma operations in try/catch with `handlePrismaError(err)` for user-friendly constraint violation messages
- Maintain existing auth check (`auth.api.getSession`) and response shape (`{ success: true, data: ... }`)
- Migration order: Electric Meter → Gas Meter → Rent Transaction → Flat → Tenant → Auth → Email (simplest to most complex)

### Frontend Integration

- Update `app/utils/errorHandler.ts` to parse the structured `data.errors` array from Zod 400 responses for per-field error display
- Components can import schemas from `#shared/schemas/*` for client-side form validation via `safeParse()`
- Create `shared/utils/zod-antd.ts` helper to convert Zod schemas to Ant Design Vue form `Rule[]` format (optional enhancement)

### Business Validation (Optional Enhancement)

- Create `server/services/` with business validation methods (e.g., `tenant.service.ts` → `checkEmailUniqueness()`, `checkFlatAvailability()`)
- Move Prisma queries and business checks out of API routes into server-side services for thinner handlers

## Note

- Zod v4 is already present as a transitive dependency (via Prisma/better-auth) but not installed directly — install it explicitly so version is locked
- The `shared/` directory does not currently exist and must be created at project root
- Validator files (`validate-body.ts`, etc.) import from `h3` — ensure they are only imported server-side
- `handlePrismaError` imports `Prisma` from `generated/prisma/client` — verify the import path matches Prisma 7's output directory
- Auth routes (Better Auth catch-all) need minimal Zod changes — Better Auth handles its own input validation internally
- The existing `extractApiError` utility already cleans Prisma error messages; supplement it with Zod error field parsing rather than replacing it
- Meter `meterNo` is `BigInt` in Prisma but `number` in Zod/JSON — use `z.coerce.number().int().positive()` in schema and `BigInt(val)` before Prisma calls
- `Decimal` fields need `.refine()` for 2-decimal place validation since Zod has no native Decimal type

## References

- `prisma/schema.prisma` — Database model constraints
- `server/api/tenant/index.post.ts` — Most complex API route (creates User + Tenant in transaction), pattern reference for migration
- `server/api/electric-meter/index.post.ts` — Simplest API route, good starting point for migration
- `app/utils/errorHandler.ts` — Existing error extraction utility to update for Zod structured errors
- `app/stores/useTenantStore.ts` — Store pattern showing where errors are caught and displayed
- `app/services/tenantService.ts` — Service pattern (thin axios passthrough)
- `context/docs/plans/plan-validation.md` — Implementation plan for this feature
- `context/docs/ideas/validation-idea.md` — Original feature idea
- [Zod Documentation](https://zod.dev/)
