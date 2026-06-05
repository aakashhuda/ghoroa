# Seed Data Script - Summary

## Files created

- `prisma/seed.ts` -- Main seed script with colored console output

## Files modified

- `package.json` -- Added `db:seed` script and `prisma.seed` config
- `context/current-feature.md` -- Updated status to In Progress with history

## Dependencies / Runtime requirements

| Dependency | Type | Purpose |
|---|---|---|
| `node` (>= 20.19, per `.nvmrc`) | Runtime | Executes the seed script |
| `tsx` (via `npx`) | Runtime | TypeScript execution -- needed because Node's `--experimental-strip-types` cannot resolve the generated Prisma client's internal `.js` -> `.ts` imports |
| `bcryptjs` (^3.0.3) | devDependency | Pure JS bcrypt implementation for hashing seed passwords |

## Seed data overview

| Entity | Count | Details |
|---|---|---|
| Super Admin | 1 | Mizanur Rahman (`superadmin@ghoroa.com`), NID 1987654321 |
| Admin | 1 | Kamal Hossain (`admin@ghoroa.com`), NID 1987654322 |
| Tenants | 10 | Bangladeshi names, flat IDs A1-F3, each with NID |
| Users (total) | 12 | 2 admin + 10 tenant users |
| Accounts | 12 | Better Auth credential accounts with bcrypt-hashed passwords |
| Rent Transactions | 20 | 2 per tenant (May 2026 + June 2026) |
| Verifications | 2 | Expired email verification records |

## Tenant data

| Name | Flat | Rent | Utilities | Advance | Head Count | NID |
|---|---|---|---|---|---|---|
| Shahidul Islam | A1 | BDT 10,000 | BDT 1,500 | BDT 30,000 | 4 | 1987654323 |
| Rafiq Uddin | A2 | BDT 12,000 | BDT 1,200 | BDT 36,000 | 3 | 1987654324 |
| Abul Hashem | B1 | BDT 8,000 | BDT 1,000 | -- | 2 | 1987654325 |
| Jahangir Alam | B3 | BDT 15,000 | BDT 2,000 | BDT 50,000 | 5 | 1987654326 |
| Mostafa Kamal | C2 | BDT 11,000 | BDT 1,300 | BDT 25,000 | 3 | 1987654327 |
| Abdul Karim | C3 | BDT 9,500 | BDT 1,100 | -- | 4 | 1987654328 |
| Shamsul Haque | D1 | BDT 13,000 | BDT 1,800 | BDT 40,000 | 6 | 1987654329 |
| Nurul Islam | D2 | BDT 14,000 | BDT 1,600 | BDT 45,000 | 4 | 1987654330 |
| Fatima Begum | E1 | BDT 8,500 | BDT 1,000 | BDT 20,000 | 3 | 1987654331 |
| Hasina Akhter | F3 | BDT 16,000 | BDT 2,000 | BDT 55,000 | 5 | 1987654332 |

## Usage

```bash
npm run db:seed
```

Or via Prisma CLI:

```bash
npx prisma db seed
```

## Login credentials

All users share the password: `password123`

- **Super Admin:** superadmin@ghoroa.com
- **Admin:** admin@ghoroa.com
- **Tenants:** <tenant-email>@ghoroa.com (e.g., shahidul@ghoroa.com)

## Seed script behavior

1. Cleans all existing data (transactions -> tenants -> accounts -> sessions -> verifications -> users)
2. Generates bcrypt hash for `password123`
3. Creates Super Admin + Admin users with Account records, NID, and NID proof
4. Creates 10 tenant users + Account records + Tenant records with NID and NID proof
5. Creates 2 Rent Transactions per tenant with random dates in May/June 2026 and random receiver (admin/super admin)
6. Creates 2 expired Verification records
7. Prints colored summary with record counts
