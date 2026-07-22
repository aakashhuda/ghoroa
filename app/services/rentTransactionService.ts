const api = () => useNuxtApp().$axios

export const rentTransactionService = {
  async list(params?: {
    search?: string
    dateFrom?: string
    dateTo?: string
    page?: number
    pageSize?: number
  }) {
    const res = await api().get('/rent-transaction', { params })
    return res.data
  },

  async getById(id: string) {
    const res = await api().get(`/rent-transaction/${id}`)
    return res.data
  },

  async create(data: { tenantId: string; amount: number; receivedById: string }) {
    const res = await api().post('/rent-transaction', data)
    return res.data
  },
}
