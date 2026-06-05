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
    logout: () => store.logout(),
  }
}
