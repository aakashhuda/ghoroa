import { z } from 'zod'
import { uuidSchema, intSchema, jsonSchema } from './common.schema'

export const flatSchema = z.object({
  name: z.string().min(1, 'Flat name is required'),
  code: z.string().min(1, 'Flat code is required'),
  floor: intSchema,
  electricMeterId: uuidSchema,
  gasMeterId: uuidSchema,
  flatDetails: jsonSchema,
})

export const flatUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  floor: intSchema.optional(),
  electricMeterId: uuidSchema.optional(),
  gasMeterId: uuidSchema.optional(),
  flatDetails: jsonSchema.optional(),
})

export const flatQuerySchema = z.object({
  search: z.string().optional().default(''),
  floor: z.coerce.number().int().optional(),
  unassigned: z.string().optional().default(''),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

export type FlatInput = z.infer<typeof flatSchema>
export type FlatUpdateInput = z.infer<typeof flatUpdateSchema>
export type FlatQuery = z.infer<typeof flatQuerySchema>
