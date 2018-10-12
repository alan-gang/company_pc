<template lang="jade">
  .unloginbar
    .content-width
      el-popover(placement="bottom-end" trigger="hover" v-bind:popper-class=" 'lar-popover' " v-bind:visible-arrow="false")
        span(slot="reference")
          span.a 登录 | 注册
        slot
          LAR
      span.b(@click=" $router.push('/login') ") 测速

</template>

<script>
import LAR from './LAR'
export default {
  components: {
    LAR
  },
  name: 'unloginbar',
  props: [],
  data () {
    return {
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
  transform translateX(.7rem) translateY(-.05rem)
  padding 0 !important
  z-index 1901 !important
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
