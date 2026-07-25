<template>
  <div class="max-w-lg mx-auto card p-5">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Forgot Password</h1>
      <p class="text-base text-gray-500 mt-1">
        Enter your email and we'll send you a reset link
      </p>
    </div>

    <a-form @submit.prevent="handleForgotPassword" layout="vertical">
      <a-form-item label="Email Address">
        <a-input v-model:value="email" placeholder="admin@ghoroa.app">
          <template #prefix><MailOutlined /></template>
        </a-input>
      </a-form-item>

      <a-alert v-if="message" :type="messageType" :message="message" show-icon closable class="mb-4" @close="message = ''" />

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" block size="large">
          Send Reset Link
        </a-button>
      </a-form-item>
    </a-form>

    <div class="text-center mt-6">
      <NuxtLink to="/auth/login" class="text-sm text-green-600 hover:text-green-700">
        Back to login
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })

import { authClient } from '~/lib/auth-client'
const email = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

async function handleForgotPassword() {
  if (!email.value) return

  loading.value = true
  message.value = ''

  try {
    const { data, error } = await authClient.forgetPassword({ email: email.value })

    if (error) {
      messageType.value = 'error'
      message.value = error.message || 'Something went wrong'
    } else {
      messageType.value = 'success'
      message.value = 'If an account exists with that email, a reset link has been sent.'
    }
  } catch {
    messageType.value = 'success'
    message.value = 'If an account exists with that email, a reset link has been sent.'
  } finally {
    loading.value = false
  }
}
</script>
