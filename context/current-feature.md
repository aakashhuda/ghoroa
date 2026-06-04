# Current Feature

<!-- Feature Name -->

Auth Pages — Login & Signup (Phase 1)

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

- Create `app/layouts/auth.vue` — minimal centered auth layout
- Create `app/pages/auth/login.vue` and `app/pages/auth/signup.vue` — auth pages
- Create `app/components/auth/AuthLogin.vue` and `app/components/auth/AuthSignup.vue` — form components
- Create `middleware/auth.ts` — route guard middleware
- Protect dashboard with auth middleware
- Handle loading, validation, error states, and authenticated redirects

## References

- Auth feature spec: `@context/features/authentication-phase-1.md`
- Login/signup UI reference: `@context/docs/login-page-ui-reference.md`
- Auth client: `@app/lib/auth-client.ts`
- coding standards: `@context/coding-standards.md`
- architecture: `@context/architecture.md`
- ai interaction - `@context/ai-interaction.md`

## Notes

- Better Auth is already wired (server config, API routes, Prisma schema)
- Auth layout is referenced in architecture.md but doesn't exist yet
- New users default to TENANT role; role changes handled by admin later
- Session fetch in middleware uses direct `$fetch` (can't use composables)

## History

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
