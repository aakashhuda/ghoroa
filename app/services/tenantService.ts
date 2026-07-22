const api = () => useNuxtApp().$axios

export const tenantService = {
  async list(params?: { search?: string; page?: number; pageSize?: number; unassigned?: boolean }) {
    const res = await api().get('/tenant', { params })
    return res.data
  },

  async getById(id: string) {
    const res = await api().get(`/tenant/${id}`)
    return res.data
  },

  async create(data: {
    flatId: string
    userId: string
    whatsappNumber?: string
    headCount?: number
    rent: number
    utilities?: number
    advance?: number
    joinDate: string
  }) {
    const res = await api().post('/tenant', data)
    return res.data
  },

  async update(id: string, data: Partial<{
    flatId: string
    userId: string
    whatsappNumber: string
    headCount: number
    rent: number
    utilities: number
    advance: number
    joinDate: string
  }>) {
    const res = await api().put(`/tenant/${id}`, data)
    return res.data
  },

  async remove(id: string) {
    const res = await api().delete(`/tenant/${id}`)
    return res.data
  },
}
