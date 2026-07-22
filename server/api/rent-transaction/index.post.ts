import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { tenantId, amount, receivedById } = body

  if (!tenantId || !amount || !receivedById) {
    throw createError({ statusCode: 400, message: 'tenantId, amount, and receivedById are required' })
  }

  const transaction = await prisma.rentTransaction.create({
    data: { tenantId, amount, receivedById },
    include: {
      tenant: {
        include: {
          user: { select: { id: true, name: true } },
          flat: { select: { id: true, name: true, code: true } },
        },
      },
      receivedBy: { select: { id: true, name: true } },
    },
  })

  return { success: true, data: { ...transaction, amount: Number(transaction.amount) } }
})
