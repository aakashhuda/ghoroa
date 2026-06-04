# Database Setup — Output Summary

## Packages Installed

- `prisma@7`, `@prisma/client@7`, `@prisma/adapter-pg@7` — Prisma 7 ORM
- `pg` — PostgreSQL driver for adapter
- `dotenv` — env loading for Prisma config
- `better-auth` — authentication (email/password + Google OAuth)

## Files Created

| File | Purpose |
|------|---------|
| `prisma.config.ts` | Prisma 7 config (schema path, datasource URL, migrations path) |
| `prisma/schema.prisma` | Schema: 6 models (User, Session, Account, Verification, Tenant, RentTransaction) + 1 enum (UserType) |
| `prisma/migrations/20260603184350_init/migration.sql` | Initial migration (created & applied to Neon) |
| `server/utils/prisma.ts` | Prisma client singleton with `PrismaPg` driver adapter |
| `server/utils/auth.ts` | Better Auth config (Prisma adapter, email+password, Google OAuth) |
| `server/api/auth/[...all].ts` | Auth API catch-all handler |
| `app/lib/auth-client.ts` | Better Auth client with Vue composables |
| `.nvmrc` | Node.js version (22) |

## Files Modified

- `package.json` — Added `prisma` deps, `db:*` scripts, updated `postinstall`
- `.env` — Added `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, Google OAuth vars
- `.env.example` — Full env template
- `.gitignore` — Ignored `generated/` directory
- `CLAUDE.md` — Updated Prisma 7 details, Better Auth, new commands

## Schema

- **users** — Merged Better Auth + custom fields (name, email, phone, nid, userType). Cascade deletes from sessions/accounts.
- **sessions** — Better Auth session store. Cascade delete on user.
- **accounts** — Better Auth OAuth/password accounts. Cascade delete on user.
- **verifications** — Better Auth verification codes.
- **tenants** — Linked to users via `primaryUserId`. Index on `flatId`. Cascade delete on user.
- **rent_transactions** — Linked to tenants + users. Indexes on `tenantId`, `receivedById`, `createdAt`. Cascade delete on tenant.

## Verified

- Dev server starts cleanly
- Auth API returns proper 401/200 responses
- User sign-up works end-to-end (Better Auth → Prisma → Neon)
