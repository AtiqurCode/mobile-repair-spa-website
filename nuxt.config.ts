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
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
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
    /** Optional: Zapier / Make / Slack webhook URL to receive JSON booking payloads */
    bookingWebhookUrl: process.env.NUXT_BOOKING_WEBHOOK_URL || '',
    public: {
      /** Shown on booking success; used in mailto links site-wide */
      contactEmail: 'hello@rapidfix.com'
    }
  }
})
