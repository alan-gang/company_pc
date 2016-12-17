<template lang="jade">
  dl.login-form

    dt.ds-icon-notice(v-if="this.regard")
      | 问候语：
      span.regard {{ regard }}

    // dt.ds-icon-notice(v-if="notice") {{ notice }}
      

    dd.ds-icon-user
      input(placeholder="用户名" v-model="userName" @change="getGreetingMsg")

    dd.ds-icon-pwd(v-bind:class="{disabled: disablePwd}")
        input(placeholder="密码" v-model="pwd" v-bind:disabled="disablePwd" type="password" )

    dd.ds-icon-edit
      input(placeholder="验证码" v-model="code" @input="(code.length > 3) && checkVerifyCode()" @keyup.enter="login")
      i.ds-icon-code(v-bind:style="{background: 'url(' + codeUrl + ') right center no-repeat'}" @click="getVerifyImage")

    dd.ds-button.positive.full.bold.login(@click="login") 登录

    dd.actions
      router-link.try.ds-button.text-button.light.small(:to="'login/try'") 试玩登录
      router-link.forget.ds-button.text-button.light.small(:to="'login/forget'") 忘记密码



           
</template>
<script>
  import api from '../../http/api'
  export default {
    data () {
      return {
        notice: '',
        regard: false,
        codeUrl: '',
        code: '',
        userName: '',
        pwd: '',
        imgData: ''
      }
    },
    computed: {
      disablePwd () {
        return !this.userName || this.regard === false
      },
      codeUrl () {
        return 'data:image/png;base64,' + this.imgData
      }
    },
    created () {
      this.getVerifyImage()
    },
    methods: {
      login () {
        if (this.hasEmpty()) this.notice = '输入值不能为空'
        else {
          this.$http.post(api.validate, {userName: this.userName, userPwd: this.pwd, verifyCode: this.code}).then(({data}) => {
            // success
            if (data.success) {
              this.$emit('update-user', {login: true, name: data.nickName})
              this.$router.push('/')
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: '用户名或密码错误！'
              })
            }
          }, (rep) => {
            // error
          })
        }
      },
      hasEmpty () {
        return !this.userName || !this.pwd || !this.code
      },
      getGreetingMsg () {
        this.$http.post(api.getGreetingMsg, {userName: this.userName}).then(({data}) => {
          // success
          if (data.success) {
            this.regard = data.greetingMsg || ''
            if (!this.regard) {
              // this.regard = '常用语空空如也！'
              this.$message({
                type: 'info',
                // showClose: true,
                message: '常用语空空如也。'
              })
            }
            if (!this.code) setTimeout(() => this.$el.querySelector('.ds-icon-pwd input').focus(), 0)
          } else {
            // this.notice = '常用语获取失败！'
            this.$message({
              type: 'error',
              showClose: true,
              message: '常用语获取失败！'
            })
          }
        }, (rep) => {
          // this.notice = '常用语获取失败！'
          this.$message({
            type: 'error',
            showClose: true,
            message: '常用语获取失败！'
          })
        })
      },
      getVerifyImage () {
        this.$http.get(api.getVerifyImage).then(({data}) => {
          // success
          if (data.success) this.imgData = data.data
        }, (rep) => {
          // error
        })
      },
      checkVerifyCode () {
        this.$http.post(api.checkVerifyCode, {verifyCode: this.code}).then(({data}) => {
          // success
          // if (!data.success) this.notice = '验证码输入不正确！'
          if (!data.success) {
            this.$message({
              type: 'error',
              showClose: true,
              message: '验证码输入不正确！'
            })
          } else {
            this.$message({
              type: 'success',
              showClose: true,
              message: '验证码正确！'
            })
          }
        }, (rep) => {
          // error
        })
      }
    }
  }
</script>
<style lang="stylus">
  @import '../../var.stylus'
  .login-form
    .ds-icon-notice
      padding .08rem PW
      padding-left PW + .08rem + .16rem
      line-height .2rem
      color GOLD
      text-align left
      border 1px solid GOLD
      radius()
      & + .ds-icon-notice
        margin-top .05rem
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
      &.disabled
        opacity .5
        cursor not-allowed
        input
          cursor not-allowed
      &.actions
        border 0
        padding PW*.52 0
      
  .try
    float left
  .forget
    float right
  
  
</style>