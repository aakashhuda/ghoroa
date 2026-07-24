import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { mapFlatDisplay } from '../../utils/mapDisplayValues'
import { validateParams } from '../../../shared/validators/validate-params'
import { idParamSchema } from '../../../shared/schemas/common.schema'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id } = validateParams(event, idParamSchema)

  const flat = await prisma.flat.findUnique({
    where: { id },
    include: {
      electricMeter: true,
      gasMeter: true,
      tenant: { include: { user: { select: { id: true, name: true, email: true } } } },
    },
  })

  if (!flat) {
    throw createError({ statusCode: 404, message: 'Flat not found' })
  }

  return {
    success: true,
    data: mapFlatDisplay({
      ...flat,
      electricMeter: flat.electricMeter
        ? { ...flat.electricMeter, meterNo: Number(flat.electricMeter.meterNo) }
        : null,
      gasMeter: flat.gasMeter
        ? { ...flat.gasMeter, meterNo: Number(flat.gasMeter.meterNo) }
        : null,
    }),
  }
})
