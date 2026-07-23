<template>
  <div>
    <PageHeader title="Edit Flat" show-back />
    <div v-if="store.loading" class="card p-6">
      <a-skeleton active :paragraph="{ rows: 6 }" />
    </div>
    <div v-else-if="store.currentFlat" class="card p-6">
      <RentFlatForm :is-edit :loading="store.loading" :initial-data="store.currentFlat as unknown as Record<string, unknown>" @submit="handleSubmit" @cancel="handleCancel" />
    </div>
    <div v-else class="card p-6 text-gray-500">Flat not found</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const store = useFlatStore()
const id = route.params.id as string

onMounted(() => store.fetchById(id))

async function handleSubmit(values: Record<string, unknown>) {
  const result = await store.update(id, values as Parameters<typeof store.update>[1])
  if (result.success) navigateTo('/rent/flats')
}

function handleCancel() {
  navigateTo('/rent/flats')
}
</script>
