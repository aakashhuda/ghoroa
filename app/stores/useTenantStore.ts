import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { tenantService } from '~/services/tenantService'

interface Tenant {
  id: string
  flatId: string
  userId: string
  whatsappNumber: string | null
  headCount: number
  rent: number
  utilities: number | null
  advance: number | null
  joinDate: string
  user: { id: string; name: string | null; email: string; phone: string | null }
  flat: {
    id: string
    name: string
    code: string
    floor: number
    electricMeter: { id: string; name: string | null; meterNo: number } | null
    gasMeter: { id: string; name: string | null; meterNo: number } | null
  }
}

interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export const useTenantStore = defineStore('tenant', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const tenants = ref<Tenant[]>([])
  const currentTenant = ref<Tenant | null>(null)
  const pagination = ref<Pagination>({ page: 1, pageSize: 10, total: 0, totalPages: 0 })

  async function fetchAll(params?: { search?: string; page?: number; pageSize?: number }) {
    loading.value = true
    error.value = null

    try {
      const result = await tenantService.list(params)
      tenants.value = result.data
      pagination.value = result.pagination
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load tenants'
      error.value = msg
      message.error(msg)
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id: string) {
    loading.value = true
    error.value = null

    try {
      const result = await tenantService.getById(id)
      currentTenant.value = result.data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load tenant'
      error.value = msg
      message.error(msg)
    } finally {
      loading.value = false
    }
  }

  async function create(data: Parameters<typeof tenantService.create>[0]) {
    loading.value = true
    error.value = null

    try {
      const result = await tenantService.create(data)
      message.success('Tenant created successfully')
      return { success: true, data: result.data }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create tenant'
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  async function update(id: string, data: Parameters<typeof tenantService.update>[1]) {
    loading.value = true
    error.value = null

    try {
      const result = await tenantService.update(id, data)
      message.success('Tenant updated successfully')
      return { success: true, data: result.data }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update tenant'
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  async function remove(id: string) {
    loading.value = true
    error.value = null

    try {
      await tenantService.remove(id)
      message.success('Tenant deleted successfully')
      return { success: true }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete tenant'
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  return {
    loading, error, tenants, currentTenant, pagination,
    fetchAll, fetchById, create, update, remove,
  }
})
