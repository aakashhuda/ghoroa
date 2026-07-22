<template>
  <div>
    <PageHeader title="Gas Meter Details" show-back />
    <div v-if="store.currentMeter" class="card p-6">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="Name">{{ store.currentMeter.name || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Meter No">{{ store.currentMeter.meterNo }}</a-descriptions-item>
        <a-descriptions-item label="Flat">{{ store.currentMeter.flat?.name || 'Unassigned' }}</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const store = useGasMeterStore()
const id = route.params.id as string

onMounted(() => store.fetchById(id))
</script>
