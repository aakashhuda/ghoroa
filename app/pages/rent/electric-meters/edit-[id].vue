<template>
  <div>
    <PageHeader title="Edit Electric Meter" show-back />
    <div v-if="store.loading" class="card p-6">
      <a-skeleton active :paragraph="{ rows: 4 }" />
    </div>
    <div v-else-if="store.currentMeter" class="card p-6">
      <RentElectricMeterForm :is-edit :loading="store.loading" :initial-data="store.currentMeter as unknown as Record<string, unknown>" @submit="handleSubmit" @cancel="handleCancel" />
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

async function handleSubmit(values: Record<string, unknown>) {
  const result = await store.update(id, values as Parameters<typeof store.update>[1])
  if (result.success) navigateTo('/rent/electric-meters')
}

function handleCancel() {
  navigateTo('/rent/electric-meters')
}
</script>
