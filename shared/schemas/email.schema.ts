import { z } from 'zod'

export const emailSchema = z.object({
  to: z.string().email('Invalid recipient email'),
  subject: z.string().min(1, 'Subject is required'),
  html: z.string().min(1, 'HTML body is required'),
})

export type EmailInput = z.infer<typeof emailSchema>
