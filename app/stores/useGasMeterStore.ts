import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { gasMeterService } from '~/services/gasMeterService'
import { extractApiError } from '~/utils/errorHandler'

interface GasMeter {
  id: string
  name: string | null
  meterNo: number
  flat: { id: string; name: string; code: string } | null
}

interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export const useGasMeterStore = defineStore('gasMeter', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const meters = ref<GasMeter[]>([])
  const currentMeter = ref<GasMeter | null>(null)
  const pagination = ref<Pagination>({ page: 1, pageSize: 10, total: 0, totalPages: 0 })

  async function fetchAll(params?: { search?: string; page?: number; pageSize?: number }) {
    loading.value = true
    error.value = null

    try {
      const result = await gasMeterService.list(params)
      meters.value = result.data
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
      const result = await gasMeterService.getById(id)
      currentMeter.value = result.data
    } catch (err: unknown) {
      const msg = extractApiError(err).message
      error.value = msg
      message.error(msg)
    } finally {
      loading.value = false
    }
  }

  async function create(data: Parameters<typeof gasMeterService.create>[0]) {
    loading.value = true
    error.value = null

    try {
      const result = await gasMeterService.create(data)
      message.success('Gas meter created successfully')
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

  async function update(id: string, data: Parameters<typeof gasMeterService.update>[1]) {
    loading.value = true
    error.value = null

    try {
      const result = await gasMeterService.update(id, data)
      message.success('Gas meter updated successfully')
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
      await gasMeterService.remove(id)
      message.success('Gas meter deleted successfully')
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
    loading, error, meters, currentMeter, pagination,
    fetchAll, fetchById, create, update, remove,
  }
})
