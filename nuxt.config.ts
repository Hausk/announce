// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@unocss/nuxt', '@nuxt/fonts'],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
      ]
    }
  },
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-07-30',
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
