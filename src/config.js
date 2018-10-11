export default (Vue) => {
  let call = {
    fn: '',
    args: '',
    _count: 0
  }
  Vue.mixin({
    data () {
      return {
        window: window,
        call: call,
        platform: window.platform,
        global: {
          width: 0,
          height: 0,
          scale: 0,
          st: 0,
          sl: 0,
          sh: 0,
          sw: 0
        }
      }
    },
    // watch: {
    //   call: {
    //     deep: true,
    //     handler () {
    //       if (this.call.fn && typeof this[this.call.fn] === 'function') {
    //         (!this.call.callId || this.call.callId === this.callId) && this.$nextTick(this[this.call.fn](this.call.args))
    //       }
    //     }
    //   }
    // },
    created () {
      if (Object.keys(this.$options.methods).join(',').match(/__(?!(setCall|loading|setGlobal))/g)) {
        // console.log(Object.keys(this.$options.methods))
        this.$watch('call', () => {
          if (this.call.fn && typeof this[this.call.fn] === 'function') {
            (!this.call.callId || this.call.callId === this.callId) && this.$nextTick(this[this.call.fn](this.call.args))
          }
        }, {deep: true})
      }
    },
    methods: {
      __setCall (call) {
        setTimeout(() => {
          this.call = Object.assign(this.call, {callId: this.callId}, call)
          this.call._count++
        }, 0)
      },
      __loading (options, timeout, timeoutmsg) {
        if (typeof options === 'string') options = {text: options}
        let loading = this.$loading(options)
        if (timeout !== undefined) {
          setTimeout(() => {
            if (loading) {
              if (timeoutmsg) {
                this.__loading(Object.assign(options, {text: timeoutmsg}), 0)
              }
              loading.close()
            }
          }, timeout)
        }
      },
      __setGlobal (global) {
        this.global = Object.assign(this.global, global)
      }
    }
  })
}
