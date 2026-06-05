# Seed Data Script

## Status

In Progress

## Goals

- Create a `prisma/seed.ts` script with sample data for development and demos
- Seed Admin (1), Super Admin (1), Tenants (10) with users
- Create two Rent Transactions per tenant (previous month, current month)
- Create related Better Auth model items (Account, Verification)
- Use Bangladeshi names and flat IDs (A1-F3 range)

## References

- Seed spec: `@context/features/seed-spec.md`
- Current database structure: `prisma/schema.prisma`

## Notes

- Seed script code should have simple one small line of comment to display what it's creating.

## History

- 2026-06-06: Started Seed Data Script — created `prisma/seed.ts`, installed `bcryptjs`, added `db:seed` command and Prisma seed config
- 2026-05-26: Completed Phase 1 — scaffold layout, top bar, and placeholder areas
- 2026-05-26: Completed Phase 2 — collapsible sidebar with navigation links, user avatar area, collapse toggle, mobile drawer
- 2026-06-01: Started Phase 3 — color theme overhaul, analytics content, border radius, sidebar icon fix
- 2026-06-02: Completed Phase 3 — dashboard analytics with metric cards, charts, tables, lists; global CSS with Ant Design overrides; Tailwind v3 config; error page with sidebar layout
- 2026-06-02: Completed Sidebar UI Improvement — changed menu hover/selected backgrounds to solid primary color with white text; sub-menu selected state styling
- 2026-06-03: Started Dashboard UI Improvements — light theme loading, card consolidation, mobile fixes, layout restructuring
- 2026-06-03: Completed Dashboard UI Improvements — all 9 requirements implemented
- 2026-06-04: Started Prisma + Neon PostgreSQL database setup
- 2026-06-04: Completed Prisma 7 setup, schema, initial migration, Better Auth integration
- 2026-06-04: Started Auth Pages — Login & Signup (Phase 1)
- 2026-06-04: Completed Auth Pages — Login & Signup (Phase 1)
- 2026-06-05: Started Auth Pages — Login & Signup (Phase 2)
- 2026-06-05: Completed Auth Pages — Login & Signup (Phase 2)
