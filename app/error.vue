<template>
  <NuxtLayout name="default">
    <div class="flex flex-col items-center justify-center py-24">
      <h1 class="text-6xl font-bold text-gray-300 mb-4">{{ error.statusCode }}</h1>
      <p class="text-lg text-gray-500 mb-2">
        {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
      </p>
      <p class="text-sm text-gray-400 mb-8 max-w-md text-center">
        {{
          error.statusCode === 404
            ? 'The page you\'re looking for doesn\'t exist or has been moved.'
            : error.message || 'An unexpected error occurred.'
        }}
      </p>
      <a-button type="primary" @click="handleBack">Go to Dashboard</a-button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error = useError()

function handleBack() {
  clearError({ redirect: '/dashboard' })
}
</script>
