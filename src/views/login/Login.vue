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
      router-link.try.ds-button.text-button.light.small(:to="'/login/try'" @click.native.stop="" v-if="!m") 试玩登录
      router-link.back-router.ds-button.text-button.light.small(:to="'/login'" @click.native.stop="" style="float: left") 切换线路
      .forget.ds-button.text-button.light.small(style="position: relative" v-bind:class="{over: over}" @mouseleave=" overf(0) " @mouseover=" overf(1) ") 无法登录
        .con(ref="con" style="position: absolute; left: .9rem; top: -3rem; max-height: 6rem; overflow: auto; padding: .3rem .5rem; background: #efefef; border-radius: 5px; cursor: default")
          p(style="color: red; margin: 0 .15rem") safari及其它浏览器请至“偏好设置” -> “隐私”中允许第三方cookie
          p(style="color: #349dbd; margin: 0 .15rem") 第一步： 点击浏览器右上角的设置图标，选择“Internet选项“
          div(style="display: inline-block; margin: 0 auto; padding: .1rem .1rem .05rem .1rem; border-radius: 5px; background: rgba(255, 255, 255, .5)")
            img(src="../../assets/1.png")
          p(style="color: #349dbd; margin: .15rem") 第二步： 点击"隐私“选项卡，将隐私策略调整到”低“
          img(src="../../assets/2.png")
      router-link.forget.ds-button.text-button.light.small(:to="'/login/forget'" @click.native.stop="") 忘记密码



           
</template>
<script>
  import api from '../../http/api'
  import xhr from 'components/xhr'
  // import { launchFullScreen } from '../../util/Dom'

  export default {
    name: 'Login',
    mixins: [xhr],
    props: ['m'],
    data () {
      return {
        regard: false,
        pwd: '',
        over: false,
        overt: 0
        // safari: window.userPlatInfo.browser === 'safari'
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
      // let {un_, pwd} = this.$route.query
      // if (un_) this.un_ = un_
      // if (pwd) this.pwd = pwd
      // if (un_ && pwd) {
      //   setTimeout(() => {
      //     this.$el.querySelector('.ds-icon-edit input').focus()
      //   }, 0)
      //   this._getVerifyImage()
      // } else {
      //   setTimeout(() => {
      //     this.$el.querySelector('.ds-icon-user input').focus()
      //   }, 0)
      //   this.tryLogin()
      // }
    },
    methods: {
      loginSuccess (data) {
        // call app.vue loginsuccess
        this.__setCall({fn: '__loginSuccess', args: data, callId: undefined})

        // this.__setCall({fn: '__getUserFund', callId: undefined})
        // this.__setCall({fn: '__getUserPrefence', callId: undefined})
        // this.$emit('update-user', {login: true,
        //   name: data.nickName,
        //   pwd: data.hasLogPwd === '1',
        //   cashPwd: data.hasSecurityPwd === '1',
        //   type: data.identity,
        //   account: data.userName,
        //   shareCycle: data.shareCycle,
        //   role: data.roleId,
        //   hasBankCard: data.hasBankCard === '1',
        //   guide: data.isTry === '1' ? false : (!data.nickName || data.hasLogPwd !== '1' || data.hasSecurityPwd !== '1'),
        //   cbsafe: !!data.isOpenKey,
        //   safeCheck: data.verifyType,
        //   isVip: data.isVip === '1'
        // })
        // this.$router.push('/help/6-2-1')
        // window.accessAngular.setUser({
        //   id: data.userId,
        //   key: data.token,
        //   pltCd: data.platId,
        //   socketUrl: data.platUrl
        // })
        // window.accessAngular.isStranger(false)
        // // window.accessAngular.connect()
        // setTimeout(window.accessAngular.connect, api.preApi && api.preApi !== api.api ? 1000 : 0)
        // window.localStorage.setItem('api', api.api)
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
              if (data.success === 1) {
                this.loginSuccess(data)
              } else {
                this.$message.error(data.msg || '用户名或密码错误！')
                this.code_ = ''
                this.pwd = ''
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
        this.regard = false
        if (!this.un_) return false
        this.$http.get(api.getGreetingMsg, {
          userName: this.un_
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.regard = data.greetingMsg || ''
            if (!this.regard) {
              this.$message.warning('您未设置登录问候语！')
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
          if (data.success === 1) {
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
      },
      overf (f) {
        if (f) {
          clearTimeout(this.overt)
          this.over = true
          this.$refs.con.focus()
        } else {
          this.overt = setTimeout(() => {
            this.over = false
          }, 300)
        }
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
    .con
      text-align left
      display none
      z-index 1
    @media screen and (max-height: 800px)
      .con
        padding .15rem !important
        img
          width 4rem
    
    &:hover
    &.over
      .con
        display block
  .ds-icon-user
  .ds-icon-pwd
  .ds-icon-edit
    background-position PW .18rem
</style>
