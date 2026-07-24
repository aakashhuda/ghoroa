import { z } from 'zod'

export const uuidSchema = z.string().uuid()

export const idParamSchema = z.object({ id: uuidSchema })

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

export const searchQuerySchema = z.object({
  search: z.string().optional().default(''),
  ...paginationSchema.shape,
})

export const dateStringSchema = z.string().refine(
  (val) => !isNaN(Date.parse(val)),
  { message: 'Invalid date string' },
)

export const phoneSchema = z
  .string()
  .regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
  .optional()
  .nullable()

export const decimalSchema = z.coerce.number().refine(
  (val) => {
    const parts = val.toString().split('.')
    return parts.length === 1 || parts[1].length <= 2
  },
  { message: 'Must have at most 2 decimal places' },
)

export const decimalOptionalSchema = decimalSchema.optional().nullable()

export const bigIntSchema = z.coerce.number().int().positive().transform((n) => BigInt(n))

export const bigIntOptionalSchema = bigIntSchema.optional().nullable()

export const jsonSchema: z.ZodSchema<Record<string, unknown>> = z
  .record(z.unknown())
  .default({})

export const intSchema = z.coerce.number().int()
