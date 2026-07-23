<template>
  <div>
    <PageHeader title="Add Rent Transaction" show-back />
    <div class="card p-6">
      <RentTransactionForm :loading="store.loading" @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const store = useRentTransactionStore()

async function handleSubmit(values: Record<string, unknown>) {
  const result = await store.create(values as Parameters<typeof store.create>[0])
  if (result.success) navigateTo('/rent/rent-collection')
}

function handleCancel() {
  navigateTo('/rent/rent-collection')
}
</script>
