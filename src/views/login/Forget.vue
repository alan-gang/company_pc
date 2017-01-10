<template lang="jade">

  dl.forget-form
    dt 找回登录密码
      
    dd
      StepTabs(:steps="steps" v-bind:stepIndex="stepIndex")

    dd.actions(v-if="stepIndex !== 0 && stepIndex !== lastStepIndex")
      span.back-step.ds-button.text-button.light.small(@click="stepIndex--") 
        | <返回上一步
    
    dd.radios(v-if="stepIndex === 0")
      label.ds-radio-label(v-for="(r, index) in radios"  @click="radioIndex = index" v-bind:class="{ active: radioIndex === index }") 
        span.ds-radio
        | {{ r }}

    dl.inner-form
      
      // dt.ds-icon-notice(v-if="notice") {{ notice }}


      dd.ds-icon-user(v-if="stepIndex === 0")
        input(placeholder="用户名" v-model="un_")

      dd.ds-icon-edit(v-if="stepIndex === 0")
        input(placeholder="验证码" v-model="code_" @keyup.enter="next")
        i.ds-icon-code(v-bind:style="{background: 'url(' + img_ + ') right center no-repeat'}" @click="_getVerifyImage")

      dd.table(v-if="stepIndex === 1 && radioIndex === 2")
        label(for="schoolName")你中学的名称{{ q1_ }}：
        input(v-model="a1_" id="schoolName")

      dd.table(v-if="stepIndex === 1 && radioIndex === 2")
        label(style="width: 1.3rem" for="friendName") 你最好朋友的姓名{{ q2_ }}：
        input(v-model="a2_" id="friendName" @keyup.enter="next")

      dd.table.bind-phone(v-if="stepIndex === 1 && radioIndex === 1")
        label 已绑定手机为: 
          span.phone {{ phone_ }}
          br
          | 系统已向此手机发送了验证短信，请注意查收！ 
      
      dd.phone-code.table(v-if="stepIndex === 1 && radioIndex === 1")
        input(placeholder="请输入接收到的验证码" v-model="pc_" @keyup.enter="next")
        label
          .ds-button.secondary(v-bind:class="{ disabled: pt_ }") 重新发送{{ pt_ ? '(' + pt_ + ')' : '' }}


      dd.table.bind-phone(v-if="stepIndex === 1 && radioIndex === 0")
        label 已绑定邮箱为: 
          span.email {{ email_ }}
          br
          | 系统已向此邮箱发送了验证短信，请注意查收！ 
      
      dd.phone-code.table(v-if="stepIndex === 1 && radioIndex === 0")
        input(placeholder="请输入接收到的验证码" v-model="ec_" @keyup.enter="next")
        label
          .ds-button.secondary(v-bind:class="{ disabled: et_ }") 重新发送{{ et_ ? '(' + et_ + ')' : '' }}


      dd.ds-icon-pwd(v-if="stepIndex === 2 && !finish")
        input(placeholder="新密码" v-model="newpwd")

      dd.ds-icon-pwd(v-if="stepIndex === 2 && !finish")
        input(placeholder="确认新密码" v-model="newpwdrepeat")


      dd.ds-icon-success.table(v-if="stepIndex === lastStepIndex && finish")
        span.white
          | 登录密码修改成功
        br
        span.time {{ time }}
        | 秒后将跳转至
        router-link.login(:to="'/login'") 登录
        |页
        

      dd.ds-button.positive.full.bold.next(v-if="stepIndex != lastStepIndex" @click="next") 下一步

      dd.ds-button.positive.full.bold.next(v-if="stepIndex === lastStepIndex && !finish" @click="done") 提交

      dd.actions(v-if="!finish")
        router-link.back.ds-button.text-button.light.small(:to="'/login'") 
          | <返回登录
        router-link.try.ds-button.text-button.light.small(:to="'/login/try'") 
          | 试玩登录
</template>

