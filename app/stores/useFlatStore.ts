import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { flatService } from '~/services/flatService'
import { extractApiError } from '~/utils/errorHandler'

interface Flat {
  id: string
  name: string
  code: string
  floor: number
  electricMeterId: string
  gasMeterId: string
  flatDetails: Record<string, unknown>
  electricMeter: { id: string; name: string | null; meterNo: number } | null
  gasMeter: { id: string; name: string | null; meterNo: number } | null
  tenant: { id: string; user: { id: string; name: string | null } } | null
}

interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export const useFlatStore = defineStore('flat', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const flats = ref<Flat[]>([])
  const currentFlat = ref<Flat | null>(null)
  const pagination = ref<Pagination>({ page: 1, pageSize: 10, total: 0, totalPages: 0 })

  async function fetchAll(params?: { search?: string; floor?: number; page?: number; pageSize?: number }) {
    loading.value = true
    error.value = null

    try {
      const result = await flatService.list(params)
      flats.value = result.data
      pagination.value = result.pagination
    } catch (err: unknown) {
      const msg = extractApiError(err).message
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
      const result = await flatService.getById(id)
      currentFlat.value = result.data
    } catch (err: unknown) {
      const msg = extractApiError(err).message
      error.value = msg
      message.error(msg)
    } finally {
      loading.value = false
    }
  }

  async function create(data: Parameters<typeof flatService.create>[0]) {
    loading.value = true
    error.value = null

    try {
      const result = await flatService.create(data)
      message.success('Flat created successfully')
      return { success: true, data: result.data }
    } catch (err: unknown) {
      const msg = extractApiError(err).message
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  async function update(id: string, data: Parameters<typeof flatService.update>[1]) {
    loading.value = true
    error.value = null

    try {
      const result = await flatService.update(id, data)
      message.success('Flat updated successfully')
      return { success: true, data: result.data }
    } catch (err: unknown) {
      const msg = extractApiError(err).message
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
      await flatService.remove(id)
      message.success('Flat deleted successfully')
      return { success: true }
    } catch (err: unknown) {
      const msg = extractApiError(err).message
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  return {
    loading, error, flats, currentFlat, pagination,
    fetchAll, fetchById, create, update, remove,
  }
})
