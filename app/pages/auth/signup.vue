<template>
  <AuthSignup />
</template>

<script setup lang="ts">
import { useSession } from '~/lib/auth-client'

definePageMeta({ layout: 'auth' })

const { data: session } = useSession()

// If already authenticated, redirect away
watchEffect(() => {
  if (session?.value?.user) {
    navigateTo('/dashboard')
  }
})
</script>
