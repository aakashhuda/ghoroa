# Current Feature

<!-- Feature Name -->

Dashboard UI Improvements

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

- Light theme with new colors configured in `app.vue` should apply to the whole layout (currently not loaded on home URL, only on dashboard)
- Consolidate separate card classes (chart-card, metric-card) into a single reusable card class
- Fix top bar breaking on mobile devices below 500px (+ New button goes out of view width)
- Move logo/project name from sidebar to the left side of the topbar
- Move search input position to the left, alongside the + New button
- On mobile, shorten search input width and position beside the + New button; + New button should show only icon
- Replace sidebar collapse icon with a modern hamburger icon
- On mobile, drawer background color should match sidebar color; sidebar should cover full drawer without unnecessary padding
- Fix slow page reload — full styling takes time to load on initial page load

## References

- @context/features/dashboard-ui-improvements.md
- @context/screenshots/screenshot-dashboard-sidebar
- @context/screenshots/screenshot-dashboard-content
- @context/project-overview.md
- @context/architecture.md
- @app/lib/mock-data.ts

## Notes

All requirements implemented:
1. Theme loading — Google Fonts moved from CSS `@import` to `<link>` in nuxt.config with preconnect hints
2. Card consolidation — Unified `.card` class created in main.css with `.card-hover` variant
3. Mobile topbar fix — Search uses `flex-1 max-w-[280px] min-w-[80px]`; New button icon-only below `sm`
4. Logo moved to topbar — Sidebar logo removed; brand link added to topbar left
5. Search repositioned — Search grouped alongside logo and New button in single flex row
6. Mobile search/New — Search min-width handles sub-500px; New text via `hidden sm:inline`
7. Collapse icon — Changed to `MenuOutlined` hamburger in DashboardSidebar.vue
8. Mobile drawer — Removed padding; `body-style: { padding: 0, background: '#ffffff' }`; `closable: false`
9. Page reload styling — Font preloaded via `<link>` with `preconnect` instead of CSS `@import`

## History

- 2026-05-26: Completed Phase 1 — scaffold layout, top bar, and placeholder areas
- 2026-05-26: Completed Phase 2 — collapsible sidebar with navigation links, user avatar area, collapse toggle, mobile drawer
- 2026-06-01: Started Phase 3 — color theme overhaul, analytics content, border radius, sidebar icon fix
- 2026-06-02: Completed Phase 3 — dashboard analytics with metric cards, charts, tables, lists; global CSS with Ant Design overrides; Tailwind v3 config; error page with sidebar layout
- 2026-06-02: Completed Sidebar UI Improvement — changed menu hover/selected backgrounds to solid primary color with white text; sub-menu selected state styling
- 2026-06-03: Started Dashboard UI Improvements — light theme loading, card consolidation, mobile fixes, layout restructuring
- 2026-06-03: Completed Dashboard UI Improvements — all 9 requirements implemented
