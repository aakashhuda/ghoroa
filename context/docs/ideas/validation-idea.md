# Validations

Currently we are not validating the requests in our appliaction. Incoming requests are not validated according to the Database constrains and also Business logic. We want to use Zod to apply validations in our whole project in all the necessary api calls. Please go through the database schema `@prisma/schema.prisma` to more understand the conditions. And please do extensive research so that we can create clean, easily readable validations for incoming and outgoing request.s

## Stack

- Nuxt (Nitro server)
- Pinia
- Prisma
- Neon PostgreSQL

## Goals

- Keep API routes thin.
- Centralize validation.
- Separate business logic from database access.
- Reuse validation between frontend and backend.
- Easily generate human readable responses through Zod

## Responsibilities

### API Routes

- Read request.
- Call store actions
- Call service.
- Inside service call validator methods
- Return response.
- No business logic.

### Schemas (Zod)

Use for **input validation** only.

Examples: - Required fields - Email format - Min/max length - Number
ranges - Enums - Array/object shape

These schemas can live in `shared/schemas` and be reused by both
frontend and backend.

### Validators

Small helpers that: 1. Read request body. 2. Validate using the Zod
schema. 3. Return typed data.

This avoids repeating validation code in every endpoint.

### Services

Services contain **business logic**.

Examples: - Email must be unique. - User must own the resource. - Cannot
delete the last administrator. - Budget cannot become negative. -
Subscription limits. - Permission checks.

### Prisma / Database

The database is the final safety net.

Examples: - `@unique` - Foreign keys - NOT NULL - Database constraints

Never rely solely on frontend validation.

## Validation Types

### 1. Input Validation (Schema)

Location: `shared/schemas`

Examples: - Required - Email format - Password length - Positive
numbers - String length - UUID format

### 2. Business Validation (Service)

Examples: - Email already exists - User has permission - Maximum members
reached - Resource belongs to current user - Cannot perform invalid
state transition. We can have business validation methods in the Services

### 3. Database Validation (Prisma/Database)

Examples: - Unique constraints - Referential integrity - Transactions

## Request Flow

```text
User
  │
  ▼
Nuxt Component
  │─ Input Validation using Zod
  │
  ▼
Store Action
  │
  ▼
Service
  │
  |─ Business Rules Validation using Zod (Validator Method in Service)
  |
  ▼
Backend Server Call
  │
  ▼
Prisma
  │
  ▼
Neon PostgreSQL
```

## Recommended Rules

- Services should contain all business rules.
- service api calls should never know business rules.
- Reuse Zod schemas on both frontend and backend.
- Keep one source of truth for validation.
- Catch Prisma errors and convert them to friendly API errors.
- Keep authentication and authorization checks in services or
  middleware as appropriate.

## A few additional recommendations

- Use safeParse() rather than parse() if you want to return structured validation errors (e.g. { field: "email", message: "Invalid email" }) instead of throwing immediately.
- Consider placing your schemas in a shared/ directory if you want the frontend and backend to use the exact same validation rules.
- Keep API handlers thin—they should orchestrate the request, not contain business logic.
- Catch Prisma-specific errors (such as unique constraint violations) in the service layer and convert them into user-friendly API responses.

## Benefits

- Easier testing
- Reusable validation
- Cleaner code
- Better scalability
- Consistent validation across frontend and backend

## Reference

- Zod Documentation Link: `https://zod.dev/`