<script>
import StepTabs from 'components/StepTabs'
import xhr from 'components/xhr'
// import api from '../../http/api'
export default {
  mixins: [xhr],
  data () {
    return {
      stepIndex: 0,
      steps: ['输入基本信息', '验证信息', '修改密码'],
      radioIndex: 0,
      radios: ['通过邮箱找回', '通过手机找回', '通过安全问题找回'],
      finish: false,
      time: 5,
      newpwd: '',
      newpwdrepeat: ''
    }
  },
  computed: {
    lastStepIndex () {
      return this.steps.length - 1
    }
  },
  watch: {
    finish (n) {
      if (this.finish) this.countTime()
    }
  },
  created () {
    this._getVerifyImage()
    this.focus()
  },
  methods: {
    countTime () {
      this.time = 5
      let t = setInterval(() => {
        this.time--
        if (this.time === 0) this.$router.push('/login') && clearInterval(t)
      }, 1000)
    },
    next () {
      this.noEmpty() && this._checkVerifyCode(() => {
        switch (this.stepIndex) {
          case 0:
            this._checkUserName(() => {
              switch (this.radioIndex) {
                case 0:
                  this._getEmail(() => {
                    this.stepIndex++
                    this.focus()
                    this._sendMail()
                  })
                  break
                case 1:
                  this._getMobile(() => {
                    this.stepIndex++
                    this.focus()
                    this._sendSms()
                  })
                  break
                case 2:
                  this._safeQuestion(() => {
                    this.stepIndex++
                    this.focus()
                  })
                  break
              }
            })
            break
          case 1:
            switch (this.radioIndex) {
              case 0:
                this._checkMailVerifyCode(() => {
                  this.stepIndex++
                  this.focus()
                })
                break
              case 1:
                this._checkSmsVerifyCode(() => {
                  this.stepIndex++
                  this.focus()
                })
                break
              case 2:
                this._safeAnswer(() => {
                  this.stepIndex++
                  this.focus()
                })
                break
            }
            break
          case 2:
            this._safeQuestion()
        }
      })
    },
    done () {
      if (this.noEmpty(2)) this.finish = true
    },
    noEmpty (step) {
      let noEmpty = false
      let notice = '输入值不能为空！'
      switch (step || this.stepIndex) {
        case 0:
          noEmpty = this.un_ && this.code_
          break
        case 1:
          if (this.radioIndex === 0) noEmpty = this.ec_
          if (this.radioIndex === 1) noEmpty = this.pc_
          if (this.radioIndex === 2) noEmpty = this.a1_ && this.a2_
          break
        case 2:
          noEmpty = this.newpwd && (this.newpwdrepeat === this.newpwd || (notice = '两次输入的密码不一致！') && false)
      }
      if (!noEmpty) {
        this.$message.warning(notice)
      }
      return noEmpty
    },
    focus () {
      setTimeout(() => {
        this.$el.querySelector('input').focus()
      }, 0)
    }
  },
  components: {
    StepTabs
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../var.stylus'
  .forget-form
    dt
      color WHITE
      font-size .18rem
      text-align center
    .ds-icon-notice
      padding .08rem PW
      padding-left PW + .08rem + .16rem
      font-size .14rem
      line-height .2rem
      color GOLD
      text-align left
      border 1px solid GOLD
      radius()
    .radios
      text-align center
      margin .3rem 0
    &>.actions
      padding PW*.52 .25rem
    .inner-form
      max-width 3.5rem
      min-width 3.5rem
      margin 0 auto
      margin-top .3rem
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
        &.next
          height .36rem
          line-height .36rem
          padding-left 0
          padding-right 0
          margin-top PW
          border 0
        &.table
          display table
          padding 0 PW
          width 100%
          box-sizing border-box
          label
          input
            display table-cell
            vertical-align middle
          label
            color LIGHT
        input
          height 100%
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
        &.bind-phone
          padding 0 0 0 PW
          border 0
          line-height .3rem
        &.phone-code
          padding 0 0 0 PW
          label
            width 1.3rem
            text-align right
        &.ds-icon-success
          margin BMH 0
          padding 0 .7rem
          line-height .4rem
          font-size .12rem
          color LIGHT
          border 0
          .white
            font-size .18rem
  
  .step-tabs
    margin-top BMH
  .white
  .time
    color WHITE
  .phone
  .email
    color RED 
  .login
    text-decoration underline
    color WHITE     
  .back
    float left
  .try
    float right
  
</style>



