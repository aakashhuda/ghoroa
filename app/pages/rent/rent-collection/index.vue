<template>
  <div>
    <PageHeader title="Rent Collection" />
    <DataTable
      :columns="columns"
      :data-source="store.transactions as unknown as Record<string, unknown>[]"
      :loading="store.loading"
      :pagination="store.pagination"
      @update:pagination="handlePagination"
    >
      <template #search>
        <a-input-search v-model:value="search" placeholder="Search by tenant or flat..." class="w-60" @search="handleSearch" @press-enter="handleSearch" />
      </template>
      <template #filter>
        <a-range-picker v-model:value="dateRange" @change="handleSearch" />
      </template>
      <template #actions>
        <a-button type="primary" @click="navigateTo('/rent/rent-collection/add')">
          <template #icon><PlusOutlined /></template>
          Add Transaction
        </a-button>
      </template>
      <template #bodyCell="{ column, record }: { column: { key: string }, record: Record<string, unknown> }">
        <template v-if="column.key === 'tenant'">
          {{ (record.tenant as Record<string, unknown>)?.user?.['name'] || '-' }}
        </template>
        <template v-if="column.key === 'flat'">
          {{ ((record.tenant as Record<string, unknown>)?.flat as Record<string, unknown>)?.name || '-' }}
        </template>
        <template v-if="column.key === 'amount'">
          ৳{{ record.amount }}
        </template>
        <template v-if="column.key === 'receivedBy'">
          {{ (record.receivedBy as Record<string, unknown>)?.name || '-' }}
        </template>
        <template v-if="column.key === 'actions'">
          <a-tooltip title="View">
            <a-button size="small" type="text" @click="navigateTo(`/rent/rent-collection/${record.id}`)">
              <EyeOutlined />
            </a-button>
          </a-tooltip>
        </template>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { PlusOutlined, EyeOutlined } from '@ant-design/icons-vue'

definePageMeta({ layout: 'default' })

const store = useRentTransactionStore()
const search = ref('')
const dateRange = ref<[unknown, unknown] | null>(null)

const columns = [
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Flat', dataIndex: 'flat', key: 'flat' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Received By', dataIndex: 'receivedBy', key: 'receivedBy' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '', key: 'actions', width: 60 },
]

onMounted(() => store.fetchAll())

function handleSearch() {
  const params: Record<string, unknown> = { search: search.value }
  if (dateRange.value?.[0]) {
    params.dateFrom = (dateRange.value[0] as Record<string, unknown>).toISOString?.() || String(dateRange.value[0])
  }
  if (dateRange.value?.[1]) {
    params.dateTo = (dateRange.value[1] as Record<string, unknown>).toISOString?.() || String(dateRange.value[1])
  }
  store.fetchAll(params as Parameters<typeof store.fetchAll>[0])
}

function handlePagination(pag: { page: number; pageSize: number }) {
  const params: Record<string, unknown> = { search: search.value, ...pag }
  if (dateRange.value?.[0]) {
    params.dateFrom = (dateRange.value[0] as Record<string, unknown>).toISOString?.() || String(dateRange.value[0])
  }
  if (dateRange.value?.[1]) {
    params.dateTo = (dateRange.value[1] as Record<string, unknown>).toISOString?.() || String(dateRange.value[1])
  }
  store.fetchAll(params as Parameters<typeof store.fetchAll>[0])
}
</script>
