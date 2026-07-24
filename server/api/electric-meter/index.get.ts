import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { mapElectricMeterDisplay } from '../../utils/mapDisplayValues'
import { validateQuery } from '../../../shared/validators/validate-query'
import { electricMeterQuerySchema } from '../../../shared/schemas/electric-meter.schema'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { search, page, pageSize } = validateQuery(event, electricMeterQuerySchema)

  const where: Record<string, unknown> = {}

  if (search) {
    where.OR = [{ name: { contains: search, mode: 'insensitive' } }]
    const searchAsNumber = Number(search)
    if (!isNaN(searchAsNumber) && Number.isInteger(searchAsNumber) && searchAsNumber > 0) {
      where.OR.push({ meterNo: { equals: BigInt(search) } })
    }
  }

  const [data, total] = await Promise.all([
    prisma.electricMeter.findMany({
      where,
      include: { flat: { select: { id: true, name: true, code: true } } },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { meterNo: 'asc' },
    }),
    prisma.electricMeter.count({ where }),
  ])

  return {
    success: true,
    data: data.map((meter) => mapElectricMeterDisplay({ ...meter, meterNo: Number(meter.meterNo) })),
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  }
})
