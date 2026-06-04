# Auth Page UI Reference

- Login page
- Signup page

## Vue page component reference

### Login

```vue
<template>
  <div class="auth-wrapper">
    <!-- Left Hero Section -->
    <div class="auth-side hidden lg:flex lg:flex-col lg:justify-between">
      <!-- Logo -->
      <div>
        <div class="flex items-center gap-3 mb-20">
          <div
            class="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center text-white text-2xl font-bold"
          >
            🏠
          </div>
          <h1 class="text-3xl font-bold text-white">Ghoroa</h1>
        </div>

        <!-- Hero Content -->
        <div class="space-y-8">
          <div>
            <h2 class="text-5xl font-bold text-white mb-4 leading-tight">
              Manage your property digitally
            </h2>
            <p class="text-lg text-gray-300 leading-relaxed">
              Rent collection, expense tracking, employee management, and
              rooftop farm operations in one platform.
            </p>
          </div>

          <!-- Features -->
          <ul class="space-y-4">
            <li class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-green-300 text-sm font-bold">✓</span>
              </div>
              <div>
                <p class="text-white font-medium mb-0.5">
                  Smart Rent Collection
                </p>
                <p class="text-gray-300 text-sm">
                  Automated tracking and invoicing
                </p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-cyan-300 text-sm font-bold">✓</span>
              </div>
              <div>
                <p class="text-white font-medium mb-0.5">Financial Control</p>
                <p class="text-gray-300 text-sm">
                  Track expenses and analytics
                </p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-green-300 text-sm font-bold">✓</span>
              </div>
              <div>
                <p class="text-white font-medium mb-0.5">
                  Team & Farm Operations
                </p>
                <p class="text-gray-300 text-sm">
                  Employee and business management
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="space-y-4 border-t border-white border-opacity-10 pt-8">
        <p class="text-sm text-gray-300">✓ Trusted by 500+ property managers</p>
        <p class="text-xs text-gray-400">© 2026 Ghoroa. All rights reserved.</p>
      </div>
    </div>

    <!-- Right Form Section -->
    <div class="auth-form-side">
      <div class="w-full max-w-sm">
        <!-- Mobile Logo -->
        <div class="lg:hidden mb-10">
          <div class="flex items-center gap-3 mb-8">
            <div
              class="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white font-bold"
            >
              🏠
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Ghoroa</h1>
          </div>
        </div>

        <!-- Form Header -->
        <div class="mb-10">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">Welcome back</h1>
          <p class="text-base text-gray-500">
            Sign in to manage your properties
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-5 mb-8">
          <!-- Email Field -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3"
              >Email Address</label
            >
            <div class="auth-input-wrapper">
              <MailOutlined class="auth-input-icon" />
              <input
                v-model="form.email"
                type="email"
                placeholder="admin@ghoroa.app"
                class="auth-input"
                @blur="validateEmail"
              />
            </div>
            <transition name="fade">
              <p
                v-if="errors.email"
                class="text-xs text-red-500 mt-2 font-medium"
              >
                {{ errors.email }}
              </p>
            </transition>
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="block text-sm font-semibold text-gray-700"
                >Password</label
              >
              <NuxtLink
                to="/forgot-password"
                class="text-xs font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                Forgot?
              </NuxtLink>
            </div>
            <div class="auth-input-wrapper">
              <LockOutlined class="auth-input-icon" />
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="auth-input"
                @blur="validatePassword"
              />
              <button
                type="button"
                class="auth-input-suffix"
                @click="showPassword = !showPassword"
              >
                <EyeOutlined v-if="!showPassword" />
                <EyeInvisibleOutlined v-else />
              </button>
            </div>
            <transition name="fade">
              <p
                v-if="errors.password"
                class="text-xs text-red-500 mt-2 font-medium"
              >
                {{ errors.password }}
              </p>
            </transition>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center pt-2">
            <input
              id="remember"
              v-model="form.rememberMe"
              type="checkbox"
              class="auth-checkbox"
            />
            <label
              for="remember"
              class="text-sm text-gray-600 ml-2 cursor-pointer"
            >
              Keep me signed in
            </label>
          </div>

          <!-- Error Alert -->
          <transition name="fade">
            <div
              v-if="generalError"
              class="p-4 rounded-xl border border-red-200 bg-red-50"
            >
              <p class="text-sm text-red-700 flex items-center gap-2 m-0">
                <ExclamationCircleOutlined />
                {{ generalError }}
              </p>
            </div>
          </transition>

          <!-- Submit Button -->
          <button
            type="submit"
            class="auth-submit-btn w-full"
            :disabled="isLoading"
          >
            <span
              v-if="!isLoading"
              class="flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRightOutlined />
            </span>
            <span v-else>Signing in...</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative mb-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center">
            <span
              class="px-3 bg-white text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Or continue with</span
            >
          </div>
        </div>

        <!-- OAuth Buttons -->
        <div class="space-y-3 mb-8">
          <button class="auth-oauth-btn w-full">
            <GoogleOutlined class="text-lg" />
            <span class="font-medium ml-3">Google</span>
          </button>

          <button class="auth-oauth-btn w-full">
            <PhoneOutlined class="text-lg" />
            <span class="font-medium ml-3">WhatsApp</span>
          </button>
        </div>

        <!-- Sign Up Link -->
        <div class="text-center mb-8">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <NuxtLink
              to="/register"
              class="font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Create one
            </NuxtLink>
          </p>
        </div>

        <!-- Demo Credentials -->
        <div class="pt-8 border-t border-gray-100">
          <p class="text-xs text-gray-400 text-center mb-3">
            Demo Credentials:
          </p>
          <div class="flex flex-col gap-2 text-xs text-gray-500">
            <div class="flex items-center justify-center gap-2">
              <span
                class="font-mono bg-gray-100 px-3 py-1.5 rounded border border-gray-200 whitespace-nowrap"
              >
                admin@ghoroa.app
              </span>
              <span class="text-gray-300">/</span>
              <span
                class="font-mono bg-gray-100 px-3 py-1.5 rounded border border-gray-200 whitespace-nowrap"
              >
                password123
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  PhoneOutlined,
  ExclamationCircleOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons-vue";

definePageMeta({
  layout: false,
});

const form = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const errors = ref({
  email: "",
  password: "",
});

const generalError = ref("");
const isLoading = ref(false);
const showPassword = ref(false);

function validateEmail() {
  const email = form.value.email.trim();
  if (!email) {
    errors.value.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.value.email = "Invalid email address";
  } else {
    errors.value.email = "";
  }
}

function validatePassword() {
  if (!form.value.password) {
    errors.value.password = "Password is required";
  } else if (form.value.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
  } else {
    errors.value.password = "";
  }
}

async function handleLogin() {
  validateEmail();
  validatePassword();

  if (errors.value.email || errors.value.password) {
    return;
  }

  isLoading.value = true;
  generalError.value = "";

  try {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (
      form.value.email === "admin@ghoroa.app" &&
      form.value.password === "password123"
    ) {
      await navigateTo("/dashboard");
    } else {
      generalError.value =
        "Invalid credentials. Use admin@ghoroa.app / password123";
    }
  } catch (error) {
    generalError.value = "Sign in failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .auth-form-side {
    padding: 24px 16px !important;
  }

  .auth-form-side > div {
    max-width: 100% !important;
  }
}
</style>
```

