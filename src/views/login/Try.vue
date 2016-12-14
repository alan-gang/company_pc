<template lang="jade">
  dl.try-form
    dt 试玩
    dd.ds-icon-edit
      input(placeholder="验证码")
      i.ds-icon-code()
      // v-bind:style="{background: 'url(' + codeUrl + ') right center no-repeat'}"

    dd.ds-button.positive.full.bold.login(@click="login") 登录

    dd.actions
      router-link.back.ds-button.text-button.light.small(:to="'/login'") 
        | <返回登录
</template>

<script>
// import base from 'components/base'
export default {
  // mixins: [base],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    login () {
      this.$emit('update-user', {login: true})
      this.$router.push('/')
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../var.stylus'

  .try-form
    dt
      margin-bottom BMH
      color WHITE
      font-size .18rem
      text-align center
    dd
      height BMH
      padding 0 PW
      padding-left PW + .1rem + .24rem
      border-bottom 1px solid rgba(255, 255, 255, .2)
      &:hover
        border-bottom 1px solid rgba(255, 255, 255, .5)
      &.ds-icon-edit
        position relative
        input
          padding-right CW + PW
        .ds-icon-code
          
          position absolute
          bottom .05rem
          right PW
          display inline-block
          width CW
          height CH
          cursor pointer
      &.login
        height .36rem
        line-height .36rem
        padding-left 0
        padding-right 0
        margin-top PW
      input
        height 100%
        line-height 100%
        border 0
        background transparent
        color WHITE
        font-size .14rem
        letter-spacing .02rem
        width 100%
        box-sizing border-box
      &.actions
        border 0
        padding PW*.52 0
      
  .back
    float left
  
</style>



