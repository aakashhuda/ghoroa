<template>
  <div class="max-w-lg mx-auto card p-5">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Reset Password</h1>
      <p class="text-base text-gray-500 mt-1">
        Enter your current password and choose a new one
      </p>
    </div>

    <!-- Reset Password Form -->
    <a-form @submit.prevent="handleReset" layout="vertical">
      <!-- Current Password -->
      <a-form-item
        label="Current Password"
        :validate-status="errors.currentPassword ? 'error' : undefined"
        :help="errors.currentPassword || undefined"
      >
        <a-input-password
          v-model:value="form.currentPassword"
          placeholder="Enter your current password"
          @blur="validateField('currentPassword')"
        >
          <template #prefix><LockOutlined /></template>
        </a-input-password>
      </a-form-item>

      <!-- New Password -->
      <a-form-item
        label="New Password"
        :validate-status="errors.newPassword ? 'error' : undefined"
        :help="errors.newPassword || undefined"
      >
        <a-input-password
          v-model:value="form.newPassword"
          placeholder="Enter your new password"
          @blur="validateField('newPassword')"
        >
          <template #prefix><LockOutlined /></template>
        </a-input-password>
      </a-form-item>

      <!-- Confirm New Password -->
      <a-form-item
        label="Confirm New Password"
        :validate-status="errors.confirmPassword ? 'error' : undefined"
        :help="errors.confirmPassword || undefined"
      >
        <a-input-password
          v-model:value="form.confirmPassword"
          placeholder="Confirm your new password"
          @blur="validateField('confirmPassword')"
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
          class="custom-gradient-btn auth-btn flex items-center justify-center gap-2"
          :loading="isLoading"
          block
        >
          Reset Password
          <ArrowRightOutlined />
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useAuth } from "~/composables/useAuth";

const { resetPassword, isLoading, validateResetPasswordForm } = useAuth();

const form = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const errors = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const generalError = ref("");

function validateField(field: "currentPassword" | "newPassword" | "confirmPassword"): void {
  const validationErrors = validateResetPasswordForm(form.value);
  errors.value[field] = validationErrors[field];
}

function validateForm(): boolean {
  errors.value = validateResetPasswordForm(form.value);
  return !errors.value.currentPassword && !errors.value.newPassword && !errors.value.confirmPassword;
}

async function handleReset(): Promise<void> {
  if (!validateForm()) return;

  generalError.value = "";

  const result = await resetPassword(
    form.value.currentPassword,
    form.value.newPassword
  );

  if (result.success) {
    form.value.currentPassword = "";
    form.value.newPassword = "";
    form.value.confirmPassword = "";
  } else {
    generalError.value = result.error || "Something went wrong. Please try again.";
  }
}
</script>
