import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { authService } from '~/services/authService'

interface SessionData {
  user: { name: string; userType: string } | null
}

export const useAuthStore = defineStore('auth', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const session = ref<SessionData | null>(null)

  async function fetchSession() {
    try {
      const data = await $fetch<SessionData>('/api/auth/get-session')
      session.value = data
    } catch {
      session.value = null
    }
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null

    try {
      const result = await authService.login(email, password)
      if (result.error) {
        const msg = (result.error as unknown as Error).message || 'Invalid email or password'
        error.value = msg
        message.error(msg)
        return { success: false, error: msg }
      }
      message.success('Signed in successfully')
      return { success: true }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed. Please try again.'
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  async function signup(name: string, email: string, password: string, phone?: string, nid?: string) {
    loading.value = true
    error.value = null

    try {
      const result = await authService.signup(name, email, password, phone, nid)
      if (result.error) {
        const msg = (result.error as unknown as Error).message || 'Failed to create account'
        error.value = msg
        message.error(msg)
        return { success: false, error: msg }
      }
      message.success('Account created successfully')
      return { success: true }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create account. Please try again.'
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  async function googleSignIn() {
    loading.value = true
    error.value = null

    try {
      const { error: err } = await authService.googleSignIn()
      if (err) {
        const msg = (err as unknown as Error).message || 'Google sign in failed'
        error.value = msg
        message.error(msg)
        return { success: false, error: msg }
      }
      return { success: true }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign in failed. Please try again.'
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  async function googleSignUp() {
    loading.value = true
    error.value = null

    try {
      const { error: err } = await authService.googleSignUp()
      if (err) {
        const msg = (err as unknown as Error).message || 'Google sign up failed'
        error.value = msg
        message.error(msg)
        return { success: false, error: msg }
      }
      return { success: true }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign up failed. Please try again.'
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await authService.logout()
      await navigateTo('/auth/login')
      message.success('Signed out successfully')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign out failed'
      message.error(msg)
    }
  }

  return {
    loading,
    error,
    session,
    fetchSession,
    login,
    signup,
    googleSignIn,
    googleSignUp,
    logout,
  }
})
