<template>
  <div>
    <PageHeader title="Add Flat" show-back />
    <div class="card p-6">
      <RentFlatForm :loading="store.loading" @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const store = useFlatStore()

async function handleSubmit(values: Record<string, unknown>) {
  const result = await store.create(values as Parameters<typeof store.create>[0])
  if (result.success) navigateTo('/rent/flats')
}

function handleCancel() {
  navigateTo('/rent/flats')
}
</script>
