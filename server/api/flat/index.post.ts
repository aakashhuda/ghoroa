import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { name, code, floor, electricMeterId, gasMeterId, flatDetails } = body

  if (!name || !code || floor === undefined || !electricMeterId || !gasMeterId) {
    throw createError({ statusCode: 400, message: 'name, code, floor, electricMeterId, and gasMeterId are required' })
  }

  const flat = await prisma.flat.create({
    data: {
      name,
      code,
      floor,
      electricMeterId,
      gasMeterId,
      flatDetails: flatDetails || {},
    },
    include: {
      electricMeter: true,
      gasMeter: true,
    },
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
})
