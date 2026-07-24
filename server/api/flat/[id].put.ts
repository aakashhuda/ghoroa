import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateParams } from '../../../shared/validators/validate-params'
import { validateBody } from '../../../shared/validators/validate-body'
import { idParamSchema } from '../../../shared/schemas/common.schema'
import { flatUpdateSchema } from '../../../shared/schemas/flat.schema'
import { handlePrismaError } from '../../../shared/errors/prisma-error'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id } = validateParams(event, idParamSchema)
  const body = await validateBody(event, flatUpdateSchema)

  try {
    const flat = await prisma.flat.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.code !== undefined && { code: body.code }),
        ...(body.floor !== undefined && { floor: body.floor }),
        ...(body.electricMeterId !== undefined && { electricMeterId: body.electricMeterId }),
        ...(body.gasMeterId !== undefined && { gasMeterId: body.gasMeterId }),
        ...(body.flatDetails !== undefined && { flatDetails: body.flatDetails }),
      },
      include: { electricMeter: true, gasMeter: true },
    })

    return {
      success: true,
      data: {
        ...flat,
        electricMeter: flat.electricMeter
          ? { ...flat.electricMeter, meterNo: Number(flat.electricMeter.meterNo) }
          : null,
        gasMeter: flat.gasMeter
          ? { ...flat.gasMeter, meterNo: Number(flat.gasMeter.meterNo) }
          : null,
      },
    }
  } catch (err) {
    handlePrismaError(err)
  }
})
