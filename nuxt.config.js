export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
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
    script: [{ src: 'https://use.fontawesome.com/releases/v5.0.11/js/all.js' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
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
    { src: '@/plugins/vue-moment' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
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
    'nuxt-fontawesome'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: { baseURL: 'http://127.0.0.1:8000/api/v1/' },

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
    extend(config, ctx) {}
  }
}
