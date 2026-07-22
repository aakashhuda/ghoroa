<template>
  <div>
    <PageHeader title="Add Gas Meter" show-back />
    <div class="card p-6">
      <RentGasMeterForm @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const store = useGasMeterStore()

async function handleSubmit(values: Record<string, unknown>) {
  const result = await store.create(values as Parameters<typeof store.create>[0])
  if (result.success) navigateTo('/rent/gas-meters')
}

function handleCancel() {
  navigateTo('/rent/gas-meters')
}
</script>
