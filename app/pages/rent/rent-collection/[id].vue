<template>
  <div>
    <PageHeader title="Transaction Details" show-back />
    <div v-if="store.loading" class="card p-6">
      <a-skeleton active :paragraph="{ rows: 4 }" />
    </div>
    <div v-else-if="store.currentTransaction" class="card p-6">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="Tenant">{{ store.currentTransaction.tenant?.user?.name || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Flat">{{ store.currentTransaction.tenant?.flat?.name || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Amount">৳{{ store.currentTransaction.amount }}</a-descriptions-item>
        <a-descriptions-item label="Received By">{{ store.currentTransaction.receivedBy?.name || '-' }}</a-descriptions-item>
        <a-descriptions-item label="Date" :span="2">{{ formatToBD(store.currentTransaction.createdAt as string) }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <div v-else class="card p-6 text-gray-500">Transaction not found</div>
  </div>
</template>

<script setup lang="ts">
import { formatToBD } from '~/utils/formatDate'

definePageMeta({ layout: 'default' })

const route = useRoute()
const store = useRentTransactionStore()
const id = route.params.id as string

onMounted(() => store.fetchById(id))
</script>
