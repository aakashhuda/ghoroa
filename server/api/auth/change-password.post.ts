import { auth } from '../../utils/auth'
import { sendEmail } from '../../utils/email'
import { validateBody } from '../../../shared/validators/validate-body'
import { changePasswordSchema } from '../../../shared/schemas/auth.schema'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user?.email) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { currentPassword, newPassword } = await validateBody(event, changePasswordSchema)

  let result
  try {
    result = await auth.api.changePassword({
      headers: event.headers,
      body: { currentPassword, newPassword },
    })
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Failed to change password',
    }
  }

  if (result?.error) {
    return { success: false, message: result.message }
  }

  try {
    await sendEmail({
      to: session.user.email,
      subject: 'Your Ghoroa Password Has Been Changed',
      html: `
        <h1>Password Changed Successfully</h1>
        <p>Your Ghoroa account password has been changed successfully.</p>
        <p>If you did not make this change, please contact support immediately.</p>
      `,
    })
  } catch {
    // Email failure does not revert password change
  }

  return { success: true }
})
