import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateBody } from '../../../shared/validators/validate-body'
import { tenantSchema } from '../../../shared/schemas/tenant.schema'
import { handlePrismaError } from '../../../shared/errors/prisma-error'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { name, email, phone, nid, image, flatId, whatsappNumber, headCount, rent, utilities, advance, joinDate } =
    await validateBody(event, tenantSchema)

  try {
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
          headCount,
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
  } catch (err) {
    handlePrismaError(err)
  }
})
