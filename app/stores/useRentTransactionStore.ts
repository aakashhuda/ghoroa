import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { rentTransactionService } from '~/services/rentTransactionService'

interface RentTransaction {
  id: string
  tenantId: string
  amount: number
  receivedById: string
  createdAt: string
  tenant: {
    id: string
    user: { id: string; name: string | null }
    flat: { id: string; name: string; code: string } | null
  }
  receivedBy: { id: string; name: string | null }
}

interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export const useRentTransactionStore = defineStore('rentTransaction', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const transactions = ref<RentTransaction[]>([])
  const currentTransaction = ref<RentTransaction | null>(null)
  const pagination = ref<Pagination>({ page: 1, pageSize: 10, total: 0, totalPages: 0 })

  async function fetchAll(params?: {
    search?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    pageSize?: number
  }) {
    loading.value = true
    error.value = null

    try {
      const result = await rentTransactionService.list(params)
      transactions.value = result.data
      pagination.value = result.pagination
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load rent transactions'
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
      const result = await rentTransactionService.getById(id)
      currentTransaction.value = result.data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load rent transaction'
      error.value = msg
      message.error(msg)
    } finally {
      loading.value = false
    }
  }

  async function create(data: Parameters<typeof rentTransactionService.create>[0]) {
    loading.value = true
    error.value = null

    try {
      const result = await rentTransactionService.create(data)
      message.success('Rent transaction created successfully')
      return { success: true, data: result.data }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create rent transaction'
      error.value = msg
      message.error(msg)
      return { success: false, error: msg }
    } finally {
      loading.value = false
    }
  }

  return {
    loading, error, transactions, currentTransaction, pagination,
    fetchAll, fetchById, create,
  }
})
