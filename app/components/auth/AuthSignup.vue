<template>
  <div>
    <!-- Form Header -->
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-gray-900 mb-3">Create your account</h1>
      <p class="text-base text-gray-500">Join hundreds of property managers</p>
    </div>

    <!-- Register Form -->
    <a-form @submit.prevent="handleSignup" layout="vertical" class="mb-8">
      <!-- Full Name Field -->
      <a-form-item
        label="Full Name"
        :validate-status="errors.name ? 'error' : undefined"
        :help="errors.name || undefined"
      >
        <a-input v-model:value="form.name" placeholder="Your name" @blur="validateName">
          <template #prefix><UserOutlined /></template>
        </a-input>
      </a-form-item>

      <!-- Email Field -->
      <a-form-item
        label="Email Address"
        :validate-status="errors.email ? 'error' : undefined"
        :help="errors.email || undefined"
      >
        <a-input v-model:value="form.email" placeholder="you@company.com" @blur="validateEmail">
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
        <!-- Password Strength -->
        <div v-if="form.password" class="mt-3 flex items-center gap-2.5">
          <a-progress
            :percent="passwordStrength"
            :stroke-color="getPasswordColor()"
            :show-info="false"
            :stroke-width="6"
            class="flex-1"
          />
          <span
            class="text-xs font-semibold whitespace-nowrap"
            :class="passwordStrengthClass"
          >
            {{ getPasswordLabel() }}
          </span>
        </div>
      </a-form-item>

      <!-- Confirm Password Field -->
      <a-form-item
        label="Confirm Password"
        :validate-status="errors.confirmPassword ? 'error' : undefined"
        :help="errors.confirmPassword || undefined"
      >
        <a-input-password
          v-model:value="form.confirmPassword"
          placeholder="••••••••"
          @blur="validateConfirmPassword"
        >
          <template #prefix><LockOutlined /></template>
        </a-input-password>
      </a-form-item>

      <!-- Terms Checkbox -->
      <a-form-item
        :validate-status="errors.agreedToTerms ? 'error' : undefined"
        :help="errors.agreedToTerms || undefined"
      >
        <a-checkbox v-model:checked="form.agreedToTerms">
          I agree to the
          <a href="#" class="text-green-600 hover:text-green-700 font-medium"
            >Terms of Service</a
          >
          and
          <a href="#" class="text-green-600 hover:text-green-700 font-medium">Privacy Policy</a>
        </a-checkbox>
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
          Create Account
          <ArrowRightOutlined />
        </a-button>
      </a-form-item>
    </a-form>

    <!-- Divider -->
    <a-divider class="text-xs text-gray-500 uppercase tracking-wide">Or sign up with</a-divider>

    <!-- OAuth Buttons -->
    <div class="space-y-3 mb-8">
      <a-button class="auth-oauth-btn" block @click="handleGoogleSignUp">
        <GoogleOutlined class="text-lg" />
        <span class="font-medium ml-3">Google</span>
      </a-button>
    </div>

    <!-- Sign In Link -->
    <div class="text-center">
      <p class="text-sm text-gray-600">
        Already have an account?
        <NuxtLink
          to="/auth/login"
          class="font-semibold text-green-600 hover:text-green-700 transition-colors"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons-vue'
import { signUp } from '~/lib/auth-client'

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreedToTerms: false,
})

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreedToTerms: '',
})

const generalError = ref('')
const isLoading = ref(false)

const passwordStrength = computed(() => {
  const pwd = form.value.password
  let strength = 0

  if (pwd.length >= 8) strength += 25
  if (pwd.length >= 12) strength += 25
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25
  if (/[0-9]/.test(pwd)) strength += 13
  if (/[^a-zA-Z0-9]/.test(pwd)) strength += 12

  return Math.min(strength, 100)
})

function getPasswordColor(): string {
  const strength = passwordStrength.value
  if (strength < 33) return '#ef4444'
  if (strength < 66) return '#ea580c'
  return '#16a34a'
}

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value
  if (strength < 33) return 'text-red-500'
  if (strength < 66) return 'text-orange-500'
  return 'text-green-600'
})

function getPasswordLabel(): string {
  const strength = passwordStrength.value
  if (strength < 33) return 'Weak'
  if (strength < 66) return 'Fair'
  return 'Strong'
}

function validateName(): void {
  const name = form.value.name.trim()
  if (!name) {
    errors.value.name = 'Name is required'
  } else if (name.length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
  } else {
    errors.value.name = ''
  }
}

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
  const pwd = form.value.password
  if (!pwd) {
    errors.value.password = 'Password is required'
  } else if (pwd.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  } else {
    errors.value.password = ''
  }
}

function validateConfirmPassword(): void {
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password'
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = ''
  }
}

function validateForm(): boolean {
  validateName()
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  if (!form.value.agreedToTerms) {
    errors.value.agreedToTerms = 'You must agree to the terms'
  } else {
    errors.value.agreedToTerms = ''
  }

  return !(
    errors.value.name ||
    errors.value.email ||
    errors.value.password ||
    errors.value.confirmPassword ||
    errors.value.agreedToTerms
  )
}

async function handleSignup(): Promise<void> {
  if (!validateForm()) return

  isLoading.value = true
  generalError.value = ''

  try {
    const { error } = await signUp.email({
      name: form.value.name.trim(),
      email: form.value.email,
      password: form.value.password,
    })

    if (error) {
      generalError.value = (error as Error).message || 'Failed to create account'
    } else {
      await navigateTo('/dashboard')
    }
  } catch (err: unknown) {
    generalError.value = err instanceof Error ? err.message : 'Failed to create account. Please try again.'
  } finally {
    isLoading.value = false
  }
}

async function handleGoogleSignUp(): Promise<void> {
  try {
    const { error } = await signUp.social({ provider: 'google' })
    if (error) {
      generalError.value = (error as Error).message || 'Google sign up failed'
    }
  } catch (err: unknown) {
    generalError.value = err instanceof Error ? err.message : 'Google sign up failed. Please try again.'
  }
}
</script>

<style scoped>
.auth-btn {
  height: 48px !important;
  font-weight: 600 !important;
  font-size: 15px !important;
  border-radius: 12px !important;
}

.auth-oauth-btn {
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 48px !important;
  font-weight: 500 !important;
  font-size: 15px !important;
  border-radius: 12px !important;
}
</style>
