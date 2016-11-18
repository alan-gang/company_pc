<template lang="jade">
    .page 
      slot(name="cover")
      slot(name="movebar")
      slot(name="resize-x")
      slot(name="resize-y")
      slot(name="toolbar")
      slot(name="game-content")

      .game-content.scroll-content
        <!-- 开奖信息 -->
        GameLuckyNumber(v-bind:lucknumbers="lucknumbers" v-bind:NPER="NPER" v-bind:PNPER="PNPER" v-bind:FNPER="FNPER")
        <!-- 游戏信息 -->
        GameInfo(v-bind:NPER="NPER" v-bind:CNPER="CNPER" v-bind:timeout="timeout" v-bind:title="type.title")
        <!-- 游戏菜单 -->
        GameMenu(v-bind:type="type" v-on:type="setType")
        <!-- 选号区 -->
        GameSelection(v-bind:type="type" v-on:n-change="Nchange")
        <!-- 下单 -->
        GameOrderBar(v-if="ns.length > 0" v-bind:n="n" v-bind:times="times" v-bind:currency="currency" v-bind:point="point" v-bind:canOrder="canOrder" v-on:set-times="setTimes" v-on:set-currency = "setCurrency" v-on:set-point="setPoint" v-on:order="order" )
        <!-- 投注单 -->
        GameOrderList(v-bind:ns="ns" v-if="ns.length > 0" v-on:remove-order="removeOrder")
        <!-- 追号栏 -->
        GameFollowbar(v-if="follow.show" v-bind:CNPER="CNPER" v-on:closeFollow="closeFollow")
        <!-- 追号单 -->
        GameFollowList(v-if="follow.show" v-bind:CNPER="CNPER" v-bind:pay="pay" v-on:setFollow="setFollow")

      <!-- 总计栏 -->
      GameAmountBar(:show="follow.show" v-bind:n="n" v-bind:pay="pay"  v-bind:NPER="follow.NPER" v-bind:PAY="follow.pay" v-on:showFollow="showFollow" v-if="ns.length > 0")
      <!-- 下单 -->
      GameOrderBar.fixed( v-if="ns.length === 0"  v-bind:n="n" v-bind:times="times" v-bind:currency="currency" v-bind:point="point" v-bind:canOrder="canOrder" v-bind:pay="pay" v-on:set-times="setTimes" v-on:set-currency = "setCurrency" v-on:set-point="setPoint" v-on:order="order")
      

</template>

<script>
import base from 'components/base'
import GameLuckyNumber from 'components/GameLuckyNumber'
import GameInfo from 'components/GameInfo'
import GameMenu from 'components/GameMenu'
import GameSelection from 'components/GameSelection'
import GameOrderBar from 'components/GameOrderBar'
import GameOrderList from 'components/GameOrderList'
import GameAmountBar from 'components/GameAmountBar'
import GameFollowbar from 'components/GameFollowbar'
import GameFollowList from 'components/GameFollowList'

export default {
  mixins: [base],
  props: ['page'],
  data () {
    return {
      // 页面的url
      url: 'one',
      // 最近的已开奖期数
      NPER: 150730053,
      // 最近的已开奖期号码
      lucknumbers: [5, 8, 5, 6, 8],
      // 即将开奖的期数
      // CNPER: 150730053 + 1,
      // 即将开奖倒计时
      // 秒
      timeout: 5 * 60,
      // 剩余的奖期数
      FNPER: 502,
      // 开过的奖期数
      PNPER: 518,
      // 玩法信息
      type: {
        id: '5-1-1',
        // 玩法名
        title: '',
        // 玩法描述
        description: ''
      },
      // 选择的注数
      n: 0,
      // 投注列表
      ns: [],
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
        title: '元'
      },
      // 奖金
      bonus: 0.00,
      // 返点
      point: '',
      // 追号信息
      follow: {
        // 显示追号单
        show: false,
        // 追号期数
        NPER: 0,
        // 追号金额
        pay: 0
      }
    }
  },
  created () {
    this.updatePage(this.url, {rows: this.rows})
  },
  computed: {
    pay () {
      return Number((this.n * this.times * this.currency.value * 2).toFixed(3))
    },
    CNPER () {
      return this.NPER + 1
    },
    canOrder () {
      return !!(this.n && this.point)
    }
  },
  methods: {
    setType (type) {
      this.type = type
      // this.updatePage(url, { type })
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
    setFollow ({NPER, pay}) {
      this.follow.NPER = NPER
      this.follow.pay = pay
    },
    clearFollow () {
      this.follow.NPER = 0
      this.follow.pay = 0
    },
    Nchange (n) {
      this.n = n
    },
    setTimes (t) {
      this.times += t
      if (this.times <= 0) this.times = 1
    },
    setCurrency (c) {
      this.currency = c
    },
    setPoint (p) {
      this.point = p
    },
    order () {
      this.ns.push({title: this.type.title, $: this.currency.title, n: this.n, times: this.times, pay: this.pay, bonus: this.bonus, point: this.point})
      // after push need initial the selected numbers
    },
    removeOrder (index) {
      this.ns.splice(index, 1)
    }
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  .game-content
    bottom GAH + .1rem
    background-color #ddd
    // max-width 14rem
    margin 0 auto
    overflow auto

</style>



