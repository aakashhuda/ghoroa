import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const query = getQuery(event)
  const search = (query.search as string) || ''
  const page = Math.max(1, parseInt((query.page as string) || '1'))
  const pageSize = Math.min(100, Math.max(1, parseInt((query.pageSize as string) || '10')))

  const where: Record<string, unknown> = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { meterNo: { equals: BigInt(search) } },
    ]
  }

  const [data, total] = await Promise.all([
    prisma.gasMeter.findMany({
      where,
      include: { flat: { select: { id: true, name: true, code: true } } },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { meterNo: 'asc' },
    }),
    prisma.gasMeter.count({ where }),
  ])

  return {
    success: true,
    data: data.map((meter) => ({ ...meter, meterNo: Number(meter.meterNo) })),
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  }
})
