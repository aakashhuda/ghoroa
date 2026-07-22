const api = () => useNuxtApp().$axios

export const flatService = {
  async list(params?: { search?: string; floor?: number; page?: number; pageSize?: number }) {
    const res = await api().get('/flat', { params })
    return res.data
  },

  async getById(id: string) {
    const res = await api().get(`/flat/${id}`)
    return res.data
  },

  async create(data: {
    name: string
    code: string
    floor: number
    electricMeterId: string
    gasMeterId: string
    flatDetails?: Record<string, unknown>
  }) {
    const res = await api().post('/flat', data)
    return res.data
  },

  async update(id: string, data: Partial<{
    name: string
    code: string
    floor: number
    electricMeterId: string
    gasMeterId: string
    flatDetails: Record<string, unknown>
  }>) {
    const res = await api().put(`/flat/${id}`, data)
    return res.data
  },

  async remove(id: string) {
    const res = await api().delete(`/flat/${id}`)
    return res.data
  },
}
