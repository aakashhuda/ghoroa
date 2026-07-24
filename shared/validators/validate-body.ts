import { readBody, createError } from 'h3'
import type { ZodSchema } from 'zod'

function formatZodErrors(err: { errors: Array<{ path: (string | number)[]; message: string }> }) {
  return err.errors.map((e) => ({
    field: e.path.join('.'),
    message: e.message,
  }))
}

export async function validateBody<T>(event: any, schema: ZodSchema<T>): Promise<T> {
  const body = await readBody(event)
  const result = schema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: { errors: formatZodErrors(result.error) },
    })
  }
  return result.data
}
