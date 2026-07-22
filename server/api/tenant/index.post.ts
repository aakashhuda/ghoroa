import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { flatId, userId, whatsappNumber, headCount, rent, utilities, advance, joinDate } = body

  if (!flatId || !userId || !rent || !joinDate) {
    throw createError({ statusCode: 400, message: 'flatId, userId, rent, and joinDate are required' })
  }

  const tenant = await prisma.tenant.create({
    data: {
      flatId,
      userId,
      whatsappNumber,
      headCount: headCount || 1,
      rent,
      utilities,
      advance,
      joinDate: new Date(joinDate),
    },
    include: {
      user: { select: { id: true, name: true, email: true, phone: true } },
      flat: { include: { electricMeter: true, gasMeter: true } },
    },
  })

  return {
    success: true,
    data: mapTenant(tenant as unknown as Record<string, unknown>),
  }
})
