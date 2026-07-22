import { auth } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Gas meter ID is required' })
  }

  const body = await readBody(event)
  const { name, meterNo } = body

  const meter = await prisma.gasMeter.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(meterNo !== undefined && { meterNo: BigInt(meterNo) }),
    },
  })

  return { success: true, data: { ...meter, meterNo: Number(meter.meterNo) } }
})
