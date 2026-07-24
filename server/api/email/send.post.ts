import { sendEmail } from '../../utils/email'
import { validateBody } from '../../../shared/validators/validate-body'
import { emailSchema } from '../../../shared/schemas/email.schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await validateBody(event, emailSchema)

    await sendEmail(body)

    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email',
    })
  }
})
