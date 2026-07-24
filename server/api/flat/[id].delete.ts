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

  const flat = await prisma.flat.findUnique({
    where: { id },
    include: { electricMeter: true, gasMeter: true },
  })

  if (!flat) {
    throw createError({ statusCode: 404, message: 'Flat not found' })
  }

  try {
    await prisma.flat.delete({ where: { id } })

    if (flat.electricMeterId) {
      await prisma.electricMeter.delete({ where: { id: flat.electricMeterId } }).catch(() => {})
    }
    if (flat.gasMeterId) {
      await prisma.gasMeter.delete({ where: { id: flat.gasMeterId } }).catch(() => {})
    }

    return { success: true }
  } catch (err) {
    handlePrismaError(err)
  }
})
