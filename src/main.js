// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'

import Second from './components/second.vue'

import Axios from 'axios'
Vue.prototype.$axios = Axios

Vue.use(Vuex)

Vue.config.productionTip = false

const Bus = new Vue()

Vue.component('Second',Second)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  Bus,
  components: { App },
  template: '<App/>'
})
