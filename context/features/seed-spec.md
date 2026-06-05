# Seed Data Specification

## Overview

Create a seed script (`prisma/seed.ts`) to populate the database with sample data for development and demos.

## Requirements

- Create Admin (1), Super Admin(1)
- Create Tenants (10)
- For each tenant there will be a user with one to one relationship
- For each tenant create two Rent Transaction one in previous month and another in current month.
- Create the related Model Items of Best Auth Models like Account, Verification
- Create dummy data using Bangladeshi names.
- Flat id for Tenants has to be within A to F range and can have the number beside from 1 to 3. eg A1, A2, A3, B1, B2, B3...F3 etc.
- For database structure read the schema referred later here
- Add the command in the package.json to seed this project. This will help to initiate the project.

## Note

- While running script please console.log details of what operations happening and status, with nice colors.

## Reference

- Current database structure - `@prisma/schema.prisma`
- Authentication Development 1 - `@context/features/authentication-phase-1`
- Authentication Development 2 - `@context/features/authentication-phase-2`
