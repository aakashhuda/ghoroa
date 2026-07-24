import { createError } from 'h3'

interface PrismaLikeError {
  code?: string
  meta?: Record<string, unknown>
  message?: string
}

const FIELD_LABELS: Record<string, string> = {
  meterNo: 'meter number',
  flatId: 'flat',
  userId: 'user',
  email: 'email address',
  phone: 'phone number',
  nid: 'NID',
  code: 'code',
  electricMeterId: 'electric meter',
  gasMeterId: 'gas meter',
  token: 'token',
  providerId: 'provider ID',
  accountId: 'account ID',
  name: 'name',
}

function toHumanLabel(field: string): string {
  return FIELD_LABELS[field] ?? field
}

function extractPrismaFields(err: PrismaLikeError): string[] {
  const target = err.meta?.target
  if (Array.isArray(target) && target.length > 0 && target.every((f): f is string => typeof f === 'string')) {
    return target
  }

  const message = err.message
  if (message) {
    const fieldsMatch = message.match(/fields:\s*\(([^)]+)\)/)
    if (fieldsMatch) {
      const fields = fieldsMatch[1]
        .split(',')
        .map((f) => f.trim().replace(/[`"]/g, ''))
        .filter(Boolean)
      if (fields.length > 0) return fields
    }
  }

  return []
}

export function handlePrismaError(err: unknown): never {
  if (err && typeof err === 'object' && 'code' in err) {
    const prismaErr = err as PrismaLikeError
    const code = prismaErr.code

    switch (code) {
      case 'P2002': {
        const fields = extractPrismaFields(prismaErr)
        if (fields.length === 0) {
          throw createError({
            statusCode: 409,
            statusMessage: 'Conflict',
            message: 'A record with these values already exists',
          })
        }
        const labels = fields.map(toHumanLabel)
        const fieldStr = labels.join(' and ')
        throw createError({
          statusCode: 409,
          statusMessage: 'Conflict',
          message: `A record with this ${fieldStr} already exists`,
        })
      }
      case 'P2025':
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'Record not found',
        })
      case 'P2003':
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'Referenced record does not exist',
        })
      default:
        throw createError({
          statusCode: 400,
          statusMessage: 'Database Error',
          message: prismaErr.message || 'Database error',
        })
    }
  }
  throw err
}
