import { auth } from '../../utils/auth'
import { validateBody } from '../../../shared/validators/validate-body'
import { verifyPasswordSchema } from '../../../shared/schemas/auth.schema'

export default defineEventHandler(async (event) => {
  try {
    const session = await auth.api.getSession({ headers: event.headers })
    if (!session?.user) {
      return { success: false, message: 'Unauthorized' }
    }

    const { password } = await validateBody(event, verifyPasswordSchema)

    const result = await auth.api.verifyPassword({
      body: { password },
      headers: event.headers,
    })

    if (result?.error) {
      return { success: false, message: result.message || 'Current password is incorrect' }
    }

    return { success: true }
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Current password is incorrect',
    }
  }
})
