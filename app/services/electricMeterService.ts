const api = () => useNuxtApp().$axios

export const electricMeterService = {
  async list(params?: { search?: string; page?: number; pageSize?: number }) {
    const res = await api().get('/electric-meter', { params })
    return res.data
  },

  async getById(id: string) {
    const res = await api().get(`/electric-meter/${id}`)
    return res.data
  },

  async create(data: { name?: string; meterNo: number }) {
    const res = await api().post('/electric-meter', data)
    return res.data
  },

  async update(id: string, data: Partial<{ name: string; meterNo: number }>) {
    const res = await api().put(`/electric-meter/${id}`, data)
    return res.data
  },

  async remove(id: string) {
    const res = await api().delete(`/electric-meter/${id}`)
    return res.data
  },
}
