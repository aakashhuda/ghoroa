import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { validateParams } from '../../../shared/validators/validate-params'
import { validateBody } from '../../../shared/validators/validate-body'
import { idParamSchema } from '../../../shared/schemas/common.schema'
import { tenantUpdateSchema } from '../../../shared/schemas/tenant.schema'
import { handlePrismaError } from '../../../shared/errors/prisma-error'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { id } = validateParams(event, idParamSchema)
  const body = await validateBody(event, tenantUpdateSchema)
  const { name, nid, image, flatId, whatsappNumber, headCount, rent, utilities, advance, joinDate } = body

  try {
    const tenant = await prisma.$transaction(async (tx) => {
      const existingTenant = await tx.tenant.findUnique({
        where: { id },
        select: { userId: true },
      })

      if (!existingTenant) {
        throw createError({ statusCode: 404, message: 'Tenant not found' })
      }

      if (name !== undefined || nid !== undefined || image !== undefined) {
        await tx.user.update({
          where: { id: existingTenant.userId },
          data: {
            ...(name !== undefined && { name }),
            ...(nid !== undefined && { nid }),
            ...(image !== undefined && { image }),
          },
        })
      }

      return tx.tenant.update({
        where: { id },
        data: {
          ...(flatId !== undefined && { flatId }),
          ...(whatsappNumber !== undefined && { whatsappNumber }),
          ...(headCount !== undefined && { headCount }),
          ...(rent !== undefined && { rent }),
          ...(utilities !== undefined && { utilities }),
          ...(advance !== undefined && { advance }),
          ...(joinDate !== undefined && { joinDate: new Date(joinDate) }),
        },
        include: {
          user: { select: { id: true, name: true, email: true, phone: true, nid: true, image: true } },
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
