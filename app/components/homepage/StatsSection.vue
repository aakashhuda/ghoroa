<template>
  <section class="stats-section">
    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-4xl font-bold text-white mb-2">{{ stat.value }}</div>
          <div class="text-sm text-gray-300 font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '500+', label: 'Property Managers' },
  { value: '10,000+', label: 'Tenants Managed' },
  { value: '50+', label: 'Buildings' },
  { value: '99.9%', label: 'Uptime' },
]
</script>

<style scoped>
.stats-section {
  background: linear-gradient(135deg, #16a34a 0%, #0891b2 100%);
}
</style>
