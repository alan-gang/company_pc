<template lang="jade">
  // transition(appear=true name="zoom")
  .game-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .game-content.scroll-content
      <!-- 开奖信息 -->
      GameLuckyNumber(v-bind:game-type="gameType" v-bind:lucknumbers="lucknumbers" v-bind:NPER="NPER" v-bind:PNPER="PNPER" v-bind:FNPER="FNPER" )
      <!-- 游戏信息 -->
      GameInfo(v-bind:NPER="NPER" v-bind:CNPER="CNPER" v-bind:timeout="timeout" v-bind:type="type" v-bind:class="[page.class + '-middle']" v-on:set-NPER = "setNPER" v-bind:gameid = "page.gameid")
      <!-- 游戏菜单 -->
      GameMenu(v-bind:type="type" v-on:type="setType" v-bind:menus="menus" v-bind:getTitle="getTitle")
      <!-- 选号区 -->
      GameSelection(v-bind:type="type" v-on:n-change="Nchange"  v-on:set-nsns="setNsns" v-on:set-ps="setPs")
      <!-- 下单 -->
      GameOrderBar.inner-bar( v-if="ns.length > 0" v-bind:n="n" v-bind:pay="pay" v-bind:times="times" v-bind:currency="currency" v-bind:point="point"  v-bind:P="P" v-bind:canOrder="canOrder" v-on:set-times="setTimes" v-on:set-currency = "setCurrency" v-on:set-point="setPoint" v-on:order="order" )
      <!-- 投注单 -->
      GameOrderList(v-bind:ns="ns" v-if="ns.length > 0" v-on:remove-order="removeOrder")
      <!-- 追号栏 -->
      GameFollowbar.inner-bar(v-if="follow.show" v-bind:CNPER="CNPER" v-on:close-follow="closeFollow"  v-on:set-follow="setFollow")
      <!-- 追号单 -->
      GameFollowList(v-if="follow.show" v-bind:FCNPER="follow.CNPER" v-bind:CNPER="CNPER" v-bind:pay="NPAY" v-on:set-follow="setFollow" v-bind:dates="issues")
      <!-- 下单记录 -->
      // GameOrderHistory
      <!-- 追号记录 -->
      // GameFollowHistory

    <!-- 总计栏 -->
    GameAmountBar.inner-bar(:show="follow.show" v-bind:n="N" v-bind:pay="NPAY"  v-bind:NPER="follow.NPER" v-bind:PAY="follow.pay" v-bind:checked="checked" v-on:toggle-checked="toggleChecked" v-on:showFollow="showFollow" v-on:book="book" v-if="ns.length > 0")
    <!-- 下单 -->
    GameOrderBar.fixed.inner-bar( v-if="ns.length === 0"  v-bind:n="n" v-bind:times="times" v-bind:currency="currency" v-bind:point="point"  v-bind:P="P" v-bind:canOrder="canOrder" v-bind:pay="pay" v-on:set-times="setTimes" v-on:set-currency = "setCurrency" v-on:set-point="setPoint" v-on:order="order")
      

</template>
<script>
import GameLuckyNumber from 'components/GameLuckyNumber'
import GameInfo from 'components/GameInfo'
import GameMenu from 'components/GameMenu'
import GameSelection from 'components/GameSelection'
import GameOrderBar from 'components/GameOrderBar'
import GameOrderList from 'components/GameOrderList'
import GameAmountBar from 'components/GameAmountBar'
import GameFollowbar from 'components/GameFollowbar'
import GameFollowList from 'components/GameFollowList'
import api from '../../http/api'
import M from '../../util/M'
// import GameOrderHistory from 'components/GameOrderHistory'
// import GameFollowHistory from 'components/GameFollowHistory'

