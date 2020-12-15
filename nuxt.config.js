require('dotenv').config()
export default {
  ssr: 'false',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Technogym' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '~/css/font-awesome.min.css'
      }
    ],
    script: [
      { src: 'https://use.fontawesome.com/releases/v5.0.11/js/all.js' },
      {
        src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyDXYPQoJp5PfiT6S8e27KHzvaMIpD58NRw&libraries=places`,
        defer: true
      },
      {
        hid: 'tawk.to',
        src: `https://embed.tawk.to/${process.env.TAWK_TO}/default`,
        defer: true
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff6e7f' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/chart', ssr: false },
    { src: '@/plugins/vuex-persistence' },
    { src: '@/plugins/vue-moment' },
    { src: '@/plugins/vue-datetime' },
    { src: '@/plugins/vuelidate' },
    { src: '@/plugins/google-maps' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/color-mode'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@neneos/nuxt-animate.css',
    'nuxt-fontawesome',
    '@nuxtjs/dotenv',
    '@nuxtjs/toast'
  ],
  toast: {
    duration: 2000
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: { baseURL: process.env.baseURL },

  // auth module config
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/token/login/',
            method: 'post',
            propertyName: 'auth_token'
          },
          user: {
            url: 'auth/users/me/',
            method: 'get',
            propertyName: false
          },
          logout: {
            url: 'auth/token/logout/',
            method: 'post'
          }
        },
        tokenType: 'Token',
        tokenRequired: true
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [/^vue2-google-maps($|\/)/, /^vue2-gmap-custom-marker($|\/)/],
    extend(config, ctx) {}
  }
}
