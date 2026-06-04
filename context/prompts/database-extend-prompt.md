# Extend Database Models

## Overview

We are moving forward to create our MVP. But before that we need to extend our database models. The MVP will have the feature to add/update/delete Tenants & Rent and track their rent transactions for each month.
We need to have the User, Tenant models and also the RentTransaction model. This will store monthly rent provided by Tenants.

## Requirements

- Read the project-overview.md to know about the application and datbase models and database model diagrams
- To track the rent provided by the tenants we need to add one new model RentTransaction.
- Fields for this model: created, updated, amount, tenant(Foreign Key), received by
- Add the model in the project-overview.md's Data Models (Prisma) & Data Model Diagrams sections

## References

- Initial data models: `@context/project-overview.md`
- Database standards: `@context/coding-standards.md`
- Prisma docs: https://prisma.io/docs (Prisma 7 has breaking changes - fetch latest)