export default {
  props: ['page'],
  data () {
    return {
      // 页面的url
      // url: 'one',
      // 最近的已开奖期数
      NPER: 150730053,
      // 最近的已开奖期号码
      lucknumbers: [5, 8, 5, 6, 8],
      // 即将开奖的期数
      // CNPER: 150730053 + 1,
      // 即将开奖倒计时
      // 秒
      timeout: 0,
      // 剩余的奖期数
      FNPER: 502,
      // 开过的奖期数
      PNPER: 518,
      // 玩法信息
      // type: {
      //   id: '5-1-1',
      //   // 玩法名
      //   title: '',
      //   // 玩法描述
      //   description: ''
      // },
      // 选择的注数
      n: 0,
      // 投注列表
      ns: [],
      // 投注号码
      nsns: [],
      // 倍数
      times: 1,
      // 金额单位
      /***
      * 1 元
      *.1 角
      *.01 分
      *.001 厘
      ***/
      currency: {
        value: 1,
        title: '元',
        model: 1
      },
      // 奖金
      bonus: 0.00,
      // 返点
      point: 0.00,
      // 追号信息
      follow: {
        // 显示追号单
        show: false,
        // 追号期数
        NPER: 0,
        // 追号金额
        pay: 0,
        // 追号起始期
        CNPER: 0,
        // 中奖后停止追号
        stop: true,
        // 追号类型，1-同步，2-翻倍，3-利润率
        type: 3,
        // 翻倍追号倍数
        t: 2,
        // 低收益率
        point: 0,
        items: []
      },
      // 使用优惠卷
      checked: false,
      // 位置集合
      ps: [],
      // 游戏所有玩法的返点信息
      PS: [],
      // 游戏所有奖期的开奖时间
      issues: []

    }
  },
  mounted () {
    // 获得当前奖期
    this.__getIssue()
    // 获得游戏所有玩法对应的返点信息
    this.getUserpoint()
    // 获得游戏所有奖期的开奖时间
    this.getTraceIssueList()
    this.follow.CNPER = this.CNPER
  },
  computed: {
    pay () {
      return Number((this.n * this.times * this.currency.value * 2).toFixed(3))
    },
    CNPER () {
      return this.NPER + 1
    },
    canOrder () {
      return this.n
    },
    // 已投注注数
    N () {
      return this.ns.reduce((p, n) => {
        return (p += n.n)
      }, 0)
    },
    // 已投注注数金额
    NPAY () {
      return this.ns.reduce((p, n) => {
        return (p += n.pay)
      }, 0)
    },
    P () {
      return this.PS.find(p => {
        return (p.methodid + '') === this.methodid
      }) || {maxprize: 1800, minprize: 1400, scale: 50, maxpoint: 0.08, minpoint: 0}
    },
    methodid () {
      return M[this.type.id + this.idType].split(':')[0]
    },
    methodidtype () {
      return M[this.type.id + this.idType].split(':')[1]
    },
    idType () {
      return this.gameType === 'SSL' ? '-' + this.gameType : ''
    }
  },
  watch: {
    ns () {
      if (this.ns.length === 0) this.follow.show = false
    },
    P () {
      this.p && (this.point = this.P.minpoint)
      this.p && (this.bonus = this.P.maxprize)
    }
  },
  methods: {
    // 获得奖期信息
    __getIssue () {
      this.$http.post(api.getIssue, {gameid: this.page.gameid}).then(({data}) => {
        // success
        if (data.success > 0) {
          this.NPER = (parseInt(data.issue) || 1) - 1
          this.timeout = Math.floor((data.saleend - data.current) / 1000)
        }
      }, (rep) => {
        // error
      })
    },
    // 获得该游戏所有返点信息
    getUserpoint () {
      this.$http.post(api.getUserpoint, {gameid: this.page.gameid}).then(({data}) => {
        // success
        if (data.success > 0) this.PS = data.items
      }, (rep) => {
        // error
      })
    },
    getTraceIssueList () {
      this.$http.post(api.getTraceIssueList, {gameid: this.page.gameid}).then(({data}) => {
        // success
        if (data.success > 0) this.issues = data.items
      }, (rep) => {
        // error
      })
    },
    book () {
      this.booking()
    },
    // 投注
    booking () {
      let loading = this.$loading({
        text: '投注中...',
        target: this.$el
      }, 10000, '投注超时...')
      this.$http.post(api.booking, {
        gameid: parseInt(this.page.gameid), // 游戏代码
        issue: String(this.CNPER), // 起始期号
        totalnums: this.N, // 总注数
        totalmoney: this.NPAY, // 总投注金额
        type: this.follow.show ? 2 : 1, // 类型：1-投注；2-追号
        isusefree: this.checked ? 1 : 0, // 是否使用优惠券，0-否，1-是
        items: JSON.stringify(this._getOrderItems()),
        trace: this.follow.show ? JSON.stringify(this._getTrace()) : ''
      }).then(({data}) => {
        // success
        if (data.success > 0) {
          // this.$message.success('投注成功')
          loading.text = '投注成功'
          // this.__loading({
          //   text: '投注成功.',
          //   target: this.$el
          // }, 1000)
          // this.__setCall({fn: '__getOrderList'})
          // this.__setCall({fn: '__getFollowList'})
          // this.__setCall({fn: '__getUserFund'})
          // this.__setCall({fn: '__getUserFund'})
          this.ns = []
        } else {
          // this.$message.warning('投注失败！')
          loading.text = '投注失败！'
          // this.__loading({
          //   text: '投注失败！',
          //   target: this.$el
          // }, 1000)
        }
      }, (rep) => {
        loading.text = '投注失败！'
        // this.__loading({
        //   text: '投注失败！',
        //   target: this.$el
        // }, 1000)
        // error
      }).finally(() => {
        setTimeout(() => {
          loading.close()
        }, 1000)
      })
    },
    setType (type) {
      this.type = type
      this.__setCall({fn: 'clear', args: this.call.args + ' '})
    },
    toggleChecked () {
      this.checked = !this.checked
    },
    showFollow () {
      this.follow.show = true
      this.$nextTick(() => {
        this.$el.querySelector('.follow-list').scrollIntoViewIfNeeded()
      })
    },
    closeFollow () {
      this.follow.show = false
      this.clearFollow()
    },
    setFollow ({NPER, pay, CNPER, stop, type, t, point, items}) {
      NPER !== undefined && (this.follow.NPER = NPER)
      pay !== undefined && (this.follow.pay = pay)
      CNPER !== undefined && (this.follow.CNPER = CNPER)
      stop !== undefined && (this.follow.stop = stop)
      type !== undefined && (this.follow.type = type)
      t !== undefined && (this.follow.t = t)
      point !== undefined && (this.follow.point = point)
      items !== undefined && (this.follow.items = items)
    },
    clearFollow () {
      this.follow.NPER = 0
      this.follow.pay = 0
    },
    // 注数
    Nchange (n) {
      this.n = n
    },
    // 当前注的号码
    setNsns (nsns) {
      this.nsns = nsns
    },
    // 当前注的位置
    setPs (ps) {
      this.ps = ps
    },
    setTimes (t) {
      this.times = t
      // if (this.times <= 0) this.times = 1
    },
    setCurrency (c) {
      this.currency = c
    },
    setPoint (p, b) {
      this.point = p
      this.bonus = b
    },
    order () {
      this.ns.push(Object.assign({title: this.type.title, $: this.currency.title, n: this.n, times: this.times, pay: this.pay, bonus: this.bonus, point: this.point + '%', selected: false}, {
        methodid: parseInt(this.methodid), // 玩法编号
        type: parseInt(this.methodidtype),
        pos: this._getPsstring(), // 任选位置信息 ,万千百十个,以逗号“,”连接; w,q,b,s,g
        codes: this._getCodes(), // 投注内容,不同位的用竖线“|”连接，相同位选多个号码用“,”连接.
        count: this.n, // 注数
        times: this.times, // 倍数
        money: this.pay, // 金额
        mode: this.currency.model, // 1-元，2-角，3-分，4-厘
        userpoint: this.point // 用户选择的返点
      }))
      this.__setCall({fn: '__clearSelectedNumbers'})
      setTimeout(() => {
        this.__setCall({fn: '__clearValue'})
      }, 0)
      // after push need initial the selected numbers
    },
    _getOrderItems () {
      let items = []
      this.ns.forEach(item => {
        items.push({
          methodid: item.methodid, // 玩法编号
          type: item.type,
          pos: item.pos,
          codes: item.codes,
          count: item.count,
          times: item.times,
          money: item.money,
          mode: item.mode,
          userpoint: item.userpoint
        })
      })
      return items
    },
    _getTrace () {
      return {
        task_type: this.follow.type,
        task_stop: this.follow.stop ? 1 : 0,
        task_begin: this.follow.CNPER,
        task_double_times: this.follow.t,
        task_min_rate: this.follow.point,
        task_money: this.follow.pay,
        items: this._getTraceItems()
      }
    },
    _getTraceItems () {
      let items = []
      this.follow.items.forEach(item => {
        items.push({
          issue: item.NPER,
          times: item.times
        })
      })
      return items
    },
    _getPsstring () {
      let psstring = ''
      this.ps.forEach(ps => {
        switch (ps) {
          case 1:
            psstring += 'g,'
            break
          case 2:
            psstring += 's,'
            break
          case 3:
            psstring += 'b,'
            break
          case 4:
            psstring += 'q,'
            break
          case 5:
            psstring += 'w,'
            break
        }
      })
      return psstring ? psstring.slice(0, psstring.length - 1) : ''
    },
    _getCodes () {
      return this.nsns
    },
    removeOrder (index) {
      if (index === undefined) this.ns = []
      else {
        this.ns.splice(index, 1)
        if (this.ns.length === 0) this.follow.show = false
      }
    },
    setNPER (n) {
      this.NPER = n
    }
    // setCall (call) {
    //   this.call = Object.assign(this.call, call)
    // }
  },
  components: {
    GameLuckyNumber,
    GameInfo,
    GameMenu,
    GameSelection,
    GameOrderBar,
    GameOrderList,
    GameAmountBar,
    GameFollowbar,
    GameFollowList
    // GameOrderHistory,
    // GameFollowHistory
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../var.stylus'
  .game-content
    top TH
    bottom GAH
    // padding-bottom GAH
    max-width 9.3rem
    // max-height "calc(100% - %s)" % (TH + GAH)
    margin 0 auto
    overflow-x hidden
    overflow-y auto
  
  .inner-bar
    padding 0 PWX
    line-height .5rem
    bg-gradient(180deg, #fff, #efefef)
    box-shadow 0 0 .05rem rgba(0,0,0,.1)

</style>



