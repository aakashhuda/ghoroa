import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const query = getQuery(event)
  const search = (query.search as string) || ''
  const dateFrom = query.dateFrom as string | undefined
  const dateTo = query.dateTo as string | undefined
  const page = Math.max(1, parseInt((query.page as string) || '1'))
  const pageSize = Math.min(100, Math.max(1, parseInt((query.pageSize as string) || '10')))

  const where: Record<string, unknown> = {}

  if (search) {
    where.OR = [
      { tenant: { user: { name: { contains: search, mode: 'insensitive' } } } },
      { tenant: { flat: { name: { contains: search, mode: 'insensitive' } } } },
    ]
  }

  if (dateFrom || dateTo) {
    const createdAt: Record<string, string> = {}
    if (dateFrom) createdAt.gte = dateFrom
    if (dateTo) createdAt.lte = dateTo
    where.createdAt = createdAt
  }

  const [data, total] = await Promise.all([
    prisma.rentTransaction.findMany({
      where,
      include: {
        tenant: {
          include: {
            user: { select: { id: true, name: true } },
            flat: { select: { id: true, name: true, code: true } },
          },
        },
        receivedBy: { select: { id: true, name: true } },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.rentTransaction.count({ where }),
  ])

  return {
    success: true,
    data: data.map((tx) => ({ ...tx, amount: Number(tx.amount) })),
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  }
})
