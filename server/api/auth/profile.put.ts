import { prisma } from '../../utils/prisma'
import { auth } from '../../utils/auth'
import { validateBody } from '../../../shared/validators/validate-body'
import { profileUpdateSchema } from '../../../shared/schemas/auth.schema'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })

  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { phone, nid } = await validateBody(event, profileUpdateSchema)

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(phone !== undefined && { phone }),
      ...(nid !== undefined && { nid }),
    },
  })

  return { success: true, data: updatedUser }
})