## CSS Reference

```css
/* ── Auth Pages ──────────────────────────────── */
.auth-form-input {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%) !important;
  border: 1.5px solid #e5e7eb !important;
  border-radius: 12px !important;
  padding: 12px 16px !important;
  height: 48px !important;
  font-size: 15px !important;
  font-weight: 500 !important;
  color: #1f2937 !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}

.auth-form-input::placeholder {
  color: #d1d5db !important;
}

.auth-form-input:hover {
  border-color: #d1d5db !important;
  background: #ffffff !important;
}

.auth-form-input:focus {
  background: #ffffff !important;
  border-color: #16a34a !important;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.08) !important;
  transform: translateY(-1px) !important;
  outline: none !important;
}

.auth-form-input:focus-visible {
  outline: none !important;
}

/* Ant Design Input Overrides */
.ant-input-wrapper {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%) !important;
  border: 1.5px solid #e5e7eb !important;
  border-radius: 12px !important;
  height: 48px !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  display: flex !important;
  align-items: center !important;
}

.ant-input-wrapper:hover {
  border-color: #d1d5db !important;
  background: #ffffff !important;
}

.ant-input-wrapper-focused {
  background: #ffffff !important;
  border-color: #16a34a !important;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.08) !important;
}

.ant-input {
  background: transparent !important;
  border: none !important;
  padding: 12px 0 !important;
  height: 100% !important;
  font-size: 15px !important;
  font-weight: 500 !important;
  color: #1f2937 !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}

.ant-input::placeholder {
  color: #d1d5db !important;
}

.ant-input:hover {
  border-color: transparent !important;
  background: transparent !important;
}

.ant-input:focus {
  border-color: transparent !important;
  box-shadow: none !important;
  background: transparent !important;
}

.ant-input-affix-wrapper {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%) !important;
  border: 1.5px solid #e5e7eb !important;
  border-radius: 12px !important;
  padding: 0 12px !important;
  height: 48px !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  display: flex !important;
  align-items: center !important;
  color: #1f2937 !important;
}

.ant-input-affix-wrapper:hover {
  border-color: #d1d5db !important;
  background: #ffffff !important;
}

.ant-input-affix-wrapper-focused,
.ant-input-affix-wrapper:focus-within {
  background: #ffffff !important;
  border-color: #16a34a !important;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.08) !important;
  border-color: #16a34a !important;
}

.ant-input-affix-wrapper input {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  font-size: 15px !important;
  font-weight: 500 !important;
  color: #1f2937 !important;
}

.ant-input-affix-wrapper input::placeholder {
  color: #d1d5db !important;
}

.ant-input-prefix {
  color: #9ca3af !important;
  margin-right: 8px !important;
  display: flex !important;
  align-items: center !important;
}

.ant-input-affix-wrapper-focused .ant-input-prefix {
  color: #16a34a !important;
}

.ant-input-affix-wrapper:focus-within .ant-input-prefix {
  color: #16a34a !important;
}

.ant-input-password {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%) !important;
  border: 1.5px solid #e5e7eb !important;
  border-radius: 12px !important;
  padding: 0 12px !important;
  height: 48px !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}

.ant-input-password:hover {
  border-color: #d1d5db !important;
  background: #ffffff !important;
}

.ant-input-password-focused,
.ant-input-password:focus-within {
  background: #ffffff !important;
  border-color: #16a34a !important;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.08) !important;
  border-color: #16a34a !important;
}

.ant-input-password input {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  font-size: 15px !important;
  font-weight: 500 !important;
  color: #1f2937 !important;
  height: 100% !important;
}

.ant-input-password input::placeholder {
  color: #d1d5db !important;
}

.ant-input-password .ant-input-prefix {
  color: #9ca3af !important;
  margin-right: 8px !important;
  display: flex !important;
  align-items: center !important;
}

.ant-input-password-focused .ant-input-prefix,
.ant-input-password:focus-within .ant-input-prefix {
  color: #16a34a !important;
}

/* Auth Button Styles */
.auth-submit-btn {
  background: linear-gradient(135deg, #16a34a 0%, #0891b2 100%) !important;
  color: white !important;
  border: none !important;
  border-radius: 12px !important;
  height: 48px !important;
  font-weight: 600 !important;
  font-size: 15px !important;
  box-shadow: 0 4px 20px rgba(22, 163, 74, 0.25) !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  margin-top: 12px !important;
  cursor: pointer;
}

.auth-submit-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 32px rgba(22, 163, 74, 0.35) !important;
}

.auth-submit-btn:active {
  transform: translateY(0) !important;
}

/* OAuth Button Styles */
.auth-oauth-btn {
  background: #f9fafb !important;
  border: 1.5px solid #e5e7eb !important;
  color: #1f2937 !important;
  border-radius: 12px !important;
  height: 48px !important;
  font-weight: 500 !important;
  font-size: 15px !important;
  transition: all 0.2s !important;
  cursor: pointer;
}

.auth-oauth-btn:hover {
  background: #f3f4f6 !important;
  border-color: #d1d5db !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
}

/* Checkbox Styles */
.ant-checkbox-inner {
  border-color: #d1d5db !important;
  background: white !important;
  border-radius: 6px !important;
}

.ant-checkbox-checked .ant-checkbox-inner {
  background-color: #16a34a !important;
  border-color: #16a34a !important;
}

.ant-checkbox-checked .ant-checkbox-inner::after {
  border-color: white !important;
}

/* Auth Layout Styles */
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  background: #ffffff;
}

.auth-side {
  flex: 1;
  background: linear-gradient(135deg, #16a34a 0%, #0891b2 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 64px;
}

.auth-form-side {
  flex: 1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 48px;
}

/* Auth Input Wrapper & Native Inputs */
.auth-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 0 12px;
  height: 48px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.auth-input-wrapper:hover {
  border-color: #d1d5db;
  background: #ffffff;
}

.auth-input-wrapper:focus-within {
  background: #ffffff;
  border-color: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.08);
}

.auth-input-wrapper:focus-within .auth-input-icon {
  color: #16a34a;
}

.auth-input-icon {
  font-size: 16px;
  color: #9ca3af;
  flex-shrink: 0;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.auth-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0;
  height: 100%;
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  outline: none;
  font-family: "DM Sans", Inter, system-ui, sans-serif;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.auth-input::placeholder {
  color: #d1d5db;
}

.auth-input:hover {
  background: transparent;
}

.auth-input:focus {
  background: transparent;
  outline: none;
  box-shadow: none;
}

.auth-input-suffix {
  flex-shrink: 0;
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.auth-input-suffix:hover {
  color: #16a34a;
}

.auth-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #16a34a;
  border-radius: 6px;
}

/* Responsive Auth */
@media (max-width: 1024px) {
  .auth-wrapper {
    flex-direction: column;
  }

  .auth-side {
    display: none !important;
  }

  .auth-form-side {
    flex: 1;
    min-height: 100vh;
    padding: 24px;
  }
}
```

