export default Vue => {
  Vue.http.options.root = ''
  Vue.http.options.emulateJSON = true
  // Vue.http.headers.common['Authorization'] = 'ren huang'
  Vue.http.interceptors.push((request, next) => {
    next((rep) => {
      try {
        rep.body = JSON.parse(rep.body)
      } catch (e) {
        console.log(e)
      }
    })
  })
}
