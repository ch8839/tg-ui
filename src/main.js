import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import './registerServiceWorker'
import request from 'axios'

// import G2 from '@antv/g2';
Vue.config.productionTip = false

import '@/icons' // icon

Vue.prototype.$request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
