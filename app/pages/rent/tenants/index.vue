<template>
  <div>
    <PageHeader title="Tenants" />
    <DataTable
      :columns="columns"
      :data-source="store.tenants as unknown as Record<string, unknown>[]"
      :loading="store.loading"
      :pagination="store.pagination"
      @update:pagination="handlePagination"
    >
      <template #search>
        <a-input-search v-model:value="search" placeholder="Search tenants..." class="w-56" @search="handleSearch" @press-enter="handleSearch" />
      </template>
      <template #actions>
        <a-button type="primary" class="admin-btn" @click="navigateTo('/rent/tenants/add')">
          <template #icon><PlusOutlined /></template>
          Add Tenant
        </a-button>
      </template>
      <template #bodyCell="{ column, record }: { column: { key: string }, record: Record<string, unknown> }">
        <template v-if="column.key === 'name'">
          {{ (record.user as Record<string, unknown>)?.name || '-' }}
        </template>
        <template v-if="column.key === 'flat'">
          {{ (record.flat as Record<string, unknown>)?.displayValue || (record.flat as Record<string, unknown>)?.code || '-' }}
        </template>
        <template v-if="column.key === 'rent'">
          ৳{{ record.rent }}
        </template>
        <template v-if="column.key === 'joinDate'">
          {{ formatToBD(record.joinDate as string) }}
        </template>
        <template v-if="column.key === 'actions'">
          <a-space>
            <a-tooltip title="View">
              <a-button class="table-action-btn view-btn" type="text" @click="navigateTo(`/rent/tenants/${record.id}`)">
                <EyeOutlined />
              </a-button>
            </a-tooltip>
            <a-tooltip title="Edit">
              <a-button class="table-action-btn edit-btn" type="text" @click="navigateTo(`/rent/tenants/edit-${record.id as string}`)">
                <EditOutlined />
              </a-button>
            </a-tooltip>
            <a-tooltip title="Delete">
              <a-popconfirm title="Delete this tenant?" @confirm="handleDelete(record.id as string)">
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
import { formatToBD } from '~/utils/formatDate'

definePageMeta({ layout: 'default' })

const store = useTenantStore()
const search = ref('')

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Flat', dataIndex: 'flat', key: 'flat' },
  { title: 'WhatsApp', dataIndex: 'whatsappNumber', key: 'whatsappNumber' },
  { title: 'Head Count', dataIndex: 'headCount', key: 'headCount' },
  { title: 'Rent', dataIndex: 'rent', key: 'rent' },
  { title: 'Join Date', dataIndex: 'joinDate', key: 'joinDate' },
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
