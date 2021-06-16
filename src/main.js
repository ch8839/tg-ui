import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import './registerServiceWorker'
import request from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Gravel from '@gfe/gravel';
import '@gfe/gravel/build/style/index.css';
    
import _ from 'lodash'



import '@/icons' // icon

Vue.use(ElementUI)
Vue.use(Gravel)

Vue.prototype.$request = request
Vue.prototype._ = _

// import G2 from '@antv/g2';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 只有vue.config.js中runtimeCompiler为true才能用这种写法
// new Vue({
//   el: '#app',
//   components: { App },
//   router,
//   store,
//   template: '<App />'
// })
