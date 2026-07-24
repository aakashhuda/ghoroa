import { z } from 'zod'
import { uuidSchema, dateStringSchema, decimalSchema, decimalOptionalSchema, intSchema } from './common.schema'

export const tenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional().nullable(),
  nid: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  flatId: uuidSchema,
  whatsappNumber: z.string().optional().nullable(),
  headCount: intSchema.optional().default(1),
  rent: decimalSchema,
  utilities: decimalOptionalSchema,
  advance: decimalOptionalSchema,
  joinDate: dateStringSchema,
})

export const tenantUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  nid: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  flatId: uuidSchema.optional(),
  whatsappNumber: z.string().optional().nullable(),
  headCount: intSchema.optional(),
  rent: decimalSchema.optional(),
  utilities: decimalOptionalSchema,
  advance: decimalOptionalSchema,
  joinDate: dateStringSchema.optional(),
})

export const tenantQuerySchema = z.object({
  search: z.string().optional().default(''),
  unassigned: z.string().optional().default(''),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

export type TenantInput = z.infer<typeof tenantSchema>
export type TenantUpdateInput = z.infer<typeof tenantUpdateSchema>
export type TenantQuery = z.infer<typeof tenantQuerySchema>
