import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { mapFlatDisplay } from '../../utils/mapDisplayValues'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const query = getQuery(event)
  const search = (query.search as string) || ''
  const floor = query.floor ? parseInt(query.floor as string) : undefined
  const unassignedOnly = query.unassigned === 'true'
  const page = Math.max(1, parseInt((query.page as string) || '1'))
  const pageSize = Math.min(100, Math.max(1, parseInt((query.pageSize as string) || '10')))

  const where: Record<string, unknown> = {}

  if (floor !== undefined && !isNaN(floor)) {
    where.floor = floor
  }

  if (unassignedOnly) {
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
