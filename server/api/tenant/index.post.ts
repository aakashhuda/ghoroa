import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { name, email, phone, nid, image, flatId, whatsappNumber, headCount, rent, utilities, advance, joinDate } = body

  if (!email || !flatId || !rent || !joinDate) {
    throw createError({ statusCode: 400, message: 'name, email, flatId, rent, and joinDate are required' })
  }

  const tenant = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        phone,
        nid,
        image,
        userType: 'TENANT',
      },
    })

    return tx.tenant.create({
      data: {
        flatId,
        userId: user.id,
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
  })

  return {
    success: true,
    data: mapTenant(tenant as unknown as Record<string, unknown>),
  }
})
