## Nuxt Fullstack Architecture Guide

See architecture below.

# Stack

-   Nuxt
-   Pinia
-   Better Auth
-   Prisma
-   Neon
-   Zod

## Frontend

-   Components: UI only
-   Pages: orchestration
-   Pinia: client state, loading, errors, pagination
-   Frontend Services: API communication only
-   Composables: reusable UI logic

## Backend

-   API: request/response only
-   Validators: Zod input validation
-   Services: business logic
-   Repositories: Prisma queries
-   Search: build where clauses
-   Query: pagination/filter/sort helpers

## Validation

-   Input validation: Zod schemas
-   Business validation: services
-   Database validation: Prisma constraints

## Request Flow

Component -\> Pinia -\> Frontend Service -\> API -\> Validator -\>
Service -\> Repository -\> Prisma -\> PostgreSQL
