# Tenant Management

## Overview

Build the first set of admin CRUD pages for the Ghoroa platform — Tenant, Flat, Gas Meter, Electric Meter, and Rent Transaction. All five database models already exist in the Prisma schema with migrations applied and a seed script that populates sample data. This feature establishes the reusable UI patterns (list page with search/filter/table/actions, add/edit forms sharing one component via `isEdit` prop, detail page with tabs) that all future CRUD modules will follow.

## Requirements

- **Axios setup**: Install `axios`, create a Nuxt plugin (`app/plugins/axios.ts`) with a configured Axios instance (baseURL, auth interceptors), and migrate the existing `authService.ts` from `$fetch` to Axios.
- **Tenant CRUD**: List page with search (by tenant name, flat code, whatsapp number), filter, paginated table, action column (view/edit/delete icons). Add and Edit pages sharing `TenantForm.vue` (gated by `isEdit` prop). Detail page showing tenant info + `a-tabs` for inline management of related Rent Transactions, Flat Info, and Meters.
- **Flat CRUD**: List page with search (by name, code, floor), filter by floor, paginated table, action column. Add/Edit pages sharing `FlatForm.vue`. Detail page showing flat info with linked meters and tenant.
- **Gas Meter CRUD**: List page with search (by name, meterNo), paginated table, action column. Add/Edit pages sharing `GasMeterForm.vue`. Detail page.
- **Electric Meter CRUD**: Same pattern as Gas Meter.
- **Rent Transaction**: List page with search (by tenant, flat), date range filter, paginated table, action column. Add page using `RentTransactionForm.vue`. Rent transactions are immutable — no edit or delete.
- **Shared `DataTable.vue` component**: Reusable wrapper around Ant Design `a-table` accepting `columns`, `dataSource`, `loading`, `pagination` props and exposing `search`, `filter`, and scoped `action` slots. Emits `update:pagination` and `search` events.
- **Shared `PageHeader.vue` component**: Title display with optional back button and "Add X" button. Accepts `title`, `showBack`, `showAdd`, `addLabel`, `addRoute` props.
- **Shared form pattern**: Every form component accepts `isEdit: Boolean` and `initialData: Object|null`. Emits `submit` and `cancel`. In edit mode, data pre-populates from `initialData`. Form validation for required fields before submit.
- **Server-side search and pagination**: All list API endpoints accept `?search=`, `?page=`, `?pageSize=` query params and use Prisma `where` clauses with `skip`/`take`.
- **No N+1 queries**: Every list endpoint fetches relations via a single Prisma `include` (never loops). List + count run in parallel via `Promise.all`. All Decimal/BigInt values are serialized to Number before returning JSON.
- **Sidebar update**: Add "Flats", "Gas Meters", "Electric Meters" links under the Rent Management submenu in `DashboardSidebar.vue`. Update existing route keys to match new page paths.
- **API routes follow the existing `defineEventHandler` pattern** with session check via `auth.api.getSession({ headers: event.headers })`, returning `{ success, data }` or throwing `createError`.
- **Services follow the plain object pattern** from `authService.ts`, calling the Axios instance.
- **Stores follow the Pinia setup store pattern** from `useAuthStore.ts`, managing loading/error state and showing Ant Design `message` notifications on success/failure.

## Note

- Rent Transactions have no edit or delete — records are immutable once created. The API has no PUT or DELETE route for this entity.
- Tenant creation requires selecting a User (filtered to `userType: TENANT`, not already assigned) and a Flat (not already assigned to another tenant). API routes should support `?unassigned=true` filter for these lookups.
- Flat creation requires selecting existing Electric Meter and Gas Meter (both required fields with unique constraints). Meters can exist independently of flats.
- Flat deletion must handle meter unassignment — delete the flat first, then optionally delete the orphaned meters.
- The `meterNo` field is BigInt in the database — API routes must convert to Number for JSON serialization.
- The tenant detail page uses `a-tabs` to manage related entities inline rather than modals/drawers, matching the idea's "compact design" guidance.
- All pages use `definePageMeta({ layout: 'default' })` — no auth middleware yet; to be added when route guards are implemented globally.

## References

- Prisma schema: `prisma/schema.prisma` — Tenant, Flat, ElectricMeter, GasMeter, RentTransaction models with relations
- Seed script: `prisma/seed.ts` — sample data with 18 flats, 36 meters, 10 tenants
- Reference API route pattern: `server/api/auth/change-password.post.ts`
- Reference service pattern: `app/services/authService.ts`
- Reference store pattern: `app/stores/useAuthStore.ts`
- Sidebar component: `app/components/dashboard/DashboardSidebar.vue`
- Prisma client utility: `server/utils/prisma.ts`
- Auth utility: `server/utils/auth.ts`
- Project architecture: `context/architecture.md`
- Coding standards: `context/coding-standards.md`
- Ant Design Vue: `https://antdv.com/components/overview`
- Prisma 7: `https://www.prisma.io/docs`
