<template lang="jade">
  .me-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .width-draw-info.scroll-content(style="padding-top: .2rem")
      // .tabs(style="text-align: center")
        // .ds-button-group
          // .ds-button.text-button.large(v-bind:class="{selected: tabIndex === 1}" @click="tabIndex = 1") 提现申请
          // .ds-button.text-button.large(v-bind:class="{selected: tabIndex === 2}" @click="tabIndex = 2") 提现记录

      .cashpwd-form.form(v-if="tabIndex === 1 && stepIndex === 0")
        p 资金密码：
          input.ds-input.large(v-model="cpwd" type="password" @keyup.enter="checkSecurityPwd")
          .buttons(style="margin-left: .70rem; padding: .2rem 0")
            .ds-button.primary.large(@click="checkSecurityPwd") 确认
      

      .bank-form(v-if="tabIndex === 1 && stepIndex === 1")
        .notice
          span.title 温馨提示：
          p.content
            | 每天限提 
            span.text-danger 5
            |  次，今天您已经发起了 
            span.text-danger {{ times }} 0
            |  次提现申请。
            br
            | 每天的提现处理时间为：
            span.text-danger 早上 10:00 至 次日凌晨 2:00
            br
            | 新绑定的提款银行卡需要绑定时间超过 
            span.text-danger 6
            |  小时才能正常提款
        .form
          p.item 可提现金额：&nbsp;&nbsp;
            span.amount {{ me.money }}

          .item(style="line-height: .5rem") 收款银行卡：
            p.banks
              label.ds-radio-label(v-for="bank in banksO" @click="selectBank = bank")
                span.ds-radio.white(v-bind:class="{ active: selectBank.entry === bank.entry }")
                span.ds-icon-bank-card(v-bind:class=" [ bank.class, { selected: selectBank.entry === bank.entry } ] ")
                span(style="color: #666") {{ bank.cardNo}}


              span.ds-button.text-button.blue.el-icon-caret-bottom(v-if="!showAllBank && myBanks.length > 3" @click="showAllBank = true")  更多银行

          p.item(style="padding: .1rem 0") 提现限额：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(单笔提现限额：最低：
            span.min.text-danger  {{ min }} 
            | 元，
            | 最高：
            span.min.text-danger  {{ max }} 
            | 元)

          p.item(style="padding: .1rem 0") 提现金额：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            el-input-number(v-model="money" v-bind:max="max" v-bind:min="min" controls=false)
            span(style="color: #999; padding-left: .1rem") {{ textMoney }}

          .buttons(style="margin-left: .98rem; padding: .2rem 0")
            .ds-button.primary.large(@click="showWithDraw") 确认

      
      .bank-form(v-if="tabIndex === 1 && stepIndex === 2")
        
        .form
          p.item 实扣金额：&nbsp;&nbsp;&nbsp;
            span.amount {{ money }}

          p.item 到帐金额：&nbsp;&nbsp;&nbsp;&nbsp;
            span.amount {{ get }}

          .item(style="line-height: .5rem; padding-top: .15rem ") 开户银行：&nbsp;&nbsp;&nbsp;
            p.banks
              span.ds-icon-bank-card.static(v-bind:class=" [ selectBank.class ] ")

          p.item(style="padding: .2rem 0 0 0") 银行卡帐号：&nbsp;&nbsp;{{ selectBank.cardNo }}

          .buttons(style="margin-left: .85rem; padding: .2rem 0")
            .ds-button.primary.large(@click="doWithDraw") 提交
</template>

