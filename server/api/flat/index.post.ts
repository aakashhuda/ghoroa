import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateBody } from '../../../shared/validators/validate-body'
import { flatSchema } from '../../../shared/schemas/flat.schema'
import { handlePrismaError } from '../../../shared/errors/prisma-error'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { name, code, floor, electricMeterId, gasMeterId, flatDetails } = await validateBody(event, flatSchema)

  try {
    const flat = await prisma.flat.create({
      data: { name, code, floor, electricMeterId, gasMeterId, flatDetails },
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
