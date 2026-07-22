import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { name, meterNo } = body

  if (!meterNo) {
    throw createError({ statusCode: 400, message: 'meterNo is required' })
  }

  const meter = await prisma.gasMeter.create({
    data: { name, meterNo: BigInt(meterNo) },
  })

  return { success: true, data: { ...meter, meterNo: Number(meter.meterNo) } }
})