<script>
import api from '../../http/api'
import store from '../../store'
import { BANKS } from '../../util/static'
import { digitUppercase } from '../../util/Number'
export default {
  data () {
    return {
      me: store.state.user,
      cpwd: '',
      myBanks: [],
      showAllBank: false,
      selectBank: {},
      max: 0,
      min: 0,
      money: 0,
      get: 0,
      // xxx
      stepIndex: 0,
      tabIndex: 1
    }
  },
  computed: {
    banksO () {
      return this.showAllBank ? this.myBanks : this.myBanks.slice(0, 3)
    },
    textMoney () {
      return digitUppercase(this.money)
    }
  },
  watch: {
    selectBank () {
      this.selectBank.apiName && this.getWithdrawByApi()
    }
  },
  methods: {
    checkSecurityPwd () {
      this.$http.post(api.checkSecurityPwd, {password: this.cpwd}).then(({data}) => {
        if (data.success === 1) {
          this.stepIndex++
          this.$message.success({target: this.$el, message: data.msg || '资金密码密码验证成功！'})
          this.__setCall({fn: '__getUserFund'})
          this.getUserBankCards()
        } else {
          this.$message.error({target: this.$el, message: data.msg || '资金密码错误！'})
        }
      }).catch(rep => {
        this.$message.error({target: this.$el, message: '资金密码密码验证失败！'})
      })
    },
    getUserBankCards () {
      this.$http.get(api.getUserBankCards).then(({data}) => {
        if (data.success === 1) {
          this.myBanks = data.userBankCards
          if (this.myBanks.length === 0) {
            return this.$modal.warn({
              content: '您还未曾绑定过银行卡，请绑定银行卡后再进行提现！',
              target: this.$el,
              close () {
                this.$router.push('/me/2-6-1')
                this.$emit('close', '2-5-1')
              },
              O: this
            })
          }
          this.myBanks.forEach(c => {
            c.class = BANKS.find(b => b.apiName === c.apiName)['class']
            c.cardNo = '*****' + c.cardNo.slice(-4)
          })
        }
      }).catch(rep => {
      })
    },
    getWithdrawByApi () {
      this.$http.post(api.getWithdrawByApi, {apiName: this.selectBank.apiName}).then(({data}) => {
        if (data.success === 1) {
          this.max = data.max
          this.min = data.min
        } else {
          this.$message.error({target: this.$el, message: data.msg || '限额信息获取失败！'})
        }
      }).catch(rep => {
        this.$message.error({target: this.$el, message: '限额信息获取失败！'})
      })
    },
    showWithDraw () {
      this.$http.post(api.showWithDraw, {userBankId: this.selectBank.entry, amount: this.money}).then(({data}) => {
        if (data.success === 1) {
          this.get = data.realmoney
          this.stepIndex++
        } else {
          this.$message.error({target: this.$el, message: data.msg || '提现申请提交失败！'})
        }
      }).catch(rep => {
        this.$message.error({target: this.$el, message: '提现申请提交失败！'})
      })
    },
    doWithDraw () {
      this.$http.post(api.doWithDraw, {userBankId: this.selectBank.entry, amount: this.money}).then(({data}) => {
        if (data.success === 1) {
          this.$modal.success({
            content: '恭喜您，提交成功！',
            target: this.$el,
            close () {
              this.stepIndex--
              this.stepIndex--
              this.cpwd = ''
            },
            O: this
          })
        } else {
          this.$message.error({target: this.$el, message: data.msg || '提现申请提交失败！'})
        }
      }).catch(rep => {
        this.$message.error({target: this.$el, message: '提现申请提交失败！'})
      })
    }
  },
  // doWithDraw: api + 'person/withDraw.do?method=doWithDraw&apiName=ico&amount=123&userBankId=2',
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .scroll-content
    top TH
  .width-draw-info
    .cashpwd-form
      padding-top .1rem
  
  .notice
    margin 0 .2rem
    padding PWX
    background-color #fffde8
    border 1px solid #d5d09b
    radius()
    .content
      display inline-block
      margin 0
      line-height .25rem
      vertical-align top
  .form
    margin 0 .4rem
    .amount
      font-family Roboto
      font-size 0.5rem
  .banks
    display inline-block
    margin 0
    max-width 90%
    vertical-align top
  .ds-radio-label
    padding 0 .1rem
  .ds-icon-bank-card
    width 167px
    height 40px
    margin .05rem 
    radius()
    display inline-block

    vertical-align middle
</style>