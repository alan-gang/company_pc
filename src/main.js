
import Vue from 'vue'
Vue.config.devtools = false
Vue.config.silent = true
Vue.config.productionTip = false
import './polyline'

import config from './config'
config(Vue)

// ow
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// Vue.use(VueAwesomeSwiper)

// progressBar
// import VueProgressBar from 'vue-progressbar'

// Vue.use(VueProgressBar, {
//   color: 'rgb(143, 255, 199)',
//   failedColor: 'red',
//   height: '3px',
//   transition: {
//     speed: '0.2s',
//     opacity: '0.6s',
//     termination: 300
//   }
// })

// 饿了么
import elementConfig from './elementConfig'
elementConfig(Vue)
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(ElementUI)

// import clipboard from 'vue-clipboards'
import clipboard from 'vue-clipboard2'
Vue.use(clipboard)

// Http
import VueResource from 'vue-resource'
import httpConfig from './http'
Vue.use(VueResource)
httpConfig(Vue)

// filter
import filter from './filter'
filter(Vue)

// Router
import VueRoter from 'vue-router'
import routerConfig from './router'
Vue.use(VueRoter)
let router = routerConfig(VueRoter)

// Touch
// import VueTouch from 'vue-touch'
// Vue.use(VueTouch)
import Modal from './service/Modal'
Vue.use(Modal)

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
