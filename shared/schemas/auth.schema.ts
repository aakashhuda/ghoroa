import { z } from 'zod'

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
})

export const verifyPasswordSchema = z.object({
  password: z.string().min(1, 'Password is required'),
})

export const profileUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().optional().nullable(),
  nid: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
})

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type VerifyPasswordInput = z.infer<typeof verifyPasswordSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
