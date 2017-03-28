<template lang="jade">
  .login-register
    div.form-item
      label.item.ds-input 帐号:
        input
    div.form-item
      label.item.ds-input 昵称:
        input
    div.form-item
      label.item.ds-input 验证码:
        input(style="width: 1rem" v-model="code_" @keyup.enter="login")
        i.ds-icon-code(v-bind:style="{background: 'url(' + img_ + ') right center no-repeat'}" @click="_getVerifyImage")

    div.form-item
      .ds-button.bold.tall.high-positive._3rem.oval 立即注册
      br
      router-link.ds-button.text-button.light(:to=" '/login' " style="margin-top: .1rem") 我要登录




    
</template>

<script>
  // import '../../main.all.out.min.js'
  import browser from '../../util/browser'
  import xhr from 'components/xhr'
  export default {
    mixins: [xhr],
    components: {
      // SignalBar
    },
    data () {
      return {
      }
    },
    computed: {
    },
    mounted () {
      this._getVerifyImage()
      if (browser.mobile) window.location.href = 'http://mobile.cagames.ca.go'
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  W = 2.7rem
  H = 1.8rem
  .login-register
    background url(../../assets/banner.png) 55% top no-repeat
    padding-top 4rem
    position relative
    top -1.5rem
    text-align center
    

  .form-item
    margin PW 0
  .item
    position relative
    width 3rem
    height .5rem
    padding 0 .25rem
    line-height .5rem
    radius(.25rem)
    color #bbb
    text-align left
    input
      border none
      padding-left .1rem
      width 2rem
  .ds-icon-code
    position: absolute;
    bottom: 0.1rem;
    right: 0.15rem;
    display: inline-block;
    width: 0.83rem;
    height: 0.29rem;
    cursor: pointer; 

    
</style>