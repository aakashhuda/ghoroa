import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Tenant ID is required' })
  }

  const body = await readBody(event)
  const { flatId, userId, whatsappNumber, headCount, rent, utilities, advance, joinDate } = body

  const tenant = await prisma.tenant.update({
    where: { id },
    data: {
      ...(flatId !== undefined && { flatId }),
      ...(userId !== undefined && { userId }),
      ...(whatsappNumber !== undefined && { whatsappNumber }),
      ...(headCount !== undefined && { headCount }),
      ...(rent !== undefined && { rent }),
      ...(utilities !== undefined && { utilities }),
      ...(advance !== undefined && { advance }),
      ...(joinDate !== undefined && { joinDate: new Date(joinDate) }),
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
