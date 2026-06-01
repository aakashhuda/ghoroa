# Current Feature

## Dashboard UI Phase 3

Refine the dashboard UI with updated color theme (Ant Vue + Tailwind), smaller border radius, analytics content (metrics, tables, lists) from mock data, and sidebar icon fixes.

## Status

In Progress

## Goals

- Import Tailwind utilities in `main.css` and use `@apply` for custom classes from tailwind classes
- Update Ant Design Vue theme tokens to match the screenshot color palette
- Update the color palette reference in `@context/project-overview.md`
- Ensure sidebar selected/hover backgrounds reflect the new color theme; apply theme globally
- Decrease border radius globally using a reusable approach (reference: `screenshot-dashboard-main-content.png`)
- Fix the "Rooftop Farm" sidebar icon to a more relatable one
- Build analytics sections (Metrics, Tables, Lists) in `DashboardView.vue` using mock data from `@app/lib/mock-data.ts`
- Cards follow the UI pattern from the screenshot: shadow, border, hover effect, radius
- Apply full color palette from `dashboard-css-reference.md` and `dashboard-tailwind-color-config.md`; update/create tailwind config as needed
- Priority: match the dashboard content color palette and apply it everywhere (sidebar, whole project)

## References

- `@context/features/dashboard-ui-phase-3.md`
- `@context/docs/dashboard-css-reference.md`
- `@context/docs/dashboard-tailwind-color-config.md`
- `@context/screenshots/screenshot-dashboard-main-content.png`
- `@context/screenshots/screenshot-dashboard-sidebar.png`
- `@context/project-overview.md`
- `@app/lib/mock-data.ts`
- `@app/components/dashboard/DashboardView.vue`

## Notes

- This is phase 3 of 3 for the dashboard UI layout
- Import mock data directly for now until a database is implemented

## History

- 2026-05-26: Completed Phase 1 — scaffold layout, top bar, and placeholder areas
- 2026-05-26: Completed Phase 2 — collapsible sidebar with navigation links, user avatar area, collapse toggle, mobile drawer
- 2026-06-01: Started Phase 3 — color theme overhaul, analytics content, border radius, sidebar icon fix
