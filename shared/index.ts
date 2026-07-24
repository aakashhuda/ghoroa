// Schemas — safe for client + server (import only zod)
export * from './schemas/common.schema'
export * from './schemas/electric-meter.schema'
export * from './schemas/gas-meter.schema'
export * from './schemas/rent-transaction.schema'
export * from './schemas/flat.schema'
export * from './schemas/tenant.schema'
export * from './schemas/auth.schema'
export * from './schemas/email.schema'

// Server-only helpers — import directly in API routes:
//   import { validateBody } from '~/../shared/validators/validate-body'
//   import { handlePrismaError } from '~/../shared/errors/prisma-error'
