<template>
  <div>
    <PageHeader title="Electric Meters" />
    <DataTable
      :columns="columns"
      :data-source="store.meters as unknown as Record<string, unknown>[]"
      :loading="store.loading"
      :pagination="store.pagination"
      @update:pagination="handlePagination"
    >
      <template #search>
        <a-input-search v-model:value="search" placeholder="Search electric meters..." class="w-56" @search="handleSearch" @press-enter="handleSearch" />
      </template>
      <template #actions>
        <a-button type="primary" class="admin-btn" @click="navigateTo('/rent/electric-meters/add')">
          <template #icon><PlusOutlined /></template>
          Add Electric Meter
        </a-button>
      </template>
      <template #bodyCell="{ column, record }: { column: { key: string }, record: Record<string, unknown> }">
        <template v-if="column.key === 'displayValue'">
          {{ record.displayValue || record.meterNo || '-' }}
        </template>
        <template v-if="column.key === 'flat'">
          {{ (record.flat as Record<string, unknown>)?.code || (record.flat as Record<string, unknown>)?.name || 'Unassigned' }}
        </template>
        <template v-if="column.key === 'actions'">
          <a-space>
            <a-tooltip title="View">
              <a-button class="table-action-btn view-btn" type="text" @click="navigateTo(`/rent/electric-meters/${record.id}`)">
                <EyeOutlined />
              </a-button>
            </a-tooltip>
            <a-tooltip title="Edit">
              <a-button class="table-action-btn edit-btn" type="text" @click="navigateTo(`/rent/electric-meters/edit-${record.id as string}`)">
                <EditOutlined />
              </a-button>
            </a-tooltip>
            <a-tooltip title="Delete">
              <a-popconfirm title="Delete this electric meter?" @confirm="handleDelete(record.id as string)">
                <a-button class="table-action-btn" type="text" danger>
                  <DeleteOutlined />
                </a-button>
              </a-popconfirm>
            </a-tooltip>
          </a-space>
        </template>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'

definePageMeta({ layout: 'default' })

const store = useElectricMeterStore()
const search = ref('')

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Meter', dataIndex: 'displayValue', key: 'displayValue' },
  { title: 'Flat', dataIndex: 'flat', key: 'flat' },
  { title: '', key: 'actions', width: 120 },
]

onMounted(() => store.fetchAll())

function handleSearch() {
  store.fetchAll({ search: search.value })
}

function handlePagination(pag: { page: number; pageSize: number }) {
  store.fetchAll({ search: search.value, ...pag })
}

async function handleDelete(id: string) {
  const result = await store.remove(id)
  if (result.success) store.fetchAll({ search: search.value })
}
</script>
