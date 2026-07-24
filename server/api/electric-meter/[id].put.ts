import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateParams } from '../../../shared/validators/validate-params'
import { validateBody } from '../../../shared/validators/validate-body'
import { idParamSchema } from '../../../shared/schemas/common.schema'
import { electricMeterUpdateSchema } from '../../../shared/schemas/electric-meter.schema'
import { handlePrismaError } from '../../../shared/errors/prisma-error'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id } = validateParams(event, idParamSchema)
  const body = await validateBody(event, electricMeterUpdateSchema)

  try {
    const meter = await prisma.electricMeter.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.meterNo !== undefined && { meterNo: body.meterNo }),
      },
    })
    return { success: true, data: { ...meter, meterNo: Number(meter.meterNo) } }
  } catch (err) {
    handlePrismaError(err)
  }
})
