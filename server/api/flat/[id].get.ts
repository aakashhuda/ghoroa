import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { mapFlatDisplay } from '../../utils/mapDisplayValues'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Flat ID is required' })
  }

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
