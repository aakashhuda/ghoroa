<template>
  <div>
    <PageHeader title="Flat Details" show-back />
    <div v-if="store.loading" class="card p-6">
      <a-skeleton active :paragraph="{ rows: 6 }" />
    </div>
    <div v-else-if="store.currentFlat" class="card p-6">
      <div class="mb-4">
        <a-tag v-if="store.currentFlat.status === 'Active'" color="success" class="text-sm px-3 py-1">Active</a-tag>
        <a-tag v-else class="text-sm px-3 py-1">Inactive</a-tag>
      </div>
      <a-descriptions bordered :column="{ xs: 1, sm: 2, md: 3 }">
        <a-descriptions-item label="Name" :span="3">{{ store.currentFlat.name }}</a-descriptions-item>
        <a-descriptions-item label="Code">{{ store.currentFlat.displayValue || store.currentFlat.code }}</a-descriptions-item>
        <a-descriptions-item label="Floor">{{ store.currentFlat.floor }}</a-descriptions-item>
        <a-descriptions-item label="Electric Meter">{{ store.currentFlat.electricMeter?.displayValue || store.currentFlat.electricMeter?.meterNo || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Gas Meter">{{ store.currentFlat.gasMeter?.displayValue || store.currentFlat.gasMeter?.meterNo || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Tenant">
          <a v-if="store.currentFlat.tenant" :href="`/rent/tenants/${store.currentFlat.tenant.id}`" class="text-primary font-medium hover:underline" @click.prevent="navigateTo(`/rent/tenants/${store.currentFlat.tenant.id}`)">
            {{ (store.currentFlat.tenant as Record<string, unknown>)?.user?.name || 'View Tenant' }}
          </a>
          <a-tag v-else>Vacant</a-tag>
        </a-descriptions-item>
      </a-descriptions>
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
</script>
