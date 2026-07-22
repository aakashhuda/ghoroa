import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Tenant ID is required' })
  }

  const tenant = await prisma.tenant.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, phone: true, nid: true } },
      flat: { include: { electricMeter: true, gasMeter: true } },
      rentTransactions: {
        include: { receivedBy: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!tenant) {
    throw createError({ statusCode: 404, message: 'Tenant not found' })
  }

  return {
    success: true,
    data: {
      ...mapTenant(tenant as unknown as Record<string, unknown>),
      rentTransactions: tenant.rentTransactions.map((tx) => ({
        ...tx,
        amount: Number(tx.amount),
      })),
    },
  }
})
