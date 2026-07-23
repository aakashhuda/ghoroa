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

  const tenant = await prisma.tenant.findUnique({ where: { id }, select: { userId: true } })
  if (!tenant) {
    throw createError({ statusCode: 404, message: 'Tenant not found' })
  }

  await prisma.$transaction(async (tx) => {
    await tx.tenant.delete({ where: { id } })
    await tx.user.delete({ where: { id: tenant.userId } })
  })

  return { success: true }
})