### Signup

```vue
<template>
  <div class="auth-wrapper">
    <!-- Left Hero Section -->
    <div class="auth-side hidden lg:flex lg:flex-col lg:justify-between">
      <!-- Logo -->
      <div>
        <div class="flex items-center gap-3 mb-20">
          <div
            class="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center text-white text-2xl font-bold"
          >
            🏠
          </div>
          <h1 class="text-3xl font-bold text-white">Ghoroa</h1>
        </div>

        <!-- Hero Content -->
        <div class="space-y-8">
          <div>
            <h2 class="text-5xl font-bold text-white mb-4 leading-tight">
              Start managing your property today
            </h2>
            <p class="text-lg text-gray-300 leading-relaxed">
              Join hundreds of property managers who use Ghoroa to streamline
              their business operations.
            </p>
          </div>

          <!-- Features -->
          <ul class="space-y-4">
            <li class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-green-300 text-sm font-bold">✓</span>
              </div>
              <div>
                <p class="text-white font-medium mb-0.5">Quick Setup</p>
                <p class="text-gray-300 text-sm">Get started in minutes</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-cyan-300 text-sm font-bold">✓</span>
              </div>
              <div>
                <p class="text-white font-medium mb-0.5">Secure & Reliable</p>
                <p class="text-gray-300 text-sm">Enterprise-grade security</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <div
                class="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center flex-shrink-0"
              >
                <span class="text-green-300 text-sm font-bold">✓</span>
              </div>
              <div>
                <p class="text-white font-medium mb-0.5">24/7 Support</p>
                <p class="text-gray-300 text-sm">
                  Our team is always here to help
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="space-y-4 border-t border-white border-opacity-10 pt-8">
        <p class="text-sm text-gray-300">✓ Trusted by 500+ property managers</p>
        <p class="text-xs text-gray-400">© 2026 Ghoroa. All rights reserved.</p>
      </div>
    </div>

    <!-- Right Form Section -->
    <div class="auth-form-side">
      <div class="w-full max-w-sm">
        <!-- Mobile Logo -->
        <div class="lg:hidden mb-10">
          <div class="flex items-center gap-3 mb-8">
            <div
              class="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-white font-bold"
            >
              🏠
            </div>
            <h1 class="text-2xl font-bold text-gray-900">Ghoroa</h1>
          </div>
        </div>

        <!-- Form Header -->
        <div class="mb-10">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">
            Create your account
          </h1>
          <p class="text-base text-gray-500">
            Join hundreds of property managers
          </p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-4 mb-8">
          <!-- Full Name Field -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3"
              >Full Name</label
            >
            <div class="auth-input-wrapper">
              <UserOutlined class="auth-input-icon" />
              <input
                v-model="form.name"
                type="text"
                placeholder="Your name"
                class="auth-input"
                @blur="validateName"
              />
            </div>
            <transition name="fade">
              <p
                v-if="errors.name"
                class="text-xs text-red-500 mt-2 font-medium"
              >
                {{ errors.name }}
              </p>
            </transition>
          </div>

          <!-- Email Field -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3"
              >Email Address</label
            >
            <div class="auth-input-wrapper">
              <MailOutlined class="auth-input-icon" />
              <input
                v-model="form.email"
                type="email"
                placeholder="you@company.com"
                class="auth-input"
                @blur="validateEmail"
              />
            </div>
            <transition name="fade">
              <p
                v-if="errors.email"
                class="text-xs text-red-500 mt-2 font-medium"
              >
                {{ errors.email }}
              </p>
            </transition>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3"
              >Password</label
            >
            <div class="auth-input-wrapper">
              <LockOutlined class="auth-input-icon" />
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="auth-input"
                @blur="validatePassword"
              />
              <button
                type="button"
                class="auth-input-suffix"
                @click="showPassword = !showPassword"
              >
                <EyeOutlined v-if="!showPassword" />
                <EyeInvisibleOutlined v-else />
              </button>
            </div>
            <transition name="fade">
              <p
                v-if="errors.password"
                class="text-xs text-red-500 mt-2 font-medium"
              >
                {{ errors.password }}
              </p>
            </transition>
            <!-- Password Strength -->
            <div v-if="form.password" class="mt-3 flex items-center gap-2.5">
              <div
                class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden"
              >
                <div
                  class="h-full rounded-full transition-all duration-300"
                  :style="{
                    width: passwordStrength + '%',
                    background: getPasswordColor(),
                  }"
                />
              </div>
              <span
                class="text-xs font-semibold whitespace-nowrap"
                :style="{ color: getPasswordColor() }"
              >
                {{ getPasswordLabel() }}
              </span>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3"
              >Confirm Password</label
            >
            <div class="auth-input-wrapper">
              <LockOutlined class="auth-input-icon" />
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="auth-input"
                @blur="validateConfirmPassword"
              />
              <button
                type="button"
                class="auth-input-suffix"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <EyeOutlined v-if="!showConfirmPassword" />
                <EyeInvisibleOutlined v-else />
              </button>
            </div>
            <transition name="fade">
              <p
                v-if="errors.confirmPassword"
                class="text-xs text-red-500 mt-2 font-medium"
              >
                {{ errors.confirmPassword }}
              </p>
            </transition>
          </div>

          <!-- Terms Checkbox -->
          <div class="pt-2">
            <div class="flex items-start gap-2">
              <input
                id="terms"
                v-model="form.agreedToTerms"
                type="checkbox"
                class="auth-checkbox mt-1"
              />
              <label
                for="terms"
                class="text-sm text-gray-600 cursor-pointer leading-relaxed"
              >
                I agree to the
                <a
                  href="#"
                  class="text-green-600 hover:text-green-700 font-medium"
                  >Terms of Service</a
                >
                and
                <a
                  href="#"
                  class="text-green-600 hover:text-green-700 font-medium"
                  >Privacy Policy</a
                >
              </label>
            </div>
            <transition name="fade">
              <p
                v-if="errors.agreedToTerms"
                class="text-xs text-red-500 mt-2 font-medium"
              >
                {{ errors.agreedToTerms }}
              </p>
            </transition>
          </div>

          <!-- Error Alert -->
          <transition name="fade">
            <div
              v-if="generalError"
              class="p-4 rounded-xl border border-red-200 bg-red-50"
            >
              <p class="text-sm text-red-700 flex items-center gap-2 m-0">
                <ExclamationCircleOutlined />
                {{ generalError }}
              </p>
            </div>
          </transition>

          <!-- Submit Button -->
          <button
            type="submit"
            class="auth-submit-btn w-full"
            :disabled="isLoading"
          >
            <span
              v-if="!isLoading"
              class="flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRightOutlined />
            </span>
            <span v-else>Creating account...</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative mb-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center">
            <span
              class="px-3 bg-white text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Or sign up with</span
            >
          </div>
        </div>

        <!-- OAuth Buttons -->
        <div class="space-y-3 mb-8">
          <button class="auth-oauth-btn w-full">
            <GoogleOutlined class="text-lg" />
            <span class="font-medium ml-3">Google</span>
          </button>

          <button class="auth-oauth-btn w-full">
            <PhoneOutlined class="text-lg" />
            <span class="font-medium ml-3">WhatsApp</span>
          </button>
        </div>

        <!-- Sign In Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <NuxtLink
              to="/login"
              class="font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              Sign in
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  PhoneOutlined,
  ExclamationCircleOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons-vue";

definePageMeta({
  layout: false,
});

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: false,
});

const errors = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreedToTerms: "",
});

const generalError = ref("");
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordStrength = computed(() => {
  const pwd = form.value.password;
  let strength = 0;

  if (pwd.length >= 8) strength += 25;
  if (pwd.length >= 12) strength += 25;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25;
  if (/[0-9]/.test(pwd)) strength += 13;
  if (/[^a-zA-Z0-9]/.test(pwd)) strength += 12;

  return Math.min(strength, 100);
});

function getPasswordColor() {
  const strength = passwordStrength.value;
  if (strength < 33) return "#ef4444";
  if (strength < 66) return "#ea580c";
  return "#16a34a";
}

function getPasswordLabel() {
  const strength = passwordStrength.value;
  if (strength < 33) return "Weak";
  if (strength < 66) return "Fair";
  return "Strong";
}

function validateName() {
  const name = form.value.name.trim();
  if (!name) {
    errors.value.name = "Name is required";
  } else if (name.length < 2) {
    errors.value.name = "Name must be at least 2 characters";
  } else {
    errors.value.name = "";
  }
}

function validateEmail() {
  const email = form.value.email.trim();
  if (!email) {
    errors.value.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.value.email = "Invalid email address";
  } else {
    errors.value.email = "";
  }
}

function validatePassword() {
  const pwd = form.value.password;
  if (!pwd) {
    errors.value.password = "Password is required";
  } else if (pwd.length < 8) {
    errors.value.password = "Password must be at least 8 characters";
  } else {
    errors.value.password = "";
  }
}

function validateConfirmPassword() {
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = "Please confirm your password";
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = "Passwords do not match";
  } else {
    errors.value.confirmPassword = "";
  }
}

async function handleRegister() {
  validateName();
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  if (!form.value.agreedToTerms) {
    errors.value.agreedToTerms = "You must agree to the terms";
  } else {
    errors.value.agreedToTerms = "";
  }

  if (
    errors.value.name ||
    errors.value.email ||
    errors.value.password ||
    errors.value.confirmPassword ||
    errors.value.agreedToTerms
  ) {
    return;
  }

  isLoading.value = true;
  generalError.value = "";

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await navigateTo("/dashboard");
  } catch (error) {
    generalError.value = "Failed to create account. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .auth-form-side {
    padding: 24px 16px !important;
  }

  .auth-form-side > div {
    max-width: 100% !important;
  }
}
</style>
```
