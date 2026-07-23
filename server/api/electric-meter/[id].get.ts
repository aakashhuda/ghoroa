import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { mapElectricMeterDisplay } from '../../utils/mapDisplayValues'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Electric meter ID is required' })
  }

  const meter = await prisma.electricMeter.findUnique({
    where: { id },
    include: { flat: { select: { id: true, name: true, code: true } } },
  })

  if (!meter) {
    throw createError({ statusCode: 404, message: 'Electric meter not found' })
  }

  return { success: true, data: mapElectricMeterDisplay({ ...meter, meterNo: Number(meter.meterNo) }) }
})
