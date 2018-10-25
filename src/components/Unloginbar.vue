<template lang="jade">
  .unloginbar
    .content-width
      el-popover(placement="bottom-end" trigger="hover" v-bind:popper-class=" 'lar-popover' " v-bind:visible-arrow="false" v-model="show" @show=" __setCall({fn: '__LARCODE'}) ")
        span(slot="reference")
          span.a(@mouseover="") 登录 | 注册
        slot
          LAR

      el-popover(placement="bottom-end" trigger="hover" v-bind:popper-class=" 'lt-popover' " v-bind:visible-arrow="false")
        span(slot="reference")
          span.b 测速
        slot
          .content-width
            LT

</template>

<script>
import LAR from './LAR'
import LT from '../views/login/LoginTest'
export default {
  components: {
    LAR,
    LT
  },
  name: 'unloginbar',
  props: [],
  data () {
    return {
      show: false
    }
  },
  created () {
  },
  methods: {
    __LAR () {
      this.show = true
    }
  }
}
</script>

<style lang="stylus">
@import '../var.stylus'
// 建议不添加scoped， 所有样式最多嵌套2层
.lar-popover
.lt-popover
  transform translateX(.7rem) translateY(-.05rem)
  padding 0 !important
  z-index 1901 !important
.lt-popover
  transform translateX(0) translateY(-.05rem)
  background rgba(0,0,0, .95) !important
  .login-test 
    h2
      display none
    .routers
      padding-bottom .15rem

  
  
  
.unloginbar
  text-align right
  background-color #ffa930
  color #302b2a
  height .3rem
  line-height .3rem
  .a, .b
    padding  0 .2rem
    cursor pointer
    display inline-block
    &:hover
      background-color #e9e9e9

</style>
