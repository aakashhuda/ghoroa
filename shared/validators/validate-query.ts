import { getQuery, createError } from 'h3'
import type { ZodSchema } from 'zod'

function formatZodErrors(err: { errors: Array<{ path: (string | number)[]; message: string }> }) {
  return err.errors.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }))
}

export function validateQuery<T>(event: any, schema: ZodSchema<T>): T {
  const query = getQuery(event)
  const result = schema.safeParse(query)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: { errors: formatZodErrors(result.error) },
    })
  }
  return result.data
}
