<template>
  <div class="card p-6">
    <div v-if="$slots.search || $slots.filter || $slots.actions" class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3">
        <slot name="search" />
        <slot name="filter" />
      </div>
      <slot name="actions" />
    </div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :pagination="paginationConfig"
      :row-key="rowKey"
      @change="handleTableChange"
    >
      <template #bodyCell="args">
        <slot name="bodyCell" v-bind="args" />
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import type { TableProps } from 'ant-design-vue'

interface PaginationInfo {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

const props = withDefaults(defineProps<{
  columns: TableProps['columns']
  dataSource: Record<string, unknown>[]
  loading?: boolean
  pagination?: PaginationInfo
  rowKey?: string
}>(), {
  loading: false,
  rowKey: 'id',
})

const emit = defineEmits<{
  'update:pagination': [value: { page: number; pageSize: number }]
}>()

const paginationConfig = computed(() => {
  if (!props.pagination) return false
  return {
    current: props.pagination.page,
    pageSize: props.pagination.pageSize,
    total: props.pagination.total,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`,
  }
})

function handleTableChange(pag: { current: number; pageSize: number }) {
  emit('update:pagination', { page: pag.current, pageSize: pag.pageSize })
}
</script>
