<template lang="jade">
  .me-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .width-draw-info.scroll-content
      .tabs(style="text-align: center" v-if="stepIndex !== 0")
         .ds-button-group
           .ds-button.text-button.large(v-bind:class="{selected: tabIndex === 1}" @click="tabIndex = 1") 提现申请
           .ds-button.text-button.large(v-bind:class="{selected: tabIndex === 2}" @click="tabIndex = 2") 提现记录

      .cashpwd-form.form(v-if="stepIndex === 0" style="padding-top: .4rem")
        p 资金密码： &nbsp;&nbsp;
          input.ds-input.large(v-model="cpwd" type="password" @keyup.enter="!me.safeCheck && checkNow")
        p(v-if=" me.safeCheck && me.safeCheck !== 3" style="margin-top: .2rem") 安全验证码：
            input.ds-input.large(v-model="safeCheckCode" @keyup.enter="checkNow")
            button.ds-button.secondary.outline(style="margin-left: .1rem;" @click="me.safeCheck === 1 ? sendMail() : sendSms() "  v-bind:class="{ disabled: me.safeCheck === 1 ? et_ : pt_ }" v-bind:disabled="(me.safeCheck === 1 ? et_ : pt_) > 0") 
              span(v-if="!(me.safeCheck === 1 ? et_ : pt_)") 发送验证码
              span.text-black(v-if="(me.safeCheck === 1 ? et_ : pt_)") {{ (me.safeCheck === 1 ? et_ : pt_) }} 
                span.text-999 秒后可重新发送
        p(v-if="me.safeCheck === 3 " style="margin-top: .2rem") 畅博安全码：
            input.ds-input.large(v-model="safeCheckCode" @keyup.enter="checkNow")

        .buttons(style="margin-left: .85rem; padding: .2rem 0")
          .ds-button.primary.large(@click="checkNow") 确认
      

      .bank-form(v-if="tabIndex === 1 && stepIndex === 1")
        .notice
          span.title 温馨提示：
          p.content
            | 每天限提 
            span.text-danger 5
            |  次，今天您已经发起了 
            span.text-danger {{ times }}
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
            span.amount {{ me.amoney }}

          .item(style="line-height: .5rem") 收款银行卡：
            p.banks
              label.ds-radio-label(v-for="bank in banksO" @click="selectBank = bank")
                span.ds-radio.white(v-bind:class="{ active: selectBank.entry === bank.entry }")
                span.ds-icon-bank-card(v-bind:class=" [ bank.class, { selected: selectBank.entry === bank.entry } ] ")
                span(style="color: #666") {{ bank.cardNo}}


              span.ds-button.text-button.blue.el-icon-caret-bottom(v-if="!showAllBank && myBanks.length > 3" @click="showAllBank = true")  更多银行

              // span.ds-icon-bank-card.el-icon-caret-bottom.more(v-if="!showAllBank && myBanks.length > 3" @click="showAllBank = true")  更多银行

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


      form(v-if="tabIndex === 2 && stepIndex === 1")

        // label.item 充值时间 
        //   el-date-picker(v-model="st" type="datetime" placeholder="请选择日期时间")
        //   |  至 
        //   el-date-picker(v-model="et" type="datetime" placeholder="请选择日期时间")

        // label.item(style="margin-left: .2rem") 状态 
        //   el-select(clearable v-bind:disabled=" !STATUS[0] "  v-model="status" style="width: .8rem" placeholder="全")
        //     el-option(v-for="(S, i) in STATUS" v-bind:label="S" v-bind:value="i")

        el-table.header-bold.margin(:data="data" style="margin: .2rem")
          el-table-column(prop="acceptTime" label="提现时间" width="180")

          el-table-column(prop="bankName" label="银行" width="150")
            template(scope="scope")
              .ds-icon-bank-card.static(v-bind:class=" [ scope.row.class ] " style="margin: 0")

          el-table-column(prop="realMoney" label="金额" width="150" align="right")

          el-table-column(prop="transferFee" label="手续费" width="150" align="right")

          el-table-column(label="" align="right" width="50")

          el-table-column(label="状态")
            template(scope="scope")
              span(:class=" scope.row.statusV.indexOf('失败') !== -1 ? 'text-danger' : 'text-green' " v-if="scope.row.statusV") {{ scope.row.statusV }}

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")
</template>

