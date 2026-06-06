import { signIn, signUp, signOut } from '~/lib/auth-client'

export const authService = {
  async login(email: string, password: string) {
    const { data, error } = await signIn.email({ email, password })
    return { data, error }
  },

  async signup(name: string, email: string, password: string, phone?: string, nid?: string) {
    const { data, error } = await signUp.email({ name, email, password })
    if (error) return { data, error }

    if (phone || nid) {
      try {
        await $fetch('/api/auth/profile', {
          method: 'PUT',
          body: { phone, nid },
        })
      } catch {
        // Profile update is non-critical; signup succeeded
      }
    }

    return { data, error: null }
  },

  async googleSignIn() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (signIn as any).social({ provider: 'google' })
  },

  async googleSignUp() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (signUp as any).social({ provider: 'google' })
  },

  async resetPassword(currentPassword: string, newPassword: string) {
    const verifyResult = await $fetch('/api/auth/verify-password', {
      method: 'POST',
      body: { password: currentPassword },
    })

    if (!verifyResult.success) {
      throw new Error(verifyResult.message || 'Current password is incorrect')
    }

    const changeResult = await $fetch('/api/auth/change-password', {
      method: 'POST',
      body: { currentPassword, newPassword },
    })

    if (!changeResult.success) {
      throw new Error(changeResult.message || 'Failed to change password')
    }

    return changeResult
  },

  async logout() {
    await signOut()
  },
}
