<template lang="jade">
  .my-wallet-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.bg-w
      .info
        i.ds-icon-me-avatar
        p.txt-c.mt15 主帐户
        p.txt-c.fc-oriange.ft24.mt15.amount {{ numberWithCommas(ME.amoney) }} 
          i.ft12.yuan 元
        .cc
          p.title.text-black 帐户互转 
          label.item 转出帐户 
            el-select(v-model="f" style="width: 2.5rem" placeholder="无" )
              //- el-option(v-for="(n, i) in froms" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-show=" i !== 3 && i !== 9 ")
              el-option(v-for="(n, i) in froms" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-show=" i !== 3 ")
          p 可用余额：
            span.text-blue {{ numberWithCommas(fm) }}
            | 元
            span.switch-box
              span.switch(v-if="showSwitch" @click=" switchs ")
              span.refresh(@click=" refresh ")
        
          label.item 转入到&nbsp;&nbsp;&nbsp;&nbsp;
            el-select(v-model="t" style="width: 2.5rem" placeholder="无")
              //- el-option(v-for="(n, i) in ctos" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-show=" i !== 1 && i !== 7 ")
              el-option(v-for="(n, i) in ctos" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-show=" i !== 1 ")

          p 现有余额：
            span.text-blue {{ numberWithCommas(tm) }}
            | 元

          label.item 交易金额 
            input.ds-input(v-model="m" style="width: 2.5rem" maxlength="12")

          p &nbsp;&nbsp;
            span {{ cm }}

          .quick-amounts
            button.ml10.c_b.ds-button.btn-amout(@click="quickAmountHandler(amount)" v-for="(amount, i) in quickAmounts") {{amount}}

          //- label.item 资金密码  
            input.ds-input(v-model="cpwd" type="password" style="width: 2.5rem" @keydown.enter="ok")

          .buttons(style="margin-left: .6rem; margin-top: .2rem")
            button.ds-button.danger(style="float: left" @click="refund") 一键转回
            button.ds-button.primary(style="" @click="ok" v-bind:disabled="btn" v-bind:class="{ cancel: btn }") 确认

      .wallet-ls

        .s(style="padding: PWX 0")
          .c
            p.acc-bg-oriange.acc-shot-name
              span.txt-c 特殊
            br
            p 特殊帐户
            p.ft24.text-black {{ numberWithCommas(ME.smoney) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(1, 'o')") 转出
              //- button.ml10.ds-button.btn-transfer(@click="quickTransfer(1, 'i')") 转入

          .c
            p.acc-bg-oriange.acc-shot-name
              span.txt-c BG
            br
            p BG帐户
            p.ft24.text-black {{ numberWithCommas(ME.bgmoney) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(2, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(0, 'i')") 转入

          .c(v-show="false")
            p.acc-bg-red.acc-shot-name
              span.txt-c IBC
            br
            p IBC帐户
            p.ft24.text-black {{ numberWithCommas(ME.tcgmoney.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer") 转入 

          .c
            p.acc-bg-red.acc-shot-name
              span.txt-c 开元
            br
            p 开元帐户
            p.ft24.text-black {{ numberWithCommas(ME.kymoney.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(4, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(2, 'i')") 转入 

          .c
            p.acc-bg-oriange.acc-shot-name
              span.txt-c PT
            br
            p PT帐户
            p.ft24.text-black {{ numberWithCommas(ME.ptmoney.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(5, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(3, 'i')") 转入 

          .c
            p.acc-bg-blue.acc-shot-name
              span.txt-c AG
            br
            p AG帐户
            p.ft24.text-black {{ numberWithCommas(ME.agmoney.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(6, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(4, 'i')") 转入 

          .c
            p.acc-bg-red.acc-shot-name
              span.txt-c 沙巴
            br
            p 沙巴帐户
            p.ft24.text-black {{ numberWithCommas(ME.sbmoney.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(7, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(5, 'i')") 转入 

          .c
            p.acc-bg-oriange.acc-shot-name
              span.txt-c 乐游
            br
            p 乐游帐户
            p.ft24.text-black {{ numberWithCommas(ME.lymoney.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(8, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(6, 'i')") 转入 
          
          //- .c(style="display: none")
          .c
            p.acc-bg-green.acc-shot-name
              span.txt-c U赢
            br
            p U赢帐户
            p.ft24.text-black {{ numberWithCommas(ME.uwinmoney.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(9, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(7, 'i')") 转入   

          .c
            p.acc-bg-oriange.acc-shot-name
              span.txt-c KG
            br
            p KG帐户
            p.ft24.text-black {{ numberWithCommas(ME.kgmoney.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(10, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(8, 'i')") 转入   

          .c
            p.acc-bg-oriange.acc-shot-name
              span.txt-c 微游
            br
            p 微游帐户
            p.ft24.text-black {{ numberWithCommas(ME.litAmount.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(11, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(9, 'i')") 转入
          .c
            p.acc-bg-red.acc-shot-name
              span.txt-c 平博
            br
            p 平博帐户
            p.ft24.text-black {{ numberWithCommas(ME.pbAmount.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(12, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(10, 'i')") 转入

          .c
            p.acc-bg-blue.acc-shot-name
              span.txt-c LG
            br
            p LG帐户
            p.ft24.text-black {{ numberWithCommas(ME.lgAmount.toFixed(4)) }}
              i.ft12.yuan 元
            .mt10.quick-btns
              button.ds-button.btn-transfer(@click="quickTransfer(13, 'o')") 转出
              button.ml10.ds-button.btn-transfer(@click="quickTransfer(11, 'i')") 转入

          .c
            p.acc-bg-oriange.acc-shot-name
              span.txt-c 优惠券
            br
            p 优惠券
            p.ft24.text-black {{ numberWithCommas(ME.free) }}
              i.ft12.yuan 元
      
      //- .s
        .cc
          p.title.text-black 帐户互转 
          label.item 转出帐户 
            el-select(v-model="f" style="width: 2.5rem" placeholder="无")
              //- el-option(v-for="(n, i) in froms" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-show=" i !== 3 && i !== 9 ")
              el-option(v-for="(n, i) in froms" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-show=" i !== 3 ")
          p 可用余额：
            span.text-blue {{ numberWithCommas(fm) }}
            | 元
            span.switch-box
              span.switch(v-if="showSwitch" @click=" switchs ")
              span.refresh(@click=" refresh ")
        
          label.item 转入到&nbsp;&nbsp;&nbsp;&nbsp;
            el-select(v-model="t" style="width: 2.5rem" placeholder="无")
              //- el-option(v-for="(n, i) in ctos" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-show=" i !== 1 && i !== 7 ")
              el-option(v-for="(n, i) in ctos" v-bind:label=" n.split(':')[0] " v-bind:value="i" v-show=" i !== 1 ")

          p 现有余额：
            span.text-blue {{ numberWithCommas(tm) }}
            | 元

          label.item 交易金额 
            input.ds-input(v-model="m" style="width: 2.5rem")

          p &nbsp;&nbsp;
            span {{ cm }}

          //- label.item 资金密码  
            input.ds-input(v-model="cpwd" type="password" style="width: 2.5rem" @keydown.enter="ok")

          .buttons(style="margin-left: .6rem; margin-top: .2rem")
            button.ds-button.danger(style="float: left" @click="refund") 一键转回
            button.ds-button.primary(style="" @click="ok" v-bind:disabled="btn" v-bind:class="{ cancel: btn }") 确认


        .notice(style="margin: 0")
          p 温馨提示：您可以在 个人中心 > 资金记录 > 转账记录 查看您的转账记录     



</template>

<script>
import { numberWithCommas, digitUppercase } from '../../util/Number'
import store from '../../store'
import api from '../../http/api'
export default {
  data () {
    return {
      ME: store.state.user,
      numberWithCommas: numberWithCommas,
      digitUppercase: digitUppercase,
      f: '',
      froms: ['主帐户', '特殊帐户', 'BG帐户:2', 'IBC帐户:3', '棋牌帐户:7', 'PT帐户:5', 'AG帐户:4', '沙巴帐户:9', '乐游帐户:15', 'U赢帐户:17', 'KG帐户:18', '微游帐户:25', '平博帐户:19', 'LG帐户:21'],
      t: '',
      m: '',
      cpwd: '',
      btn: false,
      a: ['BG帐户:2:bgmoney', 'IBC帐户:3:tcgmoney', '棋牌帐户:7:kymoney', 'PT帐户:5:ptmoney', 'AG帐户:4:agmoney', '沙巴帐户:9:sbmoney', '乐游帐户:15:lymoney', 'U赢帐户:17:uwinmoney', 'KG帐户:18:kgmoney', '微游帐户:25:litAmount', '平博帐户:19:pbAmount', 'LG帐户:21:lgAmount'],
      quickAmounts: ['50', '100', '500', '全部']
    }
  },
  computed: {
    fm () {
      switch (this.f) {
        case 0:
          return this.ME.amoney
        case 1:
          return this.ME.smoney
        case 2:
          return this.ME.bgmoney
        case 3:
          return this.ME.tcgmoney
        case 4:
          return this.ME.kymoney
        case 5:
          return this.ME.ptmoney
        case 6:
          return this.ME.agmoney
        case 7:
          return this.ME.sbmoney
        case 8:
          return this.ME.lymoney
        case 9:
          return this.ME.uwinmoney
        case 10:
          return this.ME.kgmoney
        case 11:
          return this.ME.litAmount
        case 12:
          return this.ME.pbAmount
        case 13:
          return this.ME.lgAmount
      }
    },
    tm () {
      switch (this.f) {
        case 0:
          return [this.ME.bgmoney, this.ME.tcgmoney, this.ME.kymoney, this.ME.ptmoney, this.ME.agmoney, this.ME.sbmoney, this.ME.lymoney, this.ME.uwinmoney, this.ME.kgmoney, this.ME.litAmount, this.ME.pbAmount, this.ME.lgAmount][this.t]
        default:
          return this.ME.amoney
        // case 2:
        //   return this.ME.amoney
        // case 3:
        //   return this.ME.amoney
        // case 4:
        //   return this.ME.amoney
        // case 5:
        //   return this.ME.amoney
        // case 6:
        //   return this.ME.amoney
        // case 7:
        //   return this.ME.amoney
        // case 8:
        //   return this.ME.amoney
        // case 9:
        //   return this.ME.amoney
        // case 10:
        //   return this.ME.amoney
        // case 11:
        //   return this.ME.amoney
        // case 12:
        //   return this.ME.amoney
        // case 13:
        //   return this.ME.amoney
      }
    },
    ctos () {
      switch (this.f) {
        case 0:
          return this.froms.slice(2)
        default:
          return this.froms.slice(0, 1)
        // case 1:
        //   return this.froms.slice(0, 1)
        // case 2:
        //   return this.froms.slice(0, 1)
        // case 3:
        //   return this.froms.slice(0, 1)
        // case 4:
        //   return this.froms.slice(0, 1)
        // case 5:
        //   return this.froms.slice(0, 1)
        // case 6:
        //   return this.froms.slice(0, 1)
        // case 7:
        //   return this.froms.slice(0, 1)
        // case 8:
        //   return this.froms.slice(0, 1)
        // case 9:
        //   return this.froms.slice(0, 1)
        // case 10:
        //   return this.froms.slice(0, 1)
        // case 11:
        //   return this.froms.slice(0, 1)
        // case 12:
        //   return this.froms.slice(0, 1)
      }
    },
    cm () {
      return digitUppercase(this.m.replace(/[^0-9.]/g, '') || 0)
    },
    showSwitch () {
      console.log('f=', this.f, ' t=', this.t)
      return (this.f === 0 && this.t === 0) || (this.f === 2 && this.t === 0) || (this.f === 0 && this.t === 1) || (this.f === 3 && this.t === 0) || (this.f === 4 && this.t === 0) || (this.f === 0 && this.t === 2) || (this.f === 0 && this.t === 3) || (this.f === 0 && this.t === 4) || (this.f === 5 && this.t === 0) || (this.f === 6 && this.t === 0) || (this.f === 0 && this.t === 5) || (this.f === 7 && this.t === 0) || (this.f === 0 && this.t === 6) || (this.f === 8 && this.t === 0) || (this.f === 0 && this.t === 7) || (this.f === 9 && this.t === 0) || (this.f === 0 && this.t === 8) || (this.f === 10 && this.t === 0) || (this.f === 0 && this.t === 9) || (this.f === 11 && this.t === 0) || (this.f === 0 && this.t === 10) || (this.f === 12 && this.t === 0) || (this.f === 0 && this.t === 11) || (this.f === 13 && this.t === 0)
    },
    ccm () {
      return parseFloat(this.m.replace(/[^0-9.]/g, '') || 0)
    },
    bgAPI () {
      return [api.withdrawFromBG, api.transferToBG][this.f === 0 ? 1 : 0]
    },
    fi () {
      return parseInt((this.froms[this.f] || '').split(':')[1] || this.f)
    },
    ti () {
      return parseInt((this.ctos[this.t] || '').split(':')[1] || this.t)
    }
  },
  watch: {
    f () {
      if (this.f !== '' && this.f !== 0) this.t = 0
    },
    m () {
      this.m = this.m.trim()
      this.m = this.m.replace(/[^0-9,.]/g, '').replace(/[,.]{2,}/g, ',')
      let [l, r, t] = this.m.split('.')
      if (r) this.m = l + '.' + r.slice(0, 3)
      if ((r && r.split(/[,]/)[1]) || t) this.m = l + '.' + r.split(/[.,]/)[0].slice(0, 3)
    }
  },
  mounted () {
    this.getBalance()
    // this.__setCall({fn: '__getUserFund', args: undefined})
    this.f = this.t = 0
  },
  methods: {
    __setTransferI (i) {
      console.log('__setTransferI=', i)
    },
    refresh () {
      this.__setCall({fn: '__getUserFund', args: undefined})
      this.getBalance()
    },
    switchs () {
      if (this.f === 0 && this.t === 0) this.f = 2
      else if (this.f === 0 && this.t === 1) (this.f = 3) && (this.t = 0)
      else if (this.f === 0 && this.t === 2) (this.f = 4) && (this.t = 0)
      else if (this.f === 0 && this.t === 3) (this.f = 5) && (this.t = 0)
      else if (this.f === 0 && this.t === 4) (this.f = 6) && (this.t = 0)
      else if (this.f === 0 && this.t === 5) (this.f = 7) && (this.t = 0)
      else if (this.f === 0 && this.t === 6) (this.f = 8) && (this.t = 0)
      else if (this.f === 0 && this.t === 7) (this.f = 9) && (this.t = 0)
      else if (this.f === 0 && this.t === 8) (this.f = 10) && (this.t = 0)
      else if (this.f === 0 && this.t === 9) (this.f = 11) && (this.t = 0)
      else if (this.f === 0 && this.t === 10) (this.f = 12) && (this.t = 0)
      else if (this.f === 0 && this.t === 11) (this.f = 13) && (this.t = 0)
      else if (this.f === 2) (this.t = 0) || (this.f = 0)
      else if (this.f === 3) {
        this.f = 0
        setTimeout(() => {
          this.t = 1
        })
      } else if (this.f === 4) {
        this.f = 0
        setTimeout(() => {
          this.t = 2
        })
      } else if (this.f === 5) {
        this.f = 0
        setTimeout(() => {
          this.t = 3
        })
      } else if (this.f === 6) {
        this.f = 0
        setTimeout(() => {
          this.t = 4
        })
      } else if (this.f === 7) {
        this.f = 0
        setTimeout(() => {
          this.t = 5
        })
      } else if (this.f === 8) {
        this.f = 0
        setTimeout(() => {
          this.t = 6
        })
      } else if (this.f === 9) {
        this.f = 0
        setTimeout(() => {
          this.t = 7
        })
      } else if (this.f === 10) {
        this.f = 0
        setTimeout(() => {
          this.t = 8
        })
      } else if (this.f === 11) {
        this.f = 0
        setTimeout(() => {
          this.t = 9
        })
      } else if (this.f === 12) {
        this.f = 0
        setTimeout(() => {
          this.t = 10
        })
      } else if (this.f === 13) {
        this.f = 0
        setTimeout(() => {
          this.t = 11
        })
      }
    },
    ok () {
      if (this.f === 1) this.transferNow()
      else this.transferNowBG()
    },
    getBalance (a) {
      (a || this.a).forEach(x => {
        let [, platId, prop] = x.split(':')
        this.$http.myget(api.getBalanceByPID, {platId: platId}).then(({data: {bal, success}}) => {
          if (success) {
            let b = {}
            b[prop] = Number(bal)
            store.actions.setUser(b)
          }
        })
      })
      // this.$http.get(api.getBalance).then(({data}) => {
      //   if (data.success === 1) {
      //     store.actions.setUser({bgmoney: data.bgAmount || 0, tcgmoney: data.sportsAmount || 0, kymoney: data.kyAmount || 0, ptmoney: data.ptAmount || 0, agmoney: data.agAmount || 0, sbmoney: data.sbAmount || 0, lymoney: data.lyAmount, uwinmoney: data.uwinAmount, kgmoney: data.kgAmount, litAmount: data.litAmount})
      //   }
      // }).catch(rep => {
      //   // this.$message.error({target: this.$el, message: '特殊金额转换失败！'})
      // })
    },
    transferNow () {
      if (this.f === '') return this.$message.warning({target: this.$el, message: '请选择转出帐户！'})
      if (!this.ccm) return this.$message.warning({target: this.$el, message: '请输入转换金额！'})
      // if (!this.cpwd) return this.$message.warning({target: this.$el, message: '请输入资金密码！'})
      if (this.ccm > this.fm) return this.$message.warning({target: this.$el, message: '转出帐户余额不足！'})
      this.$http.post(api.transAmount, {amount: this.m, securityPwd: this.cpwd}).then(({data}) => {
        if (data.success === 1) {
          this.cpwd = ''
          this.m = ''
          this.$message.success({target: this.$el, message: data.msg || '金额转换成功！'})
          this.__setCall({fn: '__getUserFund', args: undefined})
        } else {
          this.$message.error({target: this.$el, message: data.msg || '金额转换失败！'})
        }
      }).catch(rep => {
        this.$message.error({target: this.$el, message: '金额转换失败！'})
      })
    },
    transferNowBG () {
      if (this.f === '') return this.$message.warning({target: this.$el, message: '请选择转出帐户！'})
      if (!this.cm) return this.$message.warning({target: this.$el, message: '请输入转换金额！'})
      // if (!this.cpwd) return this.$message.warning({target: this.$el, message: '请输入资金密码！'})
      if (this.ccm > this.fm) return this.$message.warning({target: this.$el, message: '转出帐户余额不足！'})
      this.btn = true
      let t = setTimeout(() => {
        if (this.btn) this.btn = false
      }, 10000)
      this.$message.success({target: this.$el, message: (['', '', 'BG', 'IBC', '棋牌', 'PT', 'AG', '沙巴', '乐游', 'U赢', 'KG', '微游', '平博', 'LG'][Math.max(this.f, this.t + 2)] + '余额转帐已提交！')})
      this.$http.get(this.bgAPI, {amount: this.m, platid: Math.max(this.fi, this.ti)}).then(({data}) => {
        if (data.success === 1) {
          this.cpwd = ''
          this.m = ''
          setTimeout(() => {
            this.getBalance([this.a[Math.max(this.f, this.t + 2) - 2]])
          }, 1000)
          this.__setCall({fn: '__getUserFund', args: undefined})
          // this.getBalance()
        } else {
          // this.$message.error({target: this.$el, message: data.msg || (['', '', 'BG', '体育'][Math.max(this.f, this.t + 2)] + '余额转换失败！')})
        }
      }).catch(rep => {
        // this.$message.error({target: this.$el, message: (['', '', 'BG', '体育'][Math.max(this.f, this.t + 2)] + '余额转换失败！')})
      }).finally(() => {
        this.btn = false
        clearTimeout(t)
        t = 0
      })
    },
    refund () {
      this.$http.get(api.withdrawAll).then(({data: {success, msg}}) => {
        if (success === 1) {
          this.$message.success({target: this.$el, message: msg || '一键转回成功'})
          setTimeout(this.getBalance, 1000)
          this.__setCall({fn: '__getUserFund', args: undefined})
        } else {
          this.$message.error({target: this.$el, message: msg || '一键转回失败'})
        }
      })
    },
    quickAmountHandler (amount) {
      if (!amount) return
      this.m = amount === '全部' ? this.ME.amoney : amount
    },
    quickTransfer (id, type) {
      console.log('id=', id, 'type=', type)
      if (type === 'i') {
        this.f = 0
        this.t = id
        console.log('id f=', this.f, ' t=', this.t)
        return
      }
      if (type === 'o') {
        this.f = id
        this.t = 0
      }
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .scroll-content
    // top .3rem
    padding 0 PW PW PW
    i
      font-style normal
    .yuan
      color #999999
    .fc-oriange
      color #f37e0c
    .info
      width 5.30rem
      float left
      position relative
      &::after
        content ''
        display block
        height 7.5rem
        border-right solid 1px #f0f0f0
        position absolute
        right 0
        top .7rem
        clear both
    .ds-icon-me-avatar
      display block
      height 1.1rem
      margin .3rem 0 .1rem 0
    .btn-amout
      width 0.54rem
      height 0.3rem
      border-radius 0.03rem
      border solid 1px #e2daa9
      color #666
      padding inherit
      text-shadow none
      background-image linear-gradient(0deg, #fff8d0 0%, #fffbe1 100%), linear-gradient(#f37e0c, #f37e0c)
      background-blend-mode normal, normal
    .buttons
      .danger
        width 1.2rem
        background-color #444444
      .danger:hover
        background-color #666666
    .primary
      width 1.2rem
    .wallet-ls
      width 10.34rem
      float left
    .btn-transfer
      width 0.7rem
      background-image linear-gradient(0deg, #f3f3f3 0%, #ffffff 100%), linear-gradient(#dbdbdb, #dbdbdb)
      background-blend-mode normal, normal
      border-style solid
      border-width 1px
      border-image-source linear-gradient(0deg, #dadada 0%, #e8e8e8 100%)
      border-image-slice 1
      color #666
      padding inherit
      text-shadow none
    .acc-shot-name
      width 1rem
      margin 0 auto
      background-size 100% 100%
      height 0.65rem
      overflow hidden
      span
        width 0.7rem
        line-height 0.42rem
        display block
        margin 0.2rem 0 0 0.06rem
    .s
      text-align center
      // background-image: linear-gradient(0deg, #ffffff 0%, #ffffff 60%, #fffae5 100%)
     accountBg($img, $color)
      background url('../../assets/v2/'$img) center no-repeat
      color $color
    .acc-bg-red
      accountBg('icon_account_bg_red.png', #f1574f)
    .acc-bg-oriange
      accountBg('icon_account_bg_orange.png', #f38d0e)
    .acc-bg-green
      accountBg('icon_account_bg_green.png', #29ab91)
    .acc-bg-blue
      accountBg('icon_account_bg_blue.png', #1691ee)  
    .c
      display inline-block
      width 1.2rem
      max-width 4rem
      // padding 1.2rem  .2rem .3rem .2rem
      padding 0.37rem  .2rem .3rem .2rem
      font-size .16rem
      vertical-align top
      .amount
        color BLUE
        font-size .2rem
        // font-family Roboto
        margin-top .2rem
        span
          font-size .14rem
      @media screen and (max-width: 2000px)
        width 1.5rem
      @media screen and (max-width: 1600px)
        width 1.3rem
      @media screen and (max-width: 1200px)
        width .8rem
        font-size .14rem
        .amount
          font-size .14rem
          
      
      // &:nth-child(1)
      //   background url(../../assets/v2/td_icon_01.png) center .25rem no-repeat

      // &:nth-child(2)
      //   background url(../../assets/v2/bz_icon_01.png) center .25rem no-repeat

      // &:nth-child(3)
      //   background url(../../assets/v2/qb_icon_02.png) center .25rem no-repeat

      // &:nth-child(4)
      //   background url(../../assets/v2/qb_icon_11.png) center .25rem no-repeat

      // &:nth-child(5)
      //   background url(../../assets/v2/qb_icon_05.png) center .25rem no-repeat

      // &:nth-child(6)
      //   background url(../../assets/v2/qb_icon_07.png) center .25rem no-repeat
      // &:nth-child(7)
      //   background url(../../assets/v2/qb_icon_08.png) center .25rem no-repeat
      // &:nth-child(8)
      //   background url(../../assets/v2/qb_icon_09.png) center .25rem no-repeat
      
      // &:nth-child(15)
      //   background url(../../assets/v2/qb_icon_03.png) center .25rem no-repeat
      
      // &:nth-child(9)
      //   background url(../../assets/v2/qb_icon_12.png) center .25rem no-repeat
      
      // &:nth-child(10)
      //   background url(../../assets/v2/qb_icon_13.png) center .25rem no-repeat

      // &:nth-child(11)
      //   background url(../../assets/v2/qb_icon_14.png) center .25rem no-repeat
      // &:nth-child(12)
      //   background url(../../assets/v2/qb_icon_15.png) center .25rem no-repeat
      // &:nth-child(13)
      //   background url(../../assets/v2/qb_icon_16.png) center .25rem no-repeat
      // &:nth-child(14)
      //   background url(../../assets/v2/qb_icon_17.png) center .25rem no-repeat
    
    .cc
      max-width 3.1rem
      margin 0 auto
      padding .3rem
      text-align right
      .title
        font-size .24rem
        text-align center
        margin-bottom .3rem
      .item
        display block
        line-height .3rem
      p:not(.title)
        line-height .3rem
        position relative
        margin-bottom .1rem

      .switch-box
        position absolute
        left 100%
        top -.03rem
        width 1rem
        text-align left
      .switch
        display inline-block
        width .4rem
        height .4rem
        background url(../../assets/v2/qb_icon_01.png) center center no-repeat #f3f3f3
        border 1px solid rgba(0,0,0,0)
        cursor pointer
        margin-right .1rem
        &:hover
          border 1px solid BLUE

      .refresh
        display inline-block
        width .4rem
        height .4rem
        background url(../../assets/v2/refresh.png) center center no-repeat #f3f3f3
        border 1px solid rgba(0,0,0,0)
        cursor pointer
        &:hover
          border 1px solid BLUE




</style>

