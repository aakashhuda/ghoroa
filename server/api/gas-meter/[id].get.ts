import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { mapGasMeterDisplay } from '../../utils/mapDisplayValues'
import { validateParams } from '../../../shared/validators/validate-params'
import { idParamSchema } from '../../../shared/schemas/common.schema'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id } = validateParams(event, idParamSchema)

  const meter = await prisma.gasMeter.findUnique({
    where: { id },
    include: { flat: { select: { id: true, name: true, code: true } } },
  })

  if (!meter) {
    throw createError({ statusCode: 404, message: 'Gas meter not found' })
  }

  return { success: true, data: mapGasMeterDisplay({ ...meter, meterNo: Number(meter.meterNo) }) }
})
