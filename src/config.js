export default (Vue) => {
  let call = {
    fn: '',
    args: '',
    _count: 0
  }
  Vue.mixin({
    data () {
      return {
        call: call
      }
    },
    watch: {
      call: {
        deep: true,
        handler () {
          if (this.call.fn && typeof this[this.call.fn] === 'function') {
            this.$nextTick(this[this.call.fn](this.call.args))
          }
        }
      }
    },
    methods: {
      __setCall (call) {
        setTimeout(() => {
          this.call = Object.assign(this.call, call)
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
      }
    }
  })
}
