import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { mapFlatDisplay } from '../../utils/mapDisplayValues'
import { validateQuery } from '../../../shared/validators/validate-query'
import { flatQuerySchema } from '../../../shared/schemas/flat.schema'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { search, floor, unassigned, page, pageSize } = validateQuery(event, flatQuerySchema)

  const where: Record<string, unknown> = {}

  if (floor !== undefined) {
    where.floor = floor
  }

  if (unassigned === 'true') {
    where.tenant = null
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { code: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [data, total] = await Promise.all([
    prisma.flat.findMany({
      where,
      include: {
        electricMeter: true,
        gasMeter: true,
        tenant: { include: { user: { select: { id: true, name: true } } } },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { code: 'asc' },
    }),
    prisma.flat.count({ where }),
  ])

  return {
    success: true,
    data: data.map((flat) => mapFlatDisplay({
      ...flat,
      electricMeter: flat.electricMeter
        ? { ...flat.electricMeter, meterNo: Number(flat.electricMeter.meterNo) }
        : null,
      gasMeter: flat.gasMeter
        ? { ...flat.gasMeter, meterNo: Number(flat.gasMeter.meterNo) }
        : null,
    })),
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  }
})
