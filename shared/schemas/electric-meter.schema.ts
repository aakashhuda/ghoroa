import { z } from 'zod'
import { bigIntSchema, bigIntOptionalSchema } from './common.schema'

export const electricMeterSchema = z.object({
  name: z.string().optional().nullable(),
  meterNo: bigIntSchema,
})

export const electricMeterUpdateSchema = z.object({
  name: z.string().optional().nullable(),
  meterNo: bigIntOptionalSchema,
})

export const electricMeterQuerySchema = z.object({
  search: z.string().optional().default(''),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

export type ElectricMeterInput = z.infer<typeof electricMeterSchema>
export type ElectricMeterUpdateInput = z.infer<typeof electricMeterUpdateSchema>
export type ElectricMeterQuery = z.infer<typeof electricMeterQuerySchema>
