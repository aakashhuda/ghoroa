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

  async logout() {
    await signOut()
  },
}
