import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateQuery } from '../../../shared/validators/validate-query'
import { rentTransactionQuerySchema } from '../../../shared/schemas/rent-transaction.schema'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { search, dateFrom, dateTo, page, pageSize } = validateQuery(event, rentTransactionQuerySchema)

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
