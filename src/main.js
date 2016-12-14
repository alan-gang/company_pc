import Vue from 'vue'

// Http
import VueResource from 'vue-resource'
import httpConfig from './http/index'
Vue.use(VueResource)
httpConfig(Vue)

// Router
import VueRoter from 'vue-router'
import routerConfig from './router/index'
Vue.use(VueRoter)
let router = routerConfig(VueRoter)

// Touch
// import VueTouch from 'vue-touch'
// Vue.use(VueTouch)

// 饿了么
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import App from './App'

/* eslint-disable no-new */
// new Vue({
//   // el: '#app',
//   // router
//   router: router
//   // render: h => h(App)
// }).$mount('#app', h => h(App))

export default new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
