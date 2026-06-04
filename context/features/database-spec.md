# Prisma + Neon PostgreSQL Setup

## Overview

Set up Prisma ORM with Neon PostgreSQL database.

## Requirements

- Use Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md (Only User, Tenant & RentTransaction models)
- Include Better Auth for authentication (Integrate for Prisma and Nuxt)
- Add appropriate indexes and cascade deletes
- Set appropriate environmental variables for these integrations. User the conventional NUXT way of reading/using environmentle variables
- Avoid installing unnecessary third party packages if not needed

## References

- Initial data models: `@context/project-overview.md`
- Database standards: `@context/coding-standards.md`
- Prisma docs: https://prisma.io/docs (Prisma 7 has breaking changes - fetch latest)
- Better Auth Installation: https://better-auth.com/docs/installation

## Notes

We will have a development branch that we work on that will be in DATABASE_URL and then we will have a production branch. So we ALWAYS create migrations and never push directly unless specified.

IMPORTANT! Use Prisma 7, which has some breaking changes. Read the entire upgrade guide at https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7 to get a good idea of the changes.

You can also look at the setup guide here - https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres

Specified docs for Nuxt application guide here - https://www.prisma.io/docs/guides/frameworks/nuxt

Specified docs for Nuxt application for better auth guide here: - https://better-auth.com/docs/integrations/nuxt
