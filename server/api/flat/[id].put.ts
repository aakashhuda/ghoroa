import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Flat ID is required' })
  }

  const body = await readBody(event)
  const { name, code, floor, electricMeterId, gasMeterId, flatDetails } = body

  const flat = await prisma.flat.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(code !== undefined && { code }),
      ...(floor !== undefined && { floor }),
      ...(electricMeterId !== undefined && { electricMeterId }),
      ...(gasMeterId !== undefined && { gasMeterId }),
      ...(flatDetails !== undefined && { flatDetails }),
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
