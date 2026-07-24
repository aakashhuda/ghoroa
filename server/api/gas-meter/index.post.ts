import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateBody } from '../../../shared/validators/validate-body'
import { gasMeterSchema } from '../../../shared/schemas/gas-meter.schema'
import { handlePrismaError } from '../../../shared/errors/prisma-error'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { name, meterNo } = await validateBody(event, gasMeterSchema)

  try {
    const meter = await prisma.gasMeter.create({
      data: { name, meterNo },
    })
    return { success: true, data: { ...meter, meterNo: Number(meter.meterNo) } }
  } catch (err) {
    handlePrismaError(err)
  }
})
