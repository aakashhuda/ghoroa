import { z } from 'zod'
import { bigIntSchema, bigIntOptionalSchema } from './common.schema'

export const gasMeterSchema = z.object({
  name: z.string().optional().nullable(),
  meterNo: bigIntSchema,
})

export const gasMeterUpdateSchema = z.object({
  name: z.string().optional().nullable(),
  meterNo: bigIntOptionalSchema,
})

export const gasMeterQuerySchema = z.object({
  search: z.string().optional().default(''),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

export type GasMeterInput = z.infer<typeof gasMeterSchema>
export type GasMeterUpdateInput = z.infer<typeof gasMeterUpdateSchema>
export type GasMeterQuery = z.infer<typeof gasMeterQuerySchema>
