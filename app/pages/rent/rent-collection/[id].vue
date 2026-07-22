<template>
  <div>
    <PageHeader title="Transaction Details" show-back />
    <div v-if="store.currentTransaction" class="card p-6">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="Tenant">{{ store.currentTransaction.tenant?.user?.name || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Flat">{{ store.currentTransaction.tenant?.flat?.name || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Amount">৳{{ store.currentTransaction.amount }}</a-descriptions-item>
        <a-descriptions-item label="Received By">{{ store.currentTransaction.receivedBy?.name || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Date" :span="2">{{ store.currentTransaction.createdAt }}</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const store = useRentTransactionStore()
const id = route.params.id as string

onMounted(() => store.fetchById(id))
</script>
