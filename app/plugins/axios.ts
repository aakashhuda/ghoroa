import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBaseUrl || '/api',
    headers: { 'Content-Type': 'application/json' },
  })

  return {
    provide: { axios: api },
  }
})
