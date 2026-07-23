<template>
  <div>
    <PageHeader title="Electric Meter Details" show-back />
    <div v-if="store.loading" class="card p-6">
      <a-skeleton active :paragraph="{ rows: 4 }" />
    </div>
    <div v-else-if="store.currentMeter" class="card p-6">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="Meter">{{ store.currentMeter.displayValue || store.currentMeter.meterNo }}</a-descriptions-item>
        <a-descriptions-item label="Flat">{{ store.currentMeter.flat?.name || 'Unassigned' }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <div v-else class="card p-6 text-gray-500">Electric meter not found</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const store = useElectricMeterStore()
const id = route.params.id as string

onMounted(() => store.fetchById(id))
</script>
