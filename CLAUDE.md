# GHOROA

A full-stack property management platform built with Nuxt.js, enabling building owners and landlords to digitize rent collection, track expenses, manage employees, run a rooftop farm business, and generate financial reports — all from one place.

## Context

Read the following to get the full context of the project

- `@context/project-overview.md`
- `@context/coding-standards.md`
- `@context/ai-interaction.md`
- `@context/current-feature.md`
- `@context/architecture.md`

## UI References

- `@context/screenshots/screenshot-dashboard-sidebar.png`
- `@context/screenshots/screenshot-dashboard-main-content.png`

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run generate  # Static site generation
npm run preview   # Preview production build locally
npm run db:migrate  # Create new migration (prisma migrate dev)
npm run db:deploy   # Deploy migrations (production)
npm run db:generate # Regenerate Prisma client
npm run db:studio   # Open Prisma Studio
npm run db:status   # Check migration status
```

## Prisma 7 (Database)

This project uses **Prisma 7** with Neon (serverless PostgreSQL). Prisma 7 requires **Node.js >= 20.19** — use `nvm use` (see `.nvmrc`).

- **Never run `prisma db push`** in any environment. Always use migrations.
- Create new migrations: `npx prisma migrate dev --name <migration_name>`
- Deploy in production: `npx prisma migrate deploy`
- The Prisma schema lives in `prisma/schema.prisma`
- Prisma 7 uses `prisma.config.ts` at project root (not inline config)
- Generated client output is at `generated/prisma/` (gitignored)
- Prisma client requires a driver adapter (`@prisma/adapter-pg`) — see `server/utils/prisma.ts`
- Server-side Prisma client is auto-imported from `server/utils/prisma.ts`

## Auth

This project uses **Better Auth** (email/password + Google OAuth).

- Auth server config: `server/utils/auth.ts`
- Auth API routes: `server/api/auth/[...all].ts` (catch-all handler)
- Auth client (frontend): `app/lib/auth-client.ts`
- Session check on server: `const session = await auth.api.getSession({ headers: event.headers })`
- Session check on client: `const { data: session } = await authClient.useSession(useFetch)`

## Tech Stack

| Layer        | Tech                                                                |
| ------------ | ------------------------------------------------------------------- |
| Framework    | Nuxt 4 (SSR)                                                        |
| Component UI | Ant Design Vue 4 (`a-config-provider`, `a-button`, `a-modal`, etc.) |
| CSS          | Tailwind CSS (utility classes)                                      |
| State        | Pinia stores in `stores/`                                           |
| Auth         | Nuxt Auth v5 (email/password + Gmail OAuth)                         |
| File storage | Cloudflare R2 via `/api/upload`                                     |
| ORM          | Prisma 7                                                            |
| DB           | Neon (serverless PostgreSQL)                                        |
