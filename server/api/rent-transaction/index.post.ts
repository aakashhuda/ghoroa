import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateBody } from '../../../shared/validators/validate-body'
import { rentTransactionSchema } from '../../../shared/schemas/rent-transaction.schema'
import { handlePrismaError } from '../../../shared/errors/prisma-error'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { tenantId, amount, receivedById } = await validateBody(event, rentTransactionSchema)

  try {
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
  } catch (err) {
    handlePrismaError(err)
  }
})
