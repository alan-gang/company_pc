export default (Vue) => {
  Vue.http.options.root = ''
  Vue.http.options.emulateJSON = true
  Vue.http.options.credentials = true
  // Vue.http.headers.common['Authorization'] = 'ren huang'
  Vue.http.interceptors.push((request, next) => {
    next(({data}) => {
      console.log('responsedata: ', data)
      if (data && data.success === -2) console.log('no Authorization')
    })
  })
}
