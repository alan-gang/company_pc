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
        e && e()
        return THROTTLE.xhr
      },
      finally: function (f) {
        f && f()
        return THROTTLE.xhr
      },
      catch: function (f) {
        f && f()
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
        // console.log(this['throttle_' + m], '??????', m, this.throttle_post)
        return this['throttle_' + m]
      }
    })
  })
  let M = null
  let VM = null
  // let throttle = {}
  Vue.http.interceptors.push(() => {
    return {
      request (req) {
        if (this && this.$modal) VM = this
        // if (throttle[req.url]) {
        //   try {
        //     // req.abort()
        //     req.cancel()
        //   } catch (e) {
        //     console.log('cancel repeat request faild !!!!!')
        //     req.url = ''
        //   }
        // } else {
        //   throttle[req.url] = true
        //   setTimeout(() => {
        //     throttle[req.url] = false
        //   }, 2000)
        // }
        return req
      },
      response (rep) {
        // 用户过期
        if (rep.data && rep.data.success === -1 && !M) {
          // if (store.state.user.login) {
          VM && (M = VM.$modal.warn({
            content: '您长时间没有操作，请重新登录！',
            btn: ['确定'],
            close () {
              store.state.user.login = false
              M = null
              VM.__setCall({fn: '__logout', args: undefined, callId: undefined})
            },
            O: VM
          }))
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
