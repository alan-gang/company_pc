<template lang="jade">
  // transition(appear=true name="zoom")
  .game-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")

    <!-- 游戏信息 -->
    GameInfo.fixed(v-on:set-timeout="fetchTimeout" v-bind:v-bind:NPER="NPER" v-bind:CNPER="CNPER" v-bind:timeout="timeout" v-bind:type="type" v-bind:class="[page.class, page.class + '-middle', {show: scrollAtBottom}]" v-on:set-NPER = "setNPER" v-bind:gameid = "page.gameid" v-show="scrollAtBottom")
    .game-content.scroll-content(ref="GC" v-on:scroll="scrollHander")
      <!-- 开奖信息 -->
      GameLuckyNumberWithHistory(v-bind:gameid = "page.gameid" v-bind:game-type="gameType" v-bind:overtime="overtime" v-bind:lucknumbers="lucknumbers" v-bind:NPER="NPER" v-bind:PNPER="PNPER" v-bind:FNPER="FNPER" @click.native="showLuckyNumberHistory = !showLuckyNumberHistory" v-bind:allLuckyNumbers="allLuckyNumbers" )
      <!-- 游戏信息 -->
      GameInfo(v-on:set-timeout="fetchTimeout" ref="GI" v-bind:NPER="NPER" v-bind:CNPER="CNPER" v-bind:timeout="timeout" v-bind:type="type" v-bind:class="[page.class, page.class + '-middle']" v-on:set-NPER = "setNPER" v-bind:gameid = "page.gameid" v-show="!scrollAtBottom")
      <!-- 游戏菜单 -->
      GameMenu(v-bind:type="type" v-on:type="setType" v-bind:menus="menus" v-bind:getTitle="getTitle")
      <!-- 选号区 -->
      transition(name="slide" appear=true)
        GameSelection(v-bind:type="type" v-bind:gameid="page.gameid" v-on:n-change="Nchange"  v-on:set-nsns="setNsns" v-on:set-ps="setPs")
      <!-- 下单 -->
      GameOrderBar.inner-bar( v-if="ns.length > 0" v-bind:n="n" v-bind:pay="pay" v-bind:times="times" v-bind:currency="currency" v-bind:point="point"  v-bind:P="P" v-bind:canOrder="canOrder" v-on:set-times="setTimes" v-on:set-currency = "setCurrency" v-on:set-point="setPoint" v-on:order="order" )
      <!-- 投注单 -->
      GameOrderList(v-bind:ns="ns" v-if="ns.length > 0" v-on:remove-order="removeOrder")
      <!-- 追号栏 -->
      transition(name="slide-left" appear=true key="follow")
        GameFollowbar.inner-bar(v-if="follow.show" v-bind:stop="follow.stop" v-bind:CNPER="CNPER" v-bind:issues="issues" v-on:close-follow="closeFollow"  v-on:set-follow="setFollow")
      <!-- 追号单 -->
      transition(name="slide-left" appear=true key="follow")
        GameFollowList(v-if="follow.show" v-bind:FCNPER="follow.CNPER" v-bind:CNPER="CNPER" v-bind:pay="N1PAY" v-on:set-follow="setFollow" v-bind:issues="issues")
      <!-- 下单记录 -->
      // GameOrderHistory
      <!-- 追号记录 -->
      // GameFollowHistory

    <!-- 总计栏 -->
    GameAmountBar.inner-bar(:show="follow.show" v-bind:n="N" v-bind:pay="NPAY"  v-bind:NPER="follow.NPER" v-bind:PAY="follow.pay" v-bind:checked="checked" v-bind:pot="pot" v-on:toggle-checked="toggleChecked" v-on:toggle-pot="togglePot" v-on:showFollow="showFollow" v-on:book="book" v-if="ns.length > 0")
    <!-- 下单 -->
    GameOrderBar.fixed.inner-bar( v-if="ns.length === 0"  v-bind:n="n" v-bind:times="times" v-bind:currency="currency" v-bind:point="point"  v-bind:P="P" v-bind:canOrder="canOrder" v-bind:pay="pay" v-on:set-times="setTimes" v-on:set-currency = "setCurrency" v-on:set-point="setPoint" v-on:order="order")

    <!-- 历史开奖信息 -->
    // GameLuckyNumberHistory(v-bind:game-type="gameType" v-bind:gameid="page.gameid" v-bind:allLuckyNumbers="allLuckyNumbers" v-bind:class=" {show: showLuckyNumberHistory} ")