<script>
import api from '../../http/api'
import store from '../../store'
import { BANKS } from '../../util/static'
import { digitUppercase } from '../../util/Number'
import xhr from 'components/xhr'
// import util from '../../util'
export default {
  mixins: [xhr],
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
      tabIndex: 1,
      pageSize: 20,
      total: 0,
      currentPage: 1,
      data: [{}],
      S: ['未处理', '失败', '成功'],
      V: ['未审核', '审核通过', '审核失败'],
      checkSafeCodeUrl: ['', api.checkMailVerifyCode, api.checkSmsVerifyCode, api.checkGoogleAuth],
      times: 0
    }
  },
  computed: {
    // Cdata () {
    //   if (this.data.length <= this.pageSize) return this.data
    //   else {
    //     return util.groupArray(this.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage), this.pageSize, {_empty: true})[0]
    //   }
    // },
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
    },
    tabIndex () {
      if (this.tabIndex === 2) this.queryWithdraw()
      else {
        this.__setCall({fn: '__getUserFund'})
        this.getUserBankCards()
      }
    }
  },
  methods: {
    sendSms () {
      this.$http.post(api.person_sendSms, {}).then(({data}) => {
        if (data.success === 1) {
          this.$message.success({target: this.$el, message: '恭喜您， 手机验证码发送成功，请注意查收。'})
          this.pt_ = this.time_
        } else {
          this.$message.error({target: this.$el, message: data.msg || '手机验证码发送失败！'})
        }
      }).catch(rep => {
      })
    },
    sendMail () {
      this.$http.post(api.person_sendMail, {}).then(({data}) => {
        if (data.success === 1) {
          this.$message.success({target: this.$el, message: '恭喜您， 邮箱验证码发送成功，请注意查收。'})
          this.et_ = this.time_
        } else {
          this.$message.error({target: this.$el, message: data.msg || '邮箱验证码发送失败！'})
        }
      }).catch(rep => {
      })
    },
    pageChanged (cp) {
      this.queryWithdraw(cp, () => {
        this.currentPage = cp
      })
    },
    queryWithdraw (page, fn) {
      this.$http.get(api.queryWithdraw, {
        page: page || 1,
        pageSize: this.pageSize
      }).then(({data}) => {
        if (data.success === 1) {
          this.data = data.withdrawData || []
          this.data.forEach(c => {
            c.cardNo = '*****' + c.cardNo.slice(-4)
            c.statusV = c.isverify === 1 ? this.S[c.status] : this.V[c.isverify]
            c.class = (BANKS.find(b => b.apiName === c.apiName) || {})['class']
          })
          typeof fn === 'function' && fn()
          this.total = data.totalSize || this.data.length
        }
      }).catch(rpe => {
      })
    },
    checkNow () {
      if (!this.cpwd) return this.$message.warning({target: this.$el, message: '请输入资金密码！'})
      if (this.me.safeCheck && !this.safeCheckCode) return this.$message.warning({target: this.$el, message: '安全验证码！'})
      this.checkSecurityPwd()
    },
    checkSecurityPwd () {
      this.$http.post(api.checkSecurityPwd, {password: this.cpwd}).then(({data}) => {
        if (data.success === 1) {
          if (this.me.safeCheck) {
            return this.checkSafeCode()
          }
          this.stepIndex++
          this.$message.success({target: this.$el, message: data.msg || '资金密码验证成功！'})
          this.__setCall({fn: '__getUserFund'})
          this.getUserBankCards()
          this.withdrawTimes()
        } else {
          this.$message.error({target: this.$el, message: data.msg || '资金密码错误！'})
        }
      }).catch(rep => {
        this.$message.error({target: this.$el, message: '资金密码验证失败！'})
      })
    },
    checkSafeCode () {
      this.$http.post(this.checkSafeCodeUrl[this.me.safeCheck], {verifyCode: this.safeCheckCode}).then(({data}) => {
        if (data.success === 1) {
          this.stepIndex++
          this.$message.success({target: this.$el, message: data.msg || '安全码验证成功！'})
          this.__setCall({fn: '__getUserFund'})
          this.getUserBankCards()
          this.withdrawTimes()
        } else {
          this.$message.error({target: this.$el, message: data.msg || '安全码错误！'})
        }
      }).catch(rep => {
        this.$message.error({target: this.$el, message: '安全验证失败！'})
      })
    },
    withdrawTimes () {
      this.$http.get(api.withdrawTimes).then(({data}) => {
        if (data.success === 1) {
          this.times = data.times
        }
      }).catch(rep => {
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
                this.$emit('close', '2-5-1', '2-6-1')
                // this.$router.push('/me/2-6-1')
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
            btn: ['确定'],
            close () {
              this.stepIndex--
              this.tabIndex++
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
    // &.more
    //   text-align center
    //   font-weight bold
    //   color BLUE
    //   line-height .4rem
    //   border none
    //   background-color #ebf7ff
    //   border 1px solid rgba(0,0,0,0)
    //   &:hover
    //     border 1px solid BLUE
    //   &:active
    //     background-color #d2e8f6
    //     border 1px solid BLUE
        // border none
</style>