# Coding Standards

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

## Vue

- Composite API
- Vue 3

## Nuxt.js

- Server components by default
- Use API routes when you need:
  - Webhooks
  - File uploads with progress tracking
  - Long-running operations
  - Specific HTTP status codes or headers
  - Endpoints for future mobile/CLI clients
  - Third-party integrations
- Otherwise, fetch data directly in server components
- Dynamic routes for different modules and pages

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for v3)
- All theme configuration must be done in CSS using the `@theme` directive in `ghoroa/assets/css/main.css`
- Use CSS custom properties for colors, spacing, etc.
- No JavaScript-based config allowed

Example v4 configuration:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

## File Organization

- Components: `components/[feature]/ComponentName.vue`
- Pages: `pages/[feature]/Page[Route]/.vue`
- Server: `server/api/[feature]/[filename].ts`
- Stores: `stores/[feature].ts`
- Layout: `layouts/default.ts`

## Naming Convention

- **Pages** — `kebab-case` → `@pages/user-profile.vue`
- **Components** — `PascalCase` → `@components/UserProfileCard.vue`
- **Composables** — `camelCase` + `use` prefix → `@composables/useUserProfile.ts`
- **Layouts** — `kebab-case` → `layouts/dashboard.vue`
- **Stores (Pinia)** — `camelCase` + `use/Store` wrap → `@stores/useUserStore.ts`
- **API Routes** — `kebab-case` → `@server/api/user-profile.ts`

## Component Method/Action/Service Method/Server Naming Convention

- Component Method — `[action][feature][response type]` -> eg: `getAccountList, addAccount, editAccount, removeAccount`
- Store Action/Service Method — `[action][feature][response type]` -> eg: `retrieveAccountList, createAccount, updateAccount, deleteAccount`
- Server Method — `[action][feature][response type]` -> eg: `similar to action & service methods but can be more descriptive for code readability`

## Styling

- Use Ant Vue components every where
- Tailwind CSS for all styling
- use @apply to create tailwind classes to generate css class
- No inline styles
- Light mode first, dark mode as option
- UI design should be clean, modern, slick and easy to the eyes

## Database

- Use Prisma ORM for all database operations
- Always use `prisma migrate dev` for schema changes (not `db push`)
- Run `prisma migrate status` before committing to verify migrations are in sync
- Production deployments must run `prisma migrate deploy` before the app starts

## Data Fetching

- Server components fetch directly with Prisma
- Validate all inputs with Zod

## Error Handling

- Use try/catch in Server Actions
- Return `{ success, data, error }` pattern from actions
- Display user-friendly error messages via toast using Ant Vue Components

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible
- Each function will try to solve one issue. Can have helper functions
- Logic building & code should be easy going for another developer to read
- Don't create complicated code logic or solutions
