// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  app: {
    head: {
      title: 'RapidFix Mobile Repair',
      meta: [
        {
          name: 'description',
          content:
            'Fast and reliable phone repair services for screen, battery, camera, and water damage issues.'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      bookingUrl: 'https://samiul.crm.prosaas.org/public/lead'
    }
  }
})
