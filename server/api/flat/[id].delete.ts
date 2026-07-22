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

  const flat = await prisma.flat.findUnique({
    where: { id },
    include: { electricMeter: true, gasMeter: true },
  })

  if (!flat) {
    throw createError({ statusCode: 404, message: 'Flat not found' })
  }

  // Delete flat first, then optionally delete orphaned meters
  await prisma.flat.delete({ where: { id } })

  // Optionally delete orphaned meters (now unlinked from the flat)
  if (flat.electricMeterId) {
    await prisma.electricMeter.delete({ where: { id: flat.electricMeterId } }).catch(() => {})
  }
  if (flat.gasMeterId) {
    await prisma.gasMeter.delete({ where: { id: flat.gasMeterId } }).catch(() => {})
  }

  return { success: true }
})
