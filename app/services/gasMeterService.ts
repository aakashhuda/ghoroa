const api = () => useNuxtApp().$axios

export const gasMeterService = {
  async list(params?: { search?: string; page?: number; pageSize?: number }) {
    const res = await api().get('/gas-meter', { params })
    return res.data
  },

  async getById(id: string) {
    const res = await api().get(`/gas-meter/${id}`)
    return res.data
  },

  async create(data: { name?: string; meterNo: number }) {
    const res = await api().post('/gas-meter', data)
    return res.data
  },

  async update(id: string, data: Partial<{ name: string; meterNo: number }>) {
    const res = await api().put(`/gas-meter/${id}`, data)
    return res.data
  },

  async remove(id: string) {
    const res = await api().delete(`/gas-meter/${id}`)
    return res.data
  },
}
