<template>
  <div>
    <PageHeader title="Add Electric Meter" show-back />
    <div class="card p-6">
      <RentElectricMeterForm :loading="store.loading" @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const store = useElectricMeterStore()

async function handleSubmit(values: Record<string, unknown>) {
  const result = await store.create(values as Parameters<typeof store.create>[0])
  if (result.success) navigateTo('/rent/electric-meters')
}

function handleCancel() {
  navigateTo('/rent/electric-meters')
}
</script>
