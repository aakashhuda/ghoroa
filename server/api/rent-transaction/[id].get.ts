import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Rent transaction ID is required' })
  }

  const transaction = await prisma.rentTransaction.findUnique({
    where: { id },
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

  if (!transaction) {
    throw createError({ statusCode: 404, message: 'Rent transaction not found' })
  }

  return { success: true, data: { ...transaction, amount: Number(transaction.amount) } }
})
