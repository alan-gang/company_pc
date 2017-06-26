<template lang="jade">
  dl.login-form
    
    dt.ds-icon-notice(:class="{ h0: !this.regard }")
      | 问候语：
      span.regard {{ regard }}

    // dt.ds-icon-notice(v-if="notice") {{ notice }}
      

    dd.ds-icon-user
      input( v-model="un_" @change="getGreetingMsg" autofocus)

    dd.ds-icon-pwd(v-bind:class="{disabled: disablePwd}")
        input(v-model="pwd" v-bind:disabled="disablePwd" type="password" )

    dd.ds-icon-edit(v-bind:class="{disabled: !pwd}")
      input( v-model="code_" @keyup.enter="login" v-bind:disabled="!pwd")
      i.ds-icon-code(v-bind:style="{background: 'url(' + img_ + ') right center no-repeat'}" @click="_getVerifyImage")

    dd.ds-button.positive.full.bold.login(@click="login" style="border: none") 登录

    dd.actions
      router-link.try.ds-button.text-button.light.small(:to="'/login/try'" @click.native.stop="") 试玩登录
      router-link.forget.ds-button.text-button.light.small(:to="'/login/forget'" @click.native.stop="") 忘记密码



           
</template>
<script>
  import api from '../../http/api'
  import xhr from 'components/xhr'
  // import { launchFullScreen } from '../../util/Dom'

  export default {
    name: 'Login',
    mixins: [xhr],
    data () {
      return {
        regard: false,
        pwd: ''
      }
    },
    computed: {
      disablePwd () {
        return !this.un_ || this.regard === false
      }
    },
    mounted () {
      let {un_, pwd} = this.$route.query
      if (un_) this.un_ = un_
      if (pwd) this.pwd = pwd
      if (un_ && pwd) {
        setTimeout(() => {
          this.$el.querySelector('.ds-icon-edit input').focus()
        }, 0)
        this._getVerifyImage()
      } else {
        setTimeout(() => {
          this.$el.querySelector('.ds-icon-user input').focus()
        }, 0)
        this.tryLogin()
      }
    },
    activated () {
    },
    methods: {
      loginSuccess (data) {
        this.$emit('update-user', {login: true,
          name: data.nickName,
          pwd: data.hasLogPwd === '1',
          cashPwd: data.hasSecurityPwd === '1',
          type: data.identity,
          account: data.userName,
          shareCycle: data.shareCycle,
          role: data.roleId,
          hasBankCard: data.hasBankCard === '1',
          guide: data.isTry === '1' ? false : (!data.nickName || data.hasLogPwd !== '1' || data.hasSecurityPwd !== '1'),
          cbsafe: !!data.isOpenKey,
          safeCheck: data.verifyType
        })
        this.$router.push('/')
        window.accessAngular.setUser({
          id: data.userId,
          key: data.token,
          pltCd: data.platId,
          socketUrl: data.platUrl
        })
        window.accessAngular.isStranger(false)
        // window.accessAngular.connect()
        setTimeout(window.accessAngular.connect, api.preApi && api.preApi !== api.api ? 1000 : 0)
      },
      login () {
        if (this.hasEmpty()) {
          this.$message.warning('输入值不能为空')
        } else {
          // launchFullScreen(document.body)
          // let loading = this.$loading('登录中...')
          this._checkVerifyCode(() => {
            this.$http.post(api.validate, {userName: this.un_, userPwd: this.pwd, verifyCode: this.code_, channelType: 'web'}).then(({data}) => {
              // success
              if (data.success) {
                this.loginSuccess(data)
              } else {
                this.$message.error('用户名或密码错误！')
                this._getVerifyImage()
              }
            }, (rep) => {
              // error
            }).finally(() => {
              // loading.close()
            })
          })
        }
      },
      hasEmpty () {
        return !this.un_ || !this.pwd || !this.code_
      },
      getGreetingMsg () {
        this.$http.get(api.getGreetingMsg, {
          userName: this.un_
        }).then(({data}) => {
          // success
          if (data.success) {
            this.regard = data.greetingMsg || ''
            if (!this.regard) {
              this.$message('常用语空空如也。')
            }
            setTimeout(() => this.$el.querySelector('.ds-icon-pwd input').focus(), 0)
          } else {
            this.$message.error('常用语获取失败！')
          }
        }, (rep) => {
          this.$message.error('常用语获取失败！')
        })
        // window.$.ajax({
        //   url: api.getGreetingMsg,
        //   data: {userName: this.un_},
        //   xhrFields: {
        //     withCredentials: true
        //   }
        // })
      },
      tryLogin () {
        // try login
        // let loading = this.$loading({
        //   text: '自动登录中...',
        //   target: this.$el.querySelector('.login')
        // })
        this.$http.get(api.validate).then(({data}) => {
          // success
          if (data.success) {
            this.loginSuccess(data)
            // this.$emit('update-user', {login: true,
            //   name: data.nickName,
            //   pwd: data.hasLogPwd === '1',
            //   cashPwd: data.hasSecurityPwd === '1',
            //   hasBankCard: data.hasBankCard === '1',
            //   shareCycle: data.shareCycle,
            //   type: data.identity,
            //   account: data.userName,
            //   role: data.roleId,
            //   guide: data.isTry === '1' ? false : (!data.nickName || data.hasLogPwd !== '1' || data.hasSecurityPwd !== '1')
            //   // guide: true
            // })
            // this.$router.push('/')
            // window.accessAngular.setUser({
            //   id: data.userId,
            //   key: data.token,
            //   pltCd: data.platId,
            //   socketUrl: data.platUrl
            // })
            // window.accessAngular.isStranger(false)
            // setTimeout(window.accessAngular.connect, api.preApi && api.preApi !== api.api ? 1000 : 0)
          } else {
            this._getVerifyImage()
            // loading.text = '自动登录失败'
          }
        }, (rep) => {
          this._getVerifyImage()
          // loading.text = '自动登录失败'
          // error
        }).finally(() => {
          // loading.close()
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
      &.h0 + .ds-icon-user
        margin-top .38rem
      &.h0
        height 0
        padding 0
        border none
        overflow hidden
    dd
      line-height BMH + .1rem
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
        line-height 50px
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
  
  .ds-icon-user
  .ds-icon-pwd
  .ds-icon-edit
    background-position PW .18rem
</style>
