import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateQuery } from '../../../shared/validators/validate-query'
import { tenantQuerySchema } from '../../../shared/schemas/tenant.schema'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { search, unassigned, page, pageSize } = validateQuery(event, tenantQuerySchema)

  const where: Record<string, unknown> = {}

  if (unassigned === 'true') {
    where.flat = null
  }

  if (search) {
    where.OR = [
      { whatsappNumber: { contains: search, mode: 'insensitive' } },
      { flat: { name: { contains: search, mode: 'insensitive' } } },
      { flat: { code: { contains: search, mode: 'insensitive' } } },
      { user: { name: { contains: search, mode: 'insensitive' } } },
    ]
  }

  const [data, total] = await Promise.all([
    prisma.tenant.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        flat: { include: { electricMeter: true, gasMeter: true } },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.tenant.count({ where }),
  ])

  return {
    success: true,
    data: data.map((t) => mapTenant(t as unknown as Record<string, unknown>)),
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  }
})
