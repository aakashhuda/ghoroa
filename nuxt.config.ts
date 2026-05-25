// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@ant-design-vue/nuxt', '@nuxtjs/tailwindcss'],
  antd: {
    // Options
  },
  tailwindcss: {
    config: {
      content: [
        './pages/**/*.{vue,ts,js}',
        './components/**/*.{vue,ts,js}',
        './layouts/**/*.{vue,ts,js}',
      ],
    },
  },
})