<template>
  <div>
    <PageHeader title="Flat Details" show-back />
    <div v-if="store.currentFlat" class="card p-6">
      <a-descriptions bordered :column="{ xs: 1, sm: 2, md: 3 }">
        <a-descriptions-item label="Name" :span="3">{{ store.currentFlat.name }}</a-descriptions-item>
        <a-descriptions-item label="Code">{{ store.currentFlat.code }}</a-descriptions-item>
        <a-descriptions-item label="Floor">{{ store.currentFlat.floor }}</a-descriptions-item>
        <a-descriptions-item label="Electric Meter">{{ store.currentFlat.electricMeter?.meterNo || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Gas Meter">{{ store.currentFlat.gasMeter?.meterNo || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Tenant">{{ store.currentFlat.tenant?.user?.name || 'Vacant' }}</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const store = useFlatStore()
const id = route.params.id as string

onMounted(() => store.fetchById(id))
</script>
