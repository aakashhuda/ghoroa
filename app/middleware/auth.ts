export default defineNuxtRouteMiddleware(async (to) => {
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : {}

  try {
    const session: any = await $fetch('/api/auth/get-session', { headers })
    if (!session?.user) {
      return navigateTo(`/auth/login?redirect=${to.fullPath}`)
    }
  } catch {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }
})