</template>
<script>
import GameLuckyNumber from 'components/GameLuckyNumber'
import GameLuckyNumberWithHistory from 'components/GameLuckyNumberWithHistory'
import GameLuckyNumberHistory from 'components/GameLuckyNumberHistory'
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
import util from '../../util'
import store from '../../store'
// import GameOrderHistory from 'components/GameOrderHistory'
// import GameFollowHistory from 'components/GameFollowHistory'

export default {
  props: ['page'],
  data () {
    return {
      isTry: store.state.user.isTry,
      scrollAtBottom: false,
      // 页面的url
      // url: 'one',
      // 最近的已开奖期数
      NPER: '100000000',
      CNPER: '100000000',
      // 最近的已开奖期号码
      lucknumbers: [0, 0, 0, 0, 0],
      // 即将开奖的期数
      // CNPER: 150730053 + 1,
      // 即将开奖倒计时
      // 秒
      timeout: (100 * 3600) - 1,
      // 剩余的奖期数
      FNPER: 0,
      // 开过的奖期数
      PNPER: 0,
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
      // 投注号码文字表示
      nsnsTitle: '',
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
        CNPER: '100000000',
        // 中奖后停止追号
        stop: true,
        // 追号类型，1-同步，2-翻倍，3-利润率
        type: 3,
        // 翻倍追号倍数
        t: 2,
        // 低收益率
        point: 50,
        items: []
      },
      // 使用优惠卷
      checked: false,
      // 奖池投注
      pot: false,
      // 位置集合
      ps: [],
      // 游戏所有玩法的返点信息
      PS: [],
      // 游戏所有奖期的开奖时间
      issues: [],
      showLuckyNumberHistory: false,
      overtime: false,
      lucknumbersTimeout: 0,
      allLuckyNumbers: [],
      notify: null,
      hasUnable: false
    }
  },
  computed: {
    callId () {
      return this.page.gameid + '|' + this.type.id
    },
    pay () {
      return Number((this.n * this.times * this.currency.value * 2).toFixed(3))
    },
    // CNPER () {
    //   return this.NPER + 1
    // },
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
      }, this.pot ? 1 : 0)
    },
    // 已投注注数金额不包含times
    N1PAY () {
      return this.ns.reduce((p, n) => {
        return (p += n.pay / n.times)
      }, 0)
    },
    P () {
      return this.PS.find(p => {
        return (p.methodid + '') === this.methodid
      }) || {maxprize: 0, minprize: 0, scale: 0, maxpoint: 0.00, minpoint: 0}
    },
    methodid () {
      return M[this.type.id + this.idType].split(':')[0]
    },
    methodidtype () {
      return M[this.type.id + this.idType].split(':')[1]
    },
    idType () {
      return this.gameType === 'SSL' ? '-' + this.gameType : ''
    },
    hasRepeatOrder () {
      return this.ns.filter(o => (o.methodid + '') === this.methodid && o.codes === this.nsns && o.pos === this._getPsstring(this.ps))[0]
    }
  },
  watch: {
    ns () {
      if (this.ns.length === 0) this.follow.show = false
    },
    // P () {
    //   this.p && (this.point = this.P.minpoint)
    //   this.p && (this.bonus = this.P.maxprize)
    // },
    timeout () {
      if (this.timeout === 0) {
        this.__getIssue()
        this.__recentlyCode()
        this.__getTraceIssueList()
      } else if (this.timeout < 1) {
        setTimeout(this.__getIssue, 1000)
      }
    },
    showLuckyNumberHistory () {
      if (this.showLuckyNumberHistory) {
        this.__recentlyCode(true)
      }
    },
    // 如果当前奖期改变，那么提示已投注的期数直接过渡到下期
    CNPER (n, o) {
      if (this.ns.length > 0) {
        if (!this.notify) {
          this.notify = this.$modal.question({
            content: '<div class="text-666" style="line-height: .3rem;text-indent: .15rem; text-align: left">当前期为<span class="text-danger">' + n + '</span>，您在<span class="text-danger">' + o + '</span>期的投注将默认直接转到当前期</div>',
            btn: ['转到当前期', '清空投注'],
            target: this.$el,
            cancel () {
              this.ns = []
            },
            close () {
              this.notify = null
            },
            O: this
          })
        } else {
          this.notify.content = '<div class="text-666" style="line-height: .3rem;">当前期为<span class="text-danger">' + n + '</span>，您在<span class="text-danger">' + o + '</span>期的投注将默认直接转到当前期</div>'
        }
      }
    },
    'follow.show' () {
      if (this.follow.show) this.__getTraceIssueList()
    }
  },
  created () {
  },
  mounted () {
    // 获得当前奖期
    this.__getIssue()
    // 获得游戏所有奖期的开奖时间
    this.__getTraceIssueList()
    // 获得游戏所有玩法对应的返点信息
    this.getUserpoint()
    // 获得历史开奖号码
    this.__recentlyCode()
    this.follow.CNPER = this.CNPER
    // setInterval(() => {
    //   this.CNPER = parseInt(this.CNPER) + 1 + ''
    // }, 3000)
    if (this.isTry) this.checked = true
  },
  beforeDestroy () {
    clearInterval(this.lucknumbersTimeout)
  },
  methods: {
    scrollHander (evt) {
      if (this.$refs.GC.scrollTop > 96) this.scrollAtBottom = true
      else this.scrollAtBottom = false
    },
    // 获得当前已开奖信息
    __recentlyCode (noloop) {
      if (!noloop && this.lucknumbersTimeout) clearTimeout(this.lucknumbersTimeout)
      this.$http.post(api.recentlyCode, {gameid: this.page.gameid, pageNum: 1, size: 30}).then(({data}) => {
        // success
        if (data.success > 0 && data.items.length > 0) {
          data.items.forEach(d => {
            d.lucknumbers = d.code.split(',')
            if (this.gameType === 'KL8') {
              d.lucknumbers = util.groupArray(d.lucknumbers, 5)
            }
          })
          let lst = data.items[0] || {}
          if (this.NPER === lst.issue + '' && !noloop) {
            this.overtime = true
            this.lucknumbersTimeout = setTimeout(() => {
              this.__recentlyCode()
            }, 3000)
          } else {
            this.overtime = false
            this.NPER = lst.issue + ''
            this.lucknumbers = lst.lucknumbers
          }
          this.allLuckyNumbers = data.items || []
        } else if (data.success >= 0) {
          this.overtime = true
          this.lucknumbersTimeout = setTimeout(() => {
            this.__recentlyCode()
          }, 3000)
        }
      }, (rep) => {
        // error
      })
    },
    // 获得当前正在进行的奖期信息
    __getIssue () {
      this.$http.post(api.getIssue, {gameid: this.page.gameid}).then(({data}) => {
        // success
        if (data.success > 0) {
          // 当前期
          // this.NPER = (parseInt(data.issue) || 1) - 1
          this.CNPER = data.issue
          this.PNPER = data.openedCount
          this.FNPER = data.dailyCount
          this.timeout = Math.floor((data.saleend - data.current) / 1000) || (this.timeout + 0.05)
        } else {
          // this.$message.error({message: '当前奖期获取失败！'})
          this.$modal.warn({
            target: this.$el,
            content: '当前奖期已停止销售！',
            btn: ['好的']
          })
          // this.timeout += 0.05
        }
      }, (rep) => {
        // error
        this.$message.error({message: '当前奖期获取失败！'})
        this.timeout += 0.05
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
    __getTraceIssueList () {
      this.$http.post(api.getTraceIssueList, {gameid: this.page.gameid}).then(({data}) => {
        // success
        if (data.success > 0) {
          // data.items.forEach(d => (d.selected = false))
          this.issues = data.items
        }
      }, (rep) => {
        // error
      })
    },
    book (pot) {
      this.booking(pot)
    },
    // 投注
    booking (pot) {
      if (this.follow.show && !this.follow.items[0]) {
        return this.$modal.warn({
          target: this.$el,
          content: '您还没有勾选任何追号奖期！',
          btn: ['确定']
        })
      }
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
        trace: this.follow.show ? JSON.stringify(this._getTrace()) : '',
        isJoinPool: !this.follow.show && pot ? 1 : 0
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
          this.__setCall({fn: '__getUserFund', callId: undefined})
          this.ns = []
        } else {
          // this.$message.warning('投注失败！')
          loading.text = data.msg || '投注失败！'
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
      this.__setCall({fn: '__clearSelectedNumbers'})
      setTimeout(() => {
        this.__setCall({fn: '__clearValue'})
      }, 0)
    },
    toggleChecked () {
      this.checked = !this.checked
    },
    togglePot () {
      this.pot = !this.pot
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
    Nchange (n, hasUnable) {
      this.n = n
      this.hasUnable = hasUnable
    },
    // 当前注的号码
    setNsns (nsns, nsnsTitle) {
      this.nsns = nsns
      this.nsnsTitle = nsnsTitle
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
    // beforeOrder () {
    //   this.__setCall({fn: '__removeRepeat'})
    // },
    // __order () {
    //   this.order()
    // },
    order () {
      if (this.hasUnable) {
        return this.$modal.warn({
          content: '<div class="text-666" style="line-height: .3rem;text-indent: .15rem; text-align: left">您输入了<span class="text-danger">无效号码</span>，系统已自动删除无效号码</div>',
          btn: ['确定', '取消'],
          target: this.$el,
          ok () {
            this.ns.push(Object.assign({title: this.type.title, $: this.currency.title, n: this.n, times: this.times, pay: this.pay, bonus: this.bonus, point: (this.point * 100).toFixed(2) + '%', selected: false}, {
              methodid: parseInt(this.methodid), // 玩法编号
              type: parseInt(this.methodidtype),
              pos: this._getPsstring(), // 任选位置信息 ,万千百十个,以逗号“,”连接; w,q,b,s,g
              codes: this._getCodes(), // 投注内容,不同位的用竖线“|”连接，相同位选多个号码用“,”连接.
              nsnsTitle: this.nsnsTitle,
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
          },
          O: this
        })
      } else if (this.hasRepeatOrder) {
        this.$modal.warn({
          content: '<div class="text-666" style="line-height: .3rem;text-indent: .15rem; text-align: left">已存在<span class="text-danger">相同订单</span>了！</div>',
          btn: ['确定'],
          target: this.$el
        })
        this.__setCall({fn: '__clearSelectedNumbers'})
        setTimeout(() => {
          this.__setCall({fn: '__clearValue'})
        }, 0)
      } else {
        this.ns.push(Object.assign({title: this.type.title, $: this.currency.title, n: this.n, times: this.times, pay: this.pay, bonus: this.bonus, point: (this.point * 100).toFixed(2) + '%', selected: false}, {
          methodid: parseInt(this.methodid), // 玩法编号
          type: parseInt(this.methodidtype),
          pos: this._getPsstring(), // 任选位置信息 ,万千百十个,以逗号“,”连接; w,q,b,s,g
          codes: this._getCodes(), // 投注内容,不同位的用竖线“|”连接，相同位选多个号码用“,”连接.
          nsnsTitle: this.nsnsTitle,
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
      }
      // this.currency = {
      //   value: 1,
      //   title: '元',
      //   model: 1
      // }
      // this.point = 0.00
      // this.times = 1
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
          issue: item.issue,
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
    },
    fetchTimeout () {
      this.timeout = 0
    }
    // setCall (call) {
    //   this.call = Object.assign(this.call, call)
    // }
  },
  components: {
    GameLuckyNumber,
    GameLuckyNumberWithHistory,
    GameInfo,
    GameMenu,
    GameSelection,
    GameOrderBar,
    GameOrderList,
    GameAmountBar,
    GameFollowbar,
    GameFollowList,
    GameLuckyNumberHistory
    // GameOrderHistory,
    // GameFollowHistory
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../var.stylus'
  .game-page
    user-select none
    
  .game-info.show + .game-content
    top TH + GH
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



