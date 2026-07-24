import { z } from 'zod'
import { uuidSchema, decimalSchema } from './common.schema'

export const rentTransactionSchema = z.object({
  tenantId: uuidSchema,
  amount: decimalSchema,
  receivedById: uuidSchema,
})

export const rentTransactionQuerySchema = z.object({
  search: z.string().optional().default(''),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

export type RentTransactionInput = z.infer<typeof rentTransactionSchema>
export type RentTransactionQuery = z.infer<typeof rentTransactionQuerySchema>
