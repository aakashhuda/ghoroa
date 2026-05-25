# GHOROA

A full-stack property management platform built with Nuxt.js, enabling building owners and landlords to digitize rent collection, track expenses, manage employees, run a rooftop farm business, and generate financial reports — all from one place.

## Context

Read the following to get the full context of the project

- `@context/project-overview.md`
- `@context/coding-standards.md`
- `@context/ai-interaction.md`
- `@context/current-feature.md`

## UI References

- `context/screenshots/screenshot-dashboard-sidebar.png`
- `context/screenshots/screenshot-dashboard-content.png`

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run generate  # Static site generation
npm run preview   # Preview production build locally
```

## Prisma (Database)

This project uses Prisma with Neon (serverless PostgreSQL).

- **Never run `prisma db push`** in any environment. Always use migrations.
- Create new migrations: `npx prisma migrate dev --name <migration_name>`
- Deploy in production: `npx prisma migrate deploy`
- The Prisma schema lives in `prisma/schema.prisma` (currently defined in `context/ghoroa-project-overview.md` — create the actual file when implementing)

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

## Architecture

Read the following to get the full architecture of the project

- `@context/architecture.md`
