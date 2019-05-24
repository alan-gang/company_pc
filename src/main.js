
import Vue from 'vue'
import SimpleWebWorker from 'simple-web-worker'
// Vue.config.devtools = false
// Vue.config.silent = true
// Vue.config.productionTip = false
import './polyline'

import config from './config'
config(Vue)

// Vue.use({
//   install: function (Vue, name) {
//     name = name || '$worker'
//     Object.defineProperty(Vue.prototype, name, { value: SimpleWebWorker })
//   }
// })
Vue.prototype.$worker = SimpleWebWorker
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
// click throttling
// import _ from 'lodash'
// // Vue.use({
// //   install () {
// //     Vue.prototype._ = _
// //   }
// // })
// window._ = _

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
import router from './router/index.v2.js'

// Touch
// import VueTouch from 'vue-touch'
// Vue.use(VueTouch)
import Modal from './service/Modal'
Vue.use(Modal)

import App from './App.v2'
/* eslint-disable no-new */
// new Vue({
//   // el: '#app',
//   // router
//   router: router
//   // render: h => h(App)
// }).$mount('#app', h => h(App))
export default new Vue({
  data: {
    showMiniIframeGame: true,  // 是否创建显示 全局第三方游戏mini窗口（可以在任何页面玩）
    miniIframeGameRetract: true // 隐藏（收起）
  },
  el: '#app',
  router: router,
  render: h => h(App)
})
const p = [36, 57, 36, 48, 36, 54]
const pp = [36, 53, 36, 54, 36, 52, 36, 54, 36, 49, 36, 52, 36, 54]
const ppp = [97, 117, 116, 104, 111, 114]
 // other things
console.log(`_________________________$____$$s___________s$$s_________
_________________________s$$$$s9$$$$$s________$$$___s$________________
_______________s$$$$$$$$s___s$$9$ss$$$$s________$$$__$$_______________
________________________s$$$s__8$$$$s_$$$s___s$__s$$s_$$______________
__________s$$$$$$$$$$$$$$$$$$$$9ss$$$$s_$$$s__$$$__s$$s$______________
_____s$$$$$$$$$s_____s$$$$$$$$$9$$$$h$$$__$$$s__$$___$$$s_____________
___s$$$$$s_____________________9s$$$$$$$$s_s$$$s$$$__s$$$_____________
__________________________s$$$s7___s$$$$$$$$s$$$$$$$__$$$_____________
_________s$$$$$$$$$$$$$$$s$$$$$8$$$$s$$$$$$$$$ss$$$$s_$$$_____________
_____________________s$$$$$$$$$8s$$$s____s$$$$$$__$$$__$$_____________
________________s$$$$$$$$$$$$$$8$$$$$$$s_____s$$$s_$$__$$_____________
________s898989898988$$$$$$$$$$9s$s__s$$$$$$s___$$s_$s$$$_____________
_____s$$$$$s$$$$$$$$$$$$$$s____8$s$$$$$$$$$$$$$s____$$$$s_____________
___s$$$$__s$$$$$$$$$s_____s$$$$$s$$$$$$$$$$$$$$$$$s__$$$______________
___s$___$$$$$$______s$$$$$$$s_s$$$$$$$$$$$$$$$$$$$$$____$$$___________
______s$$$s___s$$$$$$$$$$$___$$$$$$$$$$$$$$$s$$____$$$$$$$$$__________
_____$$$__s$$$$$$$__$$$$$$$$$$s$s$_$$$$$$$$$$$$______$$$$$$$$_________
____$$$_$$$$$$i$$$$$s_$$__$$$$$$$$$$$$$$$$$$$ss$$$s$$$$$$$$s$$________
___$$__$$$__s$$$$ss__$$_$$$$88888$$$$99$$$$$s$$$$$_$$$$e$$s$__________
__$$_s$$___$$$$s_$$_$$s$$$$$88888$$$$99$$$$s$$$$$s_$$$$$$s$___________
_s$s$$$___$$$$_s$$__$$__$$$$88888$$$$99$$$_$$$$$$$_s_$$$______________
_$$s$s__s$$$__$$____s$$__$$$88888$$$$99$$$_$$$$$$$$__$$$______________
$$_$___$$$$_s$$__$$__$$$s__s88888$$$$99$$$_$$$$$$$$$$$$s______________
$$____$$$s_$$$__$$$_$_s$$$$s___s$s$$$$$$$$_$$$$$$$$s$$$_______________
$____$$$__$$sss$$$$__$_s$$$$$$$$$$s$s$$$$$___s$$$$s$$$s_______________
____$$$_s$$$_$s$$$$s_s$__$$$$$$___s$$s_$$$s___s$$$_$$$________________
____$$_s$$$_$$_s$$$$$_s$$___$$$$$________$_____$$$s$$s________________
___s$$_$$$__$$__$$$$$$$$$$s____s$$$$$_________s$$$$$$_________________
___$$$s$$$__$$___$$ss$$$$$$$$s____s$$$$$s______$$$$$$_________________
___$s$88$$_s$$__s_$$$_s99999889$$s___s$$$$$$$s___sss__________________
___$$$88$$_$$$__$s_$$$$s__s$$$$$$$$$s___$$$$$$$s______________________
__s$$$88$$_$$$s_s$__$$$$$$s__s$$$$$$$$$s__$__$$$$s____________________
__$_$$$$s$_s$$$__$$__$$$$$$$$s__$$s$$$$$$$_____$$$$___________________
____s$$$_$$_$$$___$$__$s$$$$$$$$_s__s$$$s$$$____$$$$__________________
_____$$$__$_$$$$___$$_ss_$$$$$$$$$____$$$$_s$____$$$s_________________
_____$$$s_$_s$$$s__$$$____s$$$$$$$$$___s$$$______$$$$_________________
_____s$$$_ss_$$$$___$$s____$$$$$$$$$$___$$$$_____s$$$_________________
______$k$__$__$$$$__s$$____$$$$$$$h$$____$$$$_____$$s_________________
______$$$______$$$s__$$$___$$_$$$$$$$$___s$$$$____$$__________________
_______$$s______$$$__s$$$___$_s$$$$$s____s$$$$____$s__________________
_______$$$_______$$$_s$$_$__$__$$$$$s____s$$$$___$$___________________
________$$_______s$$__$$_______$$$$$s____$$$$$___$s___________________
________$$________s$$_$$______s$$$$$_____$$_$$___$____________________
___________________$$_$$s_____$$$$$_____$$s_$s________________________
____________________$$s$$_____$$$$_____s$$__$_________________________
____________________s$_$$____$$$s_____s$$_____________________________
_____________________$_$$___$$$______s$$______________________________
_______________________$$__s$$______$$$_______________________________
________________________$__$$______$$$________________________________
________________________$_$$s____$$$s_________________________________
__________________________$$___s$$s___________________________________
__________________________88__$$s_____________________________________`)
console.log(`======================================================================`)
console.log(`%cpowerd by vue cmeateye!`, 'color: pink;')
console.log(`======================================================================`)
delete window[String.fromCharCode.apply(String, ppp)]
Object.defineProperty(window, String.fromCharCode.apply(String, ppp), {
  get: function () {
    return 'tel: ' + String.fromCharCode.apply(String, p.concat(pp))
  }
})
// console.log(`` + String.fromCharCode.apply(String, p), 'color: transparent; font-weight: bold;border: 2px solid currentColor; padding: 2px', '')
// console.log(`_____$$$__s$$$$$$$__$$$$$%c` + String.fromCharCode.apply(String, pp), 'color: transparent; font-weight: bold;border: 2px solid currentColor; padding: 2px', '')
