import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { electricMeterService } from '~/services/electricMeterService'

interface ElectricMeter {
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

export const useElectricMeterStore = defineStore('electricMeter', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const meters = ref<ElectricMeter[]>([])
  const currentMeter = ref<ElectricMeter | null>(null)
  const pagination = ref<Pagination>({ page: 1, pageSize: 10, total: 0, totalPages: 0 })

  async function fetchAll(params?: { search?: string; page?: number; pageSize?: number }) {
    loading.value = true
    error.value = null

    try {
      const result = await electricMeterService.list(params)
      meters.value = result.data
      pagination.value = result.pagination
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load electric meters'
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
      const result = await electricMeterService.getById(id)
      currentMeter.value = result.data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load electric meter'
      error.value = msg
      message.error(msg)
    } finally {
      loading.value = false
    }
  }

  async function create(data: Parameters<typeof electricMeterService.create>[0]) {
    loading.value = true
    error.value = null

    try {
      const result = await electricMeterService.create(data)
      message.success('Electric meter created successfully')
      return { success: true, data: result.data }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create electric meter'
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  async function update(id: string, data: Parameters<typeof electricMeterService.update>[1]) {
    loading.value = true
    error.value = null

    try {
      const result = await electricMeterService.update(id, data)
      message.success('Electric meter updated successfully')
      return { success: true, data: result.data }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update electric meter'
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
      await electricMeterService.remove(id)
      message.success('Electric meter deleted successfully')
      return { success: true }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete electric meter'
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
