// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  // SPA mode (ssr: false) doesn't ship a server-side app manifest, so this feature
  // adds nothing but causes Vite import-analysis to fail on the (dead-code) `#app-manifest`
  // import inside Nuxt's manifest composable. Disabling it removes the resolution attempt.
  experimental: {
    appManifest: false,
  },
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
      /** Laravel public API base (no trailing slash), e.g. https://rapidfix-be.test/api */
      rapidfixApiUrl: process.env.NUXT_PUBLIC_RAPIFIX_API_URL || '',
      /** Shown on booking success; used in mailto links site-wide */
      contactEmail: 'hello@rapidfix.com',
    },
  },
})
