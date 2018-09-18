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
  let THROTTLE = {
    xhr: {
      defaultArgs: {
        timeout: 10000
      },
      then: function (s, e) {
        // e && e()
        return THROTTLE.xhr
      },
      finally: function (f) {
        f && f()
        return THROTTLE.xhr
      },
      catch: function (f) {
        // f && f()
        return THROTTLE.xhr
      }
    }
  }
  Vue.http.throttle_get = (api, args) => {
    if (THROTTLE[api]) {
      return THROTTLE.xhr
    } else {
      THROTTLE[api] = true
      setTimeout(() => {
        THROTTLE[api] = false
      }, 1000)
      return Vue.http.myget(api, args)
    }
  }
  Vue.http.throttle_post = (api, args) => {
    if (THROTTLE[api]) {
      return THROTTLE.xhr
    } else {
      THROTTLE[api] = true
      setTimeout(() => {
        THROTTLE[api] = false
      }, 1000)
      return Vue.http.mypost(api, args)
    }
  }

  ['get', 'post'].forEach(m => {
    Vue.http['my' + m] = Vue.http[m]
    Object.defineProperty(Vue.http, m, {
      get: function () {
        return this['throttle_' + m]
      }
    })
  })
  let M = null
  let VM = null
  Vue.http.interceptors.push((request) => {
    return {
      request (req) {
        if (this && this.$modal) VM = this
        return req
      },
      response (rep) {
        // 用户过期
        if (rep.data && rep.data.success === -1 && !M) {
          VM && (M = VM.$modal.warn({
            content: '您长时间没有操作，请重新登录',
            btn: ['确定'],
            close () {
              store.state.user.login = false
              M = null
              VM.__setCall({fn: '__logout', args: undefined, callId: undefined})
            },
            O: VM
          }))
        } else if (rep.data && rep.data.success === -3) {
          this.$router.push('/login/forbidden')
        } else if (rep.data && rep.data.success === 0 && rep.data.msg && !M) {
          VM && (M = VM.$modal.warn({
            // target: VM.$el,
            content: rep.data.msg,
            btn: ['确定'],
            close () {
              M = null
            }
          }))
        }
        return rep
      }
    }
  })
}
