<template>
  <div>
    <PageHeader title="Flats" />
    <DataTable
      :columns="columns"
      :data-source="store.flats as unknown as Record<string, unknown>[]"
      :loading="store.loading"
      :pagination="store.pagination"
      @update:pagination="handlePagination"
    >
      <template #search>
        <a-input-search v-model:value="search" placeholder="Search flats..." class="w-56" @search="handleSearch" @press-enter="handleSearch" />
      </template>
      <template #filter>
        <a-select v-model:value="floorFilter" placeholder="Floor" allow-clear style="width: 110px" @change="handleSearch">
          <a-select-option v-for="i in 10" :key="i" :value="i">Floor {{ i }}</a-select-option>
        </a-select>
      </template>
      <template #actions>
        <a-button type="primary" class="admin-btn" @click="navigateTo('/rent/flats/add')">
          <template #icon><PlusOutlined /></template>
          Add Flat
        </a-button>
      </template>
      <template #bodyCell="{ column, record }: { column: { key: string }, record: Record<string, unknown> }">
        <template v-if="column.key === 'displayValue'">
          {{ record.displayValue || record.code || '-' }}
        </template>
        <template v-if="column.key === 'status'">
          <a-tag :color="record.status === 'Active' ? 'success' : 'default'">{{ record.status || 'Inactive' }}</a-tag>
        </template>
        <template v-if="column.key === 'electricMeter'">
          {{ (record.electricMeter as Record<string, unknown>)?.displayValue || (record.electricMeter as Record<string, unknown>)?.meterNo || '-' }}
        </template>
        <template v-if="column.key === 'gasMeter'">
          {{ (record.gasMeter as Record<string, unknown>)?.displayValue || (record.gasMeter as Record<string, unknown>)?.meterNo || '-' }}
        </template>
        <template v-if="column.key === 'tenant'">
          <a-tag v-if="record.tenant" color="success">Occupied</a-tag>
          <a-tag v-else>Vacant</a-tag>
        </template>
        <template v-if="column.key === 'actions'">
          <a-space>
            <a-tooltip title="View">
              <a-button class="table-action-btn view-btn" type="text" @click="navigateTo(`/rent/flats/${record.id}`)">
                <EyeOutlined />
              </a-button>
            </a-tooltip>
            <a-tooltip title="Edit">
              <a-button class="table-action-btn edit-btn" type="text" @click="navigateTo(`/rent/flats/edit-${record.id as string}`)">
                <EditOutlined />
              </a-button>
            </a-tooltip>
            <a-tooltip title="Delete">
              <a-popconfirm title="Delete this flat?" @confirm="handleDelete(record.id as string)">
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

const store = useFlatStore()
const search = ref('')
const floorFilter = ref<number | undefined>()

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Code', dataIndex: 'displayValue', key: 'displayValue' },
  { title: 'Floor', dataIndex: 'floor', key: 'floor' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
  { title: 'Electric Meter', dataIndex: 'electricMeter', key: 'electricMeter' },
  { title: 'Gas Meter', dataIndex: 'gasMeter', key: 'gasMeter' },
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: '', key: 'actions', width: 120 },
]

onMounted(() => store.fetchAll())

function handleSearch() {
  store.fetchAll({ search: search.value, floor: floorFilter.value })
}

function handlePagination(pag: { page: number; pageSize: number }) {
  store.fetchAll({ search: search.value, floor: floorFilter.value, ...pag })
}

async function handleDelete(id: string) {
  const result = await store.remove(id)
  if (result.success) store.fetchAll({ search: search.value, floor: floorFilter.value })
}
</script>
