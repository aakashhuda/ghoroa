import { prisma } from '../../utils/prisma'
import { auth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })

  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { phone, nid } = body

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(phone !== undefined && { phone }),
      ...(nid !== undefined && { nid }),
    },
  })

  return { success: true, data: updatedUser }
})
