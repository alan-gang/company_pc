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
  let M = null
  Vue.http.interceptors.push(() => {
    return {
      request (req) {
        return req
      },
      response (rep) {
        // console.log(rep, '?????')
        // 用户过期
        if (rep.data && rep.data.success === -1 && !M) {
          // if (store.state.user.login) {
          store.state.user.login = false
          M = this.$modal.warn({
            content: '您长时间没有操作，请重新登录！',
            btn: ['确定'],
            close () {
              M = null
              this.__setCall({fn: '__logout', args: undefined, callId: undefined})
            },
            O: this
          })
          // }
        } else if (rep.data && rep.data.success === -3) {
          // M = this.$modal.warn({
          //   content: '您所在的区域禁止登录本站， 抱歉请谅解！',
          //   btn: ['确定'],
          //   close () {
          //     M = null
          //     window.location.href = 'www.baidu.com'
          //   },
          //   O: this
          // })
          this.$router.push('/login/forbidden')
        }
        // block8/3 console.log(rep.data)
        // if (data && data.success === -2) console.log('no Authorization')
        return rep
      }
    }
  })
}
