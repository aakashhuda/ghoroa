<template>
  <div>
    <AuthResetPassword />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
})
</script>
