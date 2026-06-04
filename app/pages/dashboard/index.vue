<template>
  <DashboardView />
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Dashboard',
  middleware: 'auth',
})
</script>
