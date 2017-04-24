<template lang="jade">
  .me-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .me-topup.scroll-content

      .tab(style="text-align: center")
        .ds-button-group
          .ds-button.text-button(:class="{ selected: type === 1 }" @click=" type = 1 ") 充值
          .ds-button.text-button(:class="{ selected: type === 2 }" @click=" type = 2 ") 充值记录

      .form(v-if="type === 1")
        .item(style="line-height: .5rem") 支付方式：
            .banks
                label.ds-radio-label(v-for="bank in otherPay" @click="selectBank = bank")
                  span.ds-radio.white(v-bind:class="{ active: selectBank.apiName === bank.apiName }")
                  span.ds-icon-bank-card(v-bind:class=" [ bank.class, { selected: selectBank.apiName === bank.apiName } ] ")

                div
                  label.ds-radio-label(v-for="bank in banksO" @click="selectBank = bank")
                    span.ds-radio.white(v-bind:class="{ active: selectBank.apiName === bank.apiName }")
                    span.ds-icon-bank-card(v-bind:class=" [ bank.class, { selected: selectBank.apiName === bank.apiName } ] ")

                  label.ds-radio-label
                    span.ds-radio.white(style="opacity: 0")
                    span.ds-icon-bank-card.el-icon-caret-bottom.more(v-if="!showAllBank && myBanks.length > 10" @click="showAllBank = true")  更多银行
        
        .item(style="line-height: .5rem") 充值金额：&nbsp;&nbsp;&nbsp;&nbsp;
          el-input-number(v-model="amount" type="number")
          span(style="padding: 0 .2rem") 充值限额：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(单笔充值限额：最低：
              span.min.text-danger  {{ min }} 
              | 元，
              | 最高：
              span.min.text-danger  {{ max }} 
              | 元)
        .buttons(style="margin-left: .85rem; padding-top: .05rem")
            .ds-button.primary.large(@click="topUpNow") 确认

      
      .form(v-if="type === 2")

        // label.item 充值时间 
        //   el-date-picker(v-model="st" type="datetime" placeholder="请选择日期时间")
        //   |  至 
        //   el-date-picker(v-model="et" type="datetime" placeholder="请选择日期时间")

        // label.item(style="margin-left: .2rem") 状态 
        //   el-select(clearable v-bind:disabled=" !STATUS[0] "  v-model="status" style="width: .8rem" placeholder="全")
        //     el-option(v-for="(S, i) in STATUS" v-bind:label="S" v-bind:value="i")

        el-table.header-bold.margin(:data="Cdata" style="margin: .2rem")
          el-table-column(prop="doneTime" label="充值时间" width="180")

          el-table-column(prop="bankName" label="银行" width="150")

          el-table-column(prop="payerRealAmount" label="金额" width="150" align="right")

          el-table-column(prop="payerTransferFee" label="手续费" width="150" align="right")

          el-table-column(label="" align="right" width="50")

          el-table-column(label="状态")
            template(scope="scope")
              span.text-green {{ '充值成功' }}

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")
    

    .modal(v-show="show" )
      .mask
      .box-wrapper
        .box
          .tool-bar(style="padding: .03rem .08rem 0 .15rem; line-height: .5rem")
            span.title(style="font-size: .18rem; color #666;") 支付 {{ amount }} 元
            el-button-group
              i.el-icon-close.ds-button.text-button(@click="show = false" )
              
          .content
            p(style="margin: .3rem .15rem .15rem .15rem; font-size: .24rem; color: #333") {{ selectBank.text }}扫码支付
            .QR.ds-icon-QR(style="margin: 0 auto; margin-bottom: .5rem; width: 1.4rem; text-align: center")
              p(style="padding-top: 1.5rem; position: relative")
                span.refresh.ds-button.small(v-show="pt_ === 0") 重新获取二维码
                span.loading(v-show="pt_ !== 0")
                  span.text-danger {{ this.pt_ }} 
                  | 秒后二维码过期 
                span.loading(v-show="pt_ === 0")
                  span.text-danger 二维码已过期，请重新获取



      
      
</template>

