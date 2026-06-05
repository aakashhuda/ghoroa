<template>
  <div>
    <!-- Form Header -->
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-gray-900 mb-3">Welcome back</h1>
      <p class="text-base text-gray-500">Sign in to manage your properties</p>
    </div>

    <!-- Login Form -->
    <a-form @submit.prevent="handleLogin" layout="vertical" class="mb-6">
      <!-- Email Field -->
      <a-form-item
        label="Email Address"
        :validate-status="errors.email ? 'error' : undefined"
        :help="errors.email || undefined"
      >
        <a-input v-model:value="form.email" placeholder="admin@ghoroa.app" @blur="validateEmail">
          <template #prefix><MailOutlined /></template>
        </a-input>
      </a-form-item>

      <!-- Password Field -->
      <a-form-item
        label="Password"
        :validate-status="errors.password ? 'error' : undefined"
        :help="errors.password || undefined"
      >
        <a-input-password
          v-model:value="form.password"
          placeholder="••••••••"
          @blur="validatePassword"
        >
          <template #prefix><LockOutlined /></template>
        </a-input-password>
      </a-form-item>

      <!-- Error Alert -->
      <a-alert
        v-if="generalError"
        type="error"
        :message="generalError"
        show-icon
        closable
        class="mb-4"
        @close="generalError = ''"
      />

      <!-- Submit Button -->
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="custom-gradient-btn auth-btn"
          :loading="isLoading"
          block
        >
          Sign In
          <ArrowRightOutlined />
        </a-button>
      </a-form-item>
    </a-form>

    <!-- Forgot Password -->
    <div class="text-center mb-8">
      <NuxtLink
        to="/forgot-password"
        class="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
      >
        Forgot your password?
      </NuxtLink>
    </div>

    <!-- Divider -->
    <a-divider class="text-xs text-gray-500 uppercase tracking-wide">Or continue with</a-divider>

    <!-- OAuth Buttons -->
    <div class="space-y-3 mb-8">
      <a-button class="auth-oauth-btn" block @click="handleGoogleSignIn">
        <GoogleOutlined class="text-lg" />
        <span class="font-medium ml-3">Google</span>
      </a-button>
    </div>

    <!-- Sign Up Link -->
    <div class="text-center mb-8">
      <p class="text-sm text-gray-600">
        Don't have an account?
        <NuxtLink
          to="/auth/signup"
          class="font-semibold text-green-600 hover:text-green-700 transition-colors"
        >
          Create one
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons-vue'
import { useAuth } from '~/composables/useAuth'

const { login, googleSignIn, isLoading } = useAuth()

const form = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: '',
  password: '',
})

const generalError = ref('')

function validateEmail(): void {
  const email = form.value.email.trim()
  if (!email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.value.email = 'Invalid email address'
  } else {
    errors.value.email = ''
  }
}

function validatePassword(): void {
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else {
    errors.value.password = ''
  }
}

function validateForm(): boolean {
  validateEmail()
  validatePassword()
  return !errors.value.email && !errors.value.password
}

async function handleLogin(): Promise<void> {
  if (!validateForm()) return

  generalError.value = ''

  const result = await login(form.value.email, form.value.password)

  if (result.success) {
    await navigateTo('/dashboard')
  } else if (result.error) {
    generalError.value = result.error
  }
}

async function handleGoogleSignIn(): Promise<void> {
  generalError.value = ''
  const result = await googleSignIn()
  if (!result.success && result.error) {
    generalError.value = result.error
  }
}
</script>
