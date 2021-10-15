// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// Core Plugin
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// [Optional Components]D2-Crud
import D2Crud from '@d2-projects/d2-crud'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Menu And Routing Settings
import router from './router'
import menuHeader from '@/menu/header'
// import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
// Menu tools
import util from '@/libs/util.js'
import VueClipboard from 'vue-clipboard2'

// Core Plugin
Vue.use(d2Admin)

// Optional plug-in components
Vue.use(ElementUI)
Vue.use(D2Crud)
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // Process routing Get the routing settings of each level
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // Set top bar menu
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // Set sidebar menu
    // this.$store.commit('d2admin/menu/asideSet', menuAside)
    util.menu.init()
    // Initialize the menu search function
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // Display system information
    this.$store.commit('d2admin/releases/versionShow')
    // Load a series of settings from the database after the user logs in
    this.$store.dispatch('d2admin/account/load')
    // Acquire and record users UA
    this.$store.commit('d2admin/ua/get')
    // Initialize full-screen monitoring
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
