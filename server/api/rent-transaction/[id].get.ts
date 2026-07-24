import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateParams } from '../../../shared/validators/validate-params'
import { idParamSchema } from '../../../shared/schemas/common.schema'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id } = validateParams(event, idParamSchema)

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
