import { useAuthStore } from '~/stores/useAuthStore'

export function useAuth() {
  const store = useAuthStore()

  const userName = computed(() => store.session?.user?.name || 'User')
  const userRole = computed(() => {
    const type = store.session?.user?.userType
    if (!type) return 'User'
    return type
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c: string) => c.toUpperCase())
  })

  function validateResetPasswordForm(form: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }) {
    const errors = { currentPassword: '', newPassword: '', confirmPassword: '' }

    if (!form.currentPassword) {
      errors.currentPassword = 'Current password is required'
    }
    if (!form.newPassword) {
      errors.newPassword = 'New password is required'
    } else if (form.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters'
    }
    if (!form.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password'
    } else if (form.confirmPassword !== form.newPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    return errors
  }

  return {
    isLoading: computed(() => store.loading),
    error: computed(() => store.error),
    session: computed(() => store.session),
    userName,
    userRole,
    fetchSession: () => store.fetchSession(),
    login: (email: string, password: string) => store.login(email, password),
    signup: (name: string, email: string, password: string, phone?: string, nid?: string) =>
      store.signup(name, email, password, phone, nid),
    googleSignIn: () => store.googleSignIn(),
    googleSignUp: () => store.googleSignUp(),
    resetPassword: (currentPassword: string, newPassword: string) =>
      store.resetPassword(currentPassword, newPassword),
    validateResetPasswordForm,
    logout: () => store.logout(),
  }
}
