# Plan: UI & Functionality Improvements

> See the full spec at [`@context/features/ui-fn-improvements-spec.md`](../features/ui-fn-improvements-spec.md)

## Overview

This plan covers 14+ UI and functionality improvements across GHOROA's admin pages. These are not structural changes — they refine the existing Tenant management flow, add computed display fields, standardize datetime handling, and apply visual polish.

## What to Implement

### 1. Tenant Form — User Integration
- Replace User select dropdown with inline User fields (name, email, phone, nid, image)
- Server: create User + Tenant in a Prisma transaction on POST
- Server: update User's name/nid/image alongside Tenant on PUT
- Remove `searchUsers()` from TenantForm

### 2. Computed Display Fields
- New `server/utils/mapDisplayValues.ts` with `mapFlatDisplay()`, `mapElectricMeterDisplay()`, `mapGasMeterDisplay()`, `mapFlatStatus()`
- Apply in all relevant GET handlers
- Flat `status` = Active (green tag) / Inactive (gray tag) based on tenant assignment

### 3. Datetime (BST)
- New `app/utils/formatDate.ts` using dayjs `utc` + `timezone` plugins
- Apply `formatToBD()` in all datetime table columns
- Fix daterange filter in rent-collection to convert BST → UTC

### 4–15. Visual & CSS changes
- Description background, button alignment, back buttons, action button styling, sidebar fix, button sizes, "Save" text, cancel danger, card shadows, dashboard colors, skeleton loading, Inter font

## How to Implement

### Files to Create
- `server/utils/mapDisplayValues.ts`
- `app/utils/formatDate.ts`

### Files to Modify
- `app/components/rent/TenantForm.vue` — replace user select with inline fields
- `app/components/rent/FlatForm.vue` — "Save" text, cancel danger
- `app/components/rent/GasMeterForm.vue` — "Save" text, cancel danger
- `app/components/rent/ElectricMeterForm.vue` — "Save" text, cancel danger
- `app/components/rent/RentTransactionForm.vue` — "Save" text, cancel danger
- `app/components/PageHeader.vue` — fix back button
- `app/assets/css/main.css` — shadows, buttons, colors, fonts, sidebar, descriptions
- `app/app.vue` — theme fontFamily
- `nuxt.config.ts` — Google Fonts link
- `tailwind.config.ts` — fontFamily
- `server/api/tenant/index.post.ts` — User + Tenant creation
- `server/api/tenant/[id].put.ts` — update User alongside Tenant
- `server/api/flat/index.get.ts` — apply flat display mapping
- `server/api/flat/[id].get.ts` — apply flat display mapping
- `server/api/electric-meter/*.get.ts` — apply meter display mapping
- `server/api/gas-meter/*.get.ts` — apply meter display mapping
- `app/pages/rent/flats/index.vue` — computed display, action buttons, status tag
- `app/pages/rent/flats/[id].vue` — computed display, skeleton, status tag
- `app/pages/rent/tenants/index.vue` — datetime format, action buttons
- `app/pages/rent/tenants/[id].vue` — datetime format, skeleton
- `app/pages/rent/gas-meters/index.vue` — computed display, action buttons
- `app/pages/rent/gas-meters/[id].vue` — skeleton loading
- `app/pages/rent/electric-meters/index.vue` — computed display, action buttons
- `app/pages/rent/electric-meters/[id].vue` — skeleton loading
- `app/pages/rent/tenants/edit-[id].vue` — skeleton loading
- `app/pages/rent/flats/edit-[id].vue` — skeleton loading
- `app/pages/rent/gas-meters/edit-[id].vue` — skeleton loading
- `app/pages/rent/electric-meters/edit-[id].vue` — skeleton loading
- `app/services/tenantService.ts` — type updates

### New Dependencies
- `dayjs` plugins: `utc`, `timezone` (already bundled, just import plugins)
- Possibly `luxon` if dayjs timezone insufficient

### No DB Changes
- No Prisma model changes, no migrations needed
