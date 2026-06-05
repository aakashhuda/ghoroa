<template>
  <AuthSignup />
</template>

<script setup lang="ts">
import { useSession } from '~/lib/auth-client'

definePageMeta({ layout: 'auth' })

const session = useSession()

watchEffect(() => {
  if (session.value?.data?.user) {
    navigateTo('/dashboard')
  }
})
</script>