<script>
import api from '../../http/api'
import { BANKS } from '../../util/static'
import util from '../../util'
export default {
  data () {
    return {
      type: 1,
      avaibleBanks: [],
      selectBank: {},
      showAllBank: false,
      amount: '',
      min: 0,
      max: 0,
      data: [{}],
      show: false,
      time_: 60,
      pt_: 0,
      st: '',
      et: '',
      STATUS: ['正在充值', '充值成功', '充值失败'],
      status: '',
      pageSize: 20,
      total: 0,
      currentPage: 1
    }
  },
  computed: {
    Cdata () {
      if (this.data.length <= this.pageSize) return this.data
      else {
        return util.groupArray(this.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage), this.pageSize, {_empty: true})[0]
      }
    },
    BANKS () {
      return BANKS.filter(b => {
        return this.avaibleBanks.find(ab => ab.bankCode === b.apiName)
      })
    },
    myBanks () {
      return this.BANKS.filter(b => ['alipay', 'wepay'].indexOf(b.class) === -1)
      // return BANKS
    },
    banksO () {
      return this.showAllBank ? this.myBanks : this.myBanks.slice(0, 3)
    },
    otherPay () {
      return this.BANKS.filter(b => ['alipay', 'wepay'].indexOf(b.class) !== -1)
    }
  },
  watch: {
    pt_ () {
      if (this.pt_ === this.time_) {
        let t = setInterval(() => {
          if (this.pt_ > 0) this.pt_--
          else clearInterval(t)
        }, 1000)
      }
    },
    selectBank () {
      this.saveAmountRange()
    },
    type () {
      if (this.type === 2) this.qryRecharge()
    }
  },
  mounted () {
    // this.getBankList()
    // this.showRecharge()
    this.TopUpGetBankList()
    this.qryRecharge()
  },
  methods: {
    // 充值记录查询
    // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=qryRecharge&startDate=20161120124327&&endDate=20161126124327&status=1
    // qryRecharge: '/person/recharge.do?method=qryRecharge&startDate=20161120124327&&endDate=20161126124327&status=1 ',
    // // 进入充值页
    // // http://192.168.169.44:9901/cagamesclient/person/recharge.do?method=showRecharge
    // showRecharge: '/person/recharge.do?method=showRecharge',
    // // 获取银行列表
    // // http://192.168.169.43:19012/finance/merSave.do?method=getBankList
    // httpGetBankList: 'http://192.168.169.43:19012/finance/merSave.do?method=getBankList',
    // // &userId=1&userName=jock&platId=101
    // // 校验充值金额范围
    // // http://192.168.169.43:19012/finance/merSave.do?method=saveAmountRange
    // httpSaveAmountRange: 'http://192.168.169.43:19012/finance/merSave.do?method=saveAmountRange',
    // // &userId=1&userName=jock&platId=101&bankCode=icbc
    // // 提交充值请求道第三方
    // // http://192.168.169.43:19012/finance/merSave.do?method=commit
    // httpCommit: 'http://192.168.169.43:19012/finance/merSave.do?method=commit'
    // // &userId=1&userName=jock&platId=101&bankCode=icbc&amount=100
    qryRecharge (fn) {
      this.$http.get(api.qryRecharge, {
        page: 1,
        pageSize: this.pageSize
      }).then(({data}) => {
        if (data.success === 1) {
          this.data = data.payRecordData || []
        }
      }).catch(rpe => {
      })
    },
    TopUpGetBankList (fn) {
      this.$http.get(api.TopUpGetBankList).then(({data}) => {
        if (data.success === 1) {
          this.avaibleBanks = data.bankList
        }
      }).catch(rpe => {
      })
    },
    saveAmountRange (fn) {
      this.$http.get(api.saveAmountRange, {
        bankCode: this.selectBank.apiName
      }).then(({data}) => {
        if (data.success === 1) {
          this.max = data.max
          this.min = data.min
        }
      }).catch(rpe => {
      })
    },
    commit (fn) {
      this.$http.get(api.commit, {
        bankCode: this.selectBank.apiName,
        amount: this.amount
      }).then(({data}) => {
        if (data.success === 1) {
          // 二维码支付
          if (data.isQr === 1) {
            this.show = true
            this.pt_ = this.time_
          // 链接跳转
          } else {
            this.$modal.warn({
              content: '您正在安全跳转到第三方支付',
              btn: ['去充值'],
              href: [data.msg],
              target: this.$el,
              ok () {
                this.$modal.question({
                  content: '是否已经充值成功？',
                  target: this.$el,
                  btn: ['充值成功', '遇到问题'],
                  ok () {
                    this.type = 2
                  },
                  O: this
                })
              },
              O: this
            })
          }
        } else {
          this.$message.error({message: data.msg || '充值请求提交失败， 请重试！'})
        }
      }).catch(rpe => {
      })
    },
    topUpNow () {
      if (!this.amount) return this.$el.querySelector('input').focus()
      if (this.amount > this.max || this.amount < this.min) return this.$message.warning({message: '充值金额过小或过大，请检查!'})
      this.commit()
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .scroll-content
    top TH
  .me-topup
    padding 0 PWX PWX PWX
    .ds-radio-label
      padding 0 .1rem
    .banks
      display inline-block
      margin 0
      max-width 90%
      vertical-align top
    .more
      text-align center
      font-weight bold
      color BLUE
      line-height .4rem
      border none
      background-color #ebf7ff
      border 1px solid rgba(0,0,0,0)
      &:hover
        border 1px solid BLUE
      &:active
        background-color #d2e8f6
        border none
  
  .el-button-group
    float right
  
  .el-icon-close
    padding .05rem .1rem
    font-size .18rem
    color LIGHT
    &:hover
      color #fff
      background-color DANGER-HOVER
    &:active
      color #fff
      background-color DANGER-ACTIVE
  .refresh
    position absolute
    top .55rem
    left .13rem
    radius()
    background-color #f3f3f3
    shadow()
    font-size .12rem
    color #666
    text-shadow none
    &:hover
      background-color #fff
  .modal 
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    text-align center
    z-index 9999
    
    .mask
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      opacity .5
      background #000
      z-index 9998
    .box-wrapper
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      text-align center
      z-index 9999
      &:after
        content ''
        height 100%
        width 0
        vertical-align middle
        display inline-block
    .box
      position relative
      text-align left
      display inline-block
      vertical-align middle
      background-color #fff
      font-size .12rem
      width 4.5rem
      radius()
    .content
      text-align center
      margin 0 .2rem
      .el-row
        margin PW 0
      .textarea-label
        position relative
        margin .3rem .3rem .3rem 0
        .label
          position absolute
          left 0
          top .05rem
        .el-textarea
          display inline-bock
          vertical-align top
          padding-left .6rem 
          .textarea
            font-size .12rem
</style>