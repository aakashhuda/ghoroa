<template>
  <div>
    <PageHeader title="Add Tenant" show-back />
    <div class="card p-6">
      <RentTenantForm :loading="store.loading" @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const store = useTenantStore()

async function handleSubmit(values: Record<string, unknown>) {
  const result = await store.create(values as Parameters<typeof store.create>[0])
  if (result.success) navigateTo('/rent/tenants')
}

function handleCancel() {
  navigateTo('/rent/tenants')
}
</script>
