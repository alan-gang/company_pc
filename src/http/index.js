import store from '../store'
export default (Vue) => {
  Vue.http.options.root = ''
  Vue.http.options.emulateJSON = true
  // Vue.http.headers.common['content-tytestpe'] = 'application/json'
  // Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
  // Vue.http.options.credentials = true
  Vue.http.options.xhr = {withCredentials: true}
  // Vue.http.headers.common['Authorization'] = 'ren huang'
  // Vue.http.interceptors.push((request, next) => {
  //   next(({data}) => {
  //     console.log('responsedata: ', data)
  //     if (data && data.success === -2) console.log('no Authorization')
  //   })
  // })
  Vue.http.interceptors.push(() => {
    return {
      request (req) {
        // if (req.url === preUrl) return null
        // if (req.url !== preUrl) preUrl = req.url
        // if (req.url === 'http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=createContract') {
        //   req.emulateJSON = false
        //   // req.headers['Content-Type'] = 'application/json'
        // }
        return req
      },
      response (rep) {
        // 用户过期
        if (rep.data && rep.data.success === -1) {
          if (store.state.user.login) {
            store.state.user.login = false
            this.$modal.warn({
              content: '您长时间没有操作，请重新登录！',
              btn: ['确定'],
              close () {
                this.__setCall({fn: '__logout'})
              },
              O: this
            })
          }
        }
        console.log(rep.data)
        // if (data && data.success === -2) console.log('no Authorization')
        return rep
      }
    }
  })
}
