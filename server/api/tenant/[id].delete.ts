import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateParams } from '../../../shared/validators/validate-params'
import { idParamSchema } from '../../../shared/schemas/common.schema'
import { handlePrismaError } from '../../../shared/errors/prisma-error'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id } = validateParams(event, idParamSchema)

  const tenant = await prisma.tenant.findUnique({ where: { id }, select: { userId: true } })
  if (!tenant) {
    throw createError({ statusCode: 404, message: 'Tenant not found' })
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.tenant.delete({ where: { id } })
      await tx.user.delete({ where: { id: tenant.userId } })
    })

    return { success: true }
  } catch (err) {
    handlePrismaError(err)
  }
})
