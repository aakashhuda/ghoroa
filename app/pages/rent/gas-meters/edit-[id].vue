<template>
  <div>
    <PageHeader title="Edit Gas Meter" show-back />
    <div v-if="store.currentMeter" class="card p-6">
      <RentGasMeterForm :is-edit :initial-data="store.currentMeter as unknown as Record<string, unknown>" @submit="handleSubmit" @cancel="handleCancel" />
    </div>
    <div v-else-if="!store.loading" class="card p-6 text-gray-500">Gas meter not found</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const store = useGasMeterStore()
const id = route.params.id as string

onMounted(() => store.fetchById(id))

async function handleSubmit(values: Record<string, unknown>) {
  const result = await store.update(id, values as Parameters<typeof store.update>[1])
  if (result.success) navigateTo('/rent/gas-meters')
}

function handleCancel() {
  navigateTo('/rent/gas-meters')
}
</script>
