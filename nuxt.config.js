module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'portfolio-2019',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Portfolio 2019' },
      { name: 'msapplication-TileColor', content: '#2b5797', },
      { name: 'theme-color', content: '#ffffff', }
    ],
    link: [
      // { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png', },
      // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png', },
      // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png', },
      // { rel: 'manifest', href: '/favicons/site.webmanifest', },
      // { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#5bbad5', },
      // { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png', },
    ],
  },
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/fonts.css',
    '~/assets/css/variables.css'
  ],
  env: {
    WP_API_ROOT: 'http://localhost:8888/admin/wp-json/'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#E55C79' },

/*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/component-cache'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.WP_API_ROOT
  },


  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['axios'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    { src: '~/plugins/polyfill/intersection-observer.js', ssr: false },
    { src: '~/plugins/SplitText.js', ssr: false },
    { src: '~/plugins/modernizr.js', ssr: false },
    { src: '~/plugins/lethargy.min.js', ssr: false },
    { src: '~/plugins/gsap/plugins/ScrollToPlugin.js', ssr: false },
    { src: '~/plugins/vue-observe-visibility.js' },
    { src: '~/plugins/vue-lazyload.js' },
  ]
}

