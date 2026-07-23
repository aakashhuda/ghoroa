<template>
  <div>
    <PageHeader title="Edit Tenant" show-back />
    <div v-if="store.loading" class="card p-6">
      <a-skeleton active :paragraph="{ rows: 8 }" />
    </div>
    <div v-else-if="store.currentTenant" class="card p-6">
      <RentTenantForm :is-edit :loading="store.loading" :initial-data="store.currentTenant as unknown as Record<string, unknown>" @submit="handleSubmit" @cancel="handleCancel" />
    </div>
    <div v-else class="card p-6 text-gray-500">Tenant not found</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const store = useTenantStore()
const id = route.params.id as string

onMounted(() => store.fetchById(id))

async function handleSubmit(values: Record<string, unknown>) {
  const result = await store.update(id, values as Parameters<typeof store.update>[1])
  if (result.success) navigateTo('/rent/tenants')
}

function handleCancel() {
  navigateTo('/rent/tenants')
}
</script>
