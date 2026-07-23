# UI & Functionality Improvements

## Overview

This feature bundles 14+ UI and functionality enhancements across GHOROA's admin pages, primarily in the Rent Management module. The changes span form behavior (inline User creation during Tenant add), computed display fields (flat code, meter label, flat active/inactive status), consistent datetime handling (Bangladesh Standard Time), and visual polish (button alignment, card shadows, dashboard-inspired colors, Inter font, skeleton loading). The approach leverages existing patterns — server-side mapping utilities (`mapTenant.ts`), Ant Design Vue components, and service/store architecture — to keep changes minimal and consistent.

## Requirements

### 1. Tenant Form — User Integration
- Add Tenant form must include inline User input fields: `name` (required), `email` (required), `phone`, `nid`, and `image` (file input, kept but unused)
- Remove the User select dropdown from both Add and Edit Tenant forms
- Edit Tenant form must show updatable User fields: `name`, `nid`, `image`
- Server-side `/api/tenant` POST must create a `User` (with `userType: TENANT`) and `Tenant` in a single atomic Prisma transaction
- Server-side `/api/tenant/[id]` PUT must update the related User's `name`, `nid`, `image` fields alongside the Tenant

### 2. Computed Display Fields
- Flat `displayValue` = `flat.code` — applied in select dropdowns, table columns, and detail pages
- Electric & Gas Meter `displayValue` = `"#{meterNo} - #{flat.code}"` (or `"#{meterNo} - Unassigned"` if no flat)
- Implemented as server-side computed fields added to API responses via a new `server/utils/mapDisplayValues.ts` utility, consistent with the existing `mapTenant.ts` pattern
- Flat computed `status` field: `"Active"` (green tag) when a tenant is assigned, `"Inactive"` (default tag) when vacant — displayed in flats list table and detail page

### 3. Consistent Datetime (Bangladesh Standard Time)
- UTC datetimes must be converted to BST (UTC+6) for table display in a readable format like "15 Jul 2026, 03:45 PM"
- Daterange filter on Rent Collection page must accept BST date input, convert to UTC range for DB query, and return responses with BST display values
- Use dayjs with `utc` and `timezone` plugins; fall back to luxon if dayjs timezone support is insufficient

### 4. Description Component Background
- `a-descriptions` label columns should have a differentiated background color (`#f8fafc` or similar subtle tint)

### 5. Button Icon + Text Alignment
- All buttons with icon + text must be vertically center-aligned via global CSS fix

### 6. Page Back Buttons
- All `PageHeader` back buttons (`show-back`) must navigate back; fall back to the parent list page if no history

### 7. Table Action Buttons — Padding & Colors
- View (green tint), Edit (cyan tint), Delete (danger red) action buttons with increased padding via a `.table-action-btn` CSS class

### 8. Sidebar Rent Management — Hover/Selected State
- When a Rent Management sublink is selected or hovered, the parent title text must remain visible (fix CSS background/text color conflict)

### 9. Button Size Standardization
- Admin page call-to-action buttons should match the size of login/signup buttons (~40-44px height, `size="large"` or `.admin-btn` class)

### 10. Form Submit Button Text — "Create" → "Save"
- All form submit buttons must show "Save" (for add mode) and keep "Update" (for edit mode)

### 11. Cancel Button — Danger Color
- All form cancel buttons must use Ant Design's `danger` prop consistently

### 12. Card Shadow
- `.card` shadow intensity must be increased for a modern/glowing appearance

### 13. Dashboard-Inspired Colors
- CSS custom properties from dashboard palette (`--color-green`, `--color-cyan`, `--color-orange`, `--color-blue`, `--color-purple`, `--color-red`, plus soft variants) must be defined in `main.css`
- Applied sparingly to admin pages for texts, links, badges, table headers, section headers, and icon colors — without compromising the current clean/plain aesthetic

### 14. Table & Form Loading Animations
- Detail and edit pages must show Ant Design `<a-skeleton>` shimmer/placeholder while data is loading

### 15. Font — Inter
- Replace DM Sans with **Inter** as the project's primary font across `main.css`, `app.vue` theme, `tailwind.config.ts`, and Google Fonts link in `nuxt.config.ts`

## Note

- The Tenant form's `image` file input is kept in the UI but marked as unused — media/file upload functionality is not yet implemented
- Dayjs is the default datetime library (bundled with Ant Design Vue); luxon will only be installed if dayjs timezone support is insufficient
- The RentTransactionForm does not have an edit mode — "Create" is being changed to "Save" for consistency
- All color additions are intentionally conservative to preserve the existing clean aesthetic
- The plan file for this feature includes detailed implementation steps and can be referenced during development

## References

- `@app/components/rent/TenantForm.vue` — form to be modified with inline User fields
- `@server/api/tenant/index.post.ts` — create endpoint to wrap User + Tenant in transaction
- `@server/api/tenant/[id].put.ts` — update endpoint to also update User
- `@app/services/tenantService.ts` — update type definitions for user fields
- `@server/utils/mapTenant.ts` — existing mapping utility pattern to follow
- `@server/utils/mapDisplayValues.ts` — new utility for computed display fields
- `@server/api/flat/*.ts` — API handlers to apply flat display mapping
- `@server/api/electric-meter/*.ts` — API handlers to apply meter display mapping
- `@server/api/gas-meter/*.ts` — API handlers to apply meter display mapping
- `@app/utils/formatDate.ts` — new BST datetime formatting utility
- `@app/components/PageHeader.vue` — fix back button navigation
- `@app/components/DataTable.vue` — reusable table wrapper (action button styling applied in parent pages)
- `@app/components/rent/FlatForm.vue`, `GasMeterForm.vue`, `ElectricMeterForm.vue`, `RentTransactionForm.vue` — button text and cancel button changes
- `@app/assets/css/main.css` — global CSS changes (shadows, buttons, colors, fonts, descriptions, sidebar)
- `@app/app.vue` — theme fontFamily update
- `@nuxt.config.ts` — Google Fonts link update
- `@tailwind.config.ts` — fontFamily update
- `@app/pages/rent/flats/[id].vue` — skeleton loading, active/inactive tag, computed display values
- `@app/pages/rent/gas-meters/[id].vue` — skeleton loading
- `@app/pages/rent/electric-meters/[id].vue` — skeleton loading
- `@app/pages/rent/tenants/edit-[id].vue` — skeleton loading
- `@app/pages/rent/flats/edit-[id].vue` — skeleton loading
- `@context/docs/plans/plan-ui-fn-improvements.md` — feature plan file with detailed implementation steps
