import Vue from 'vue'
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
  // router: router,
  render: h => h(App)
})
