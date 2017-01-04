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
      setCall (call) {
        setTimeout(() => {
          this.call = Object.assign(this.call, call)
          this.call._count++
        }, 0)
      }
    }
  })
}
