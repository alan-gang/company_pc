<template lang="jade">
  .new-header
    
    el-dialog(title="特殊金额转换" v-model="transfer" size="small" custom-class="dialog-transfer" v-bind:modal="modal" v-bind:modal-append-to-body="modal")
      p
        span.text-black.text-bold 特殊金额&nbsp;&nbsp;
        span.text-blue.to 转至
        span.text-black.text-bold &nbsp;&nbsp;可用余额
      // br
      p 特殊帐户余额： 
        | {{ Me.smoney || '0.000' }}
      // br
      p
        el-input-number(placeholder="输入金额" v-model="m" style="width: 2rem" label="描述文字")
        span.text-999  &nbsp;&nbsp;输入金额
      // br
      p
        el-input(placeholder="输入资金密码" type="password" v-model="cpwd" style="width: 2rem" @keyup.enter.native="transferNow")
      // br
      p
        span.ds-button.primary(@click="transferNow") 确认转入

    el-row.content-width
      el-col.l(:span="10")
        .ds-icon-volume
        router-link.text-white(:to=" '/help/6-2-1' " v-for=" (msg, ii) in notices " v-show="ii === i") {{ msg.subject }}

      el-col.r(:span="14")
        el-popover.footer-more(placement="top-start" trigger="hover" v-model="more" v-bind:popper-class="'footer-popover more'" )
          span(slot="reference")
            span.name {{ Me.account }}
            span.money {{ Me.amoney }}
          slot
            dl
              dd(style="padding-bottom: .1rem")
                el-popover(placement="right-start" v-model="checkin"  trigger="manual" v-bind:popper-class="'footer-popover  message'" )
                  button.ds-button.primary.full(slot="reference" @click="checkinNow") 签到
                  slot 
                    p 已连续签到
                      span.text-blue {{ checkDays }}天
                      |，今日
                      span.text-gold +{{ prizeAmount }}金币
                // .ds-button.primary(style="margin-left: .1rem" @click="router = true") 线路切换

              dd
                span.name.ds-icon-m{{ Me.name }}
              dd 
                span.money.ds-icon-money
                  span 主: 
                  span {{ Me.amoney || '0.000' }} 
                span 特: {{ Me.smoney || '0.000' }}
              dd
                span.free.ds-icon-free {{ Me.free || '0.000' }}

              dd(style="padding-top: .1rem")
                .ds-button.primary(@click=" transfer = true ") 特殊金额转换
                .ds-button.danger(@click="logout" style="margin-left: .1rem" ) 安全退出

        
        router-link.topup(:to=" '/me/2-4-1' " v-if="!Me.isTry && Me.canTopUp") 充值
        router-link.topup(:to=" '/me/2-5-1' " v-if="!Me.isTry && Me.canWithDraw") 提现
        span.logout(@click="logout" style="margin-left: .1rem" ) 安全退出

           

</template>

<script>
import store from '../store'
import api from '../http/api'
export default {
  data () {
    return {
      Me: store.state.user,
      notices: [],
      i: 0,
      more: false,
      checkin: false,
      transfer: false,
      modal: false,
      cwd: '',
      m: ''
    }
  },
  watch: {
    transfer () {
      this.cpwd = ''
      this.m = 0
    },
    more () {
      this.more && this.__setCall({fn: '__getUserFund', callId: undefined})
    }
  },
  mounted () {
    this.sysNotices()
    this.switchI()
  },
  methods: {
    transferNow () {
      if (!this.m) return this.$message.warning({target: this.$el, message: '请输入转换金额！'})
      if (!this.cpwd) return this.$message.warning({target: this.$el, message: '请输入资金密码！'})
      if (this.m > this.me.smoney) return this.$message.warning({target: this.$el, message: '特殊帐户余额不足！'})
      this.$http.post(api.transAmount, {amount: this.m, securityPwd: this.cpwd}).then(({data}) => {
        if (data.success === 1) {
          this.cpwd = ''
          this.m = 0
          this.$message.success({target: this.$el, message: data.msg || '特殊金额转换成功！'})
          this.transfer = false
        } else {
          this.$message.error({target: this.$el, message: data.msg || '特殊金额转换失败！'})
        }
      }).catch(rep => {
        this.$message.error({target: this.$el, message: '特殊金额转换失败！'})
      })
    },
    // 今日签到
    checkinNow () {
      this.$http.get(api.getCheckToday).then(({data}) => {
        if (data.success === 1) {
          // if (data.enable === '1') {
          this.checkDays = data.checkDays
          this.prizeAmount = data.prizeAmount
          this.checkin = true
          setTimeout(() => {
            this.checkin = false
          }, 2000)
          // }
        } else {
          this.$message.error({target: this.$el, message: data.msg || '签到失败！'})
        }
      }).catch(rep => {
        this.$message.error({target: this.$el, message: '签到失败！'})
      })
    },
    switchI () {
      setInterval(() => {
        this.i++
        if (this.i === this.notices.length) this.i = 0
      }, 5000)
    },
    // 11、系统公告   ALL
    sysNotices () {
      this.$http.myget(api.sysNotices).then(({data}) => {
        // success
        if (data.success) {
          this.notices = data.sysNotices || []
        }
      }, (rep) => {
        // error
      })
    },
    logout () {
      this.__setCall({fn: '__logout', args: undefined})
    }
  }
}
</script>

<style lang="stylus">
  .el-popover .popper__arrow
    display block
  .footer-popover.more
    transform none
  .footer-popover.message
    transform: translateY(-0.2rem) translateX(0.2rem);
  .footer-popover
    background-color rgba(245, 245, 245, 1)
</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  @import '../path.stylus'
  .new-header
    position relative
    max-width 100%
    line-height .36rem
    background-color rgba(255,255,255,.1)
    color #fff
    .l
      background url(../assets/notice-icon.png) left center no-repeat
      padding-left .3rem
    .r .name
    .r .money
    .r .topup
    .r .logout
      position relative
      display inline-block
      padding 0 .1rem 0 2*PW
      color #fff
      cursor pointer
      &.name
        background url(../assets/v2/name.png) .1rem center no-repeat
      &.money
        background url(../assets/v2/money.png) .1rem center no-repeat
      &.topup
        background url(../assets/v2/topup.png) .1rem center no-repeat
      &.logout
        background url(../assets/v2/logout.png) .1rem center no-repeat
      &:hover
        &:after
          content ''
          position absolute
          left 0
          right 0
          top 0
          bottom 0
          background-color rgba(0, 0, 0, .15)
        
    
</style>
