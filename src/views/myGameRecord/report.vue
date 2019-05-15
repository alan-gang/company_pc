<template lang="jade">
.my-report-record
  slot(name="cover")
  slot(name="movebar")
  slot(name="resize-x")
  slot(name="resize-y")
  slot(name="toolbar")
  .scroll-content
    .search-bar.pl20
        SearchConditions(v-bind:showBtnSearch="true" @choiced="choicedSearchCondition" @search="search")

    template(v-if=" I === 0 ")
      el-table.header-bold.nopadding(:data="profitAndLossSummaryData" style="margin: .2rem 0" stripe ref="table")  
        el-table-column(v-bind:prop="k" v-bind:label="v" v-for="(v, k, i) in profitAndLossSummaryTableColumn" v-bind:class-name="i === 0 ? 'pl2' : ''")

    template(v-if=" I === 1 ")
      el-table.header-bold.nopadding(:data="personaLotteryData" style="margin: .2rem 0" stripe ref="table")  
        el-table-column(v-bind:prop="k" v-bind:label="v" v-for="(v, k, i) in lotteryTableColumn" v-bind:class-name="i === 0 ? 'pl2' : ''")

    template(v-if=" [2, 3, 4, 5, 6, 7, 8].indexOf(I) !== -1 ")
      el-table.header-bold.nopadding(:data="otherCommonReportData" style="margin: .2rem 0" stripe ref="table")  
        el-table-column(v-bind:prop="k" v-bind:label="v" v-for="(v, k, i) in otherCommonTableColumn" v-bind:class-name="i === 0 ? 'pl2' : ''")
    
    //- el-table.header-bold.nopadding(:data="data" style="margin: .2rem 0" stripe ref="table")
        el-table-column(prop="payerTime" label="充值时间" class-name="pl2")

        el-table-column(prop="bankName" label="银行" )

        el-table-column(prop="payerRealAmount" label="金额"  align="right")

        el-table-column(prop="payerTransferFee" label="手续费"  align="right")

        el-table-column(label="状态" align="center")
          template(scope="scope")
            span(:class="{ 'text-green': scope.row.isDone === '充值成功', 'text-danger': scope.row.isDone !== '充值成功' }") {{  scope.row.isDone}}

        el-table-column(label="操作" align="center")
          template(scope="scope")
            span.ds-button.text-button(:class="{ blue: scope.row.errorEntry === '0', 'light wg': scope.row.errorEntry !== '0' }" v-if="scope.row.isDone !== '充值成功'" @click="showReq(scope.row)" style="padding: 0") 催到帐

    el-pagination(:total="totalSize" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="curPage" small v-if=" totalSize > 20 " v-on:current-change="pageChanged")


  //- Summary.scroll-content(v-if=" I === 0 ")
  //- Order.scroll-content(v-if=" I === 1 ")
  //- VROrder.scroll-content(v-if=" I === 2 ")
  //- SportRecord.scroll-content(v-if=" I === 3 ")
  //- VideoRecord.scroll-content(v-if=" I === 4 ")
  //- GameRecord.scroll-content(v-if=" I === 5 ")
  //- FishRecord.scroll-content(v-if=" I === 6 ")
  //- CardRecord.scroll-content(v-if=" I === 7 ")
</template>

<script>
// import Summary from './Summary'
// import Order from './OF'
// import VROrder from './VROF'
// import SportRecord from './SportRecord'
// import VideoRecord from './VideoRecord'
// import GameRecord from './GameRecord'
// import FishRecord from './FishRecord'
// import CardRecord from './CardRecord'
import api from 'src/http/api'
import { dateFormat } from '../../util/Date'
import SearchConditions from 'components/SearchConditions'
import store from '../../store'
export default {
  components: {
    // Summary,
    // Order,
    // VROrder,
    // SportRecord,
    // VideoRecord,
    // GameRecord,
    // FishRecord,
    // CardRecord

    SearchConditions
  },
  name: 'my-game-record',
  props: ['menus'],
  data () {
    return {
      me: store.state.user,
      I: 0,
      stEt: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date(new Date().getTime())],
      pageSize: 20,
      curPage: 0,
      totalSize: 0,
      profitAndLossSummaryTableColumn: {
        chesettle: '棋牌盈亏',
        egamesettle: '电游盈亏',
        esptsettle: '电竞盈亏',
        fishsettle: '扑鱼盈亏',
        ltrsettle: '彩票盈亏',
        othltrsettle: 'KG基诺彩盈亏',
        sptsettle: '体育盈亏',
        vidsettle: '真人盈亏',
        litsettle: '微游盈亏'
      },
      lotteryTableColumn: {
        date: '日期',
        buyAmount: '投注',
        prizeAmount: '中奖',
        pointAmount: '返点',
        profitAmount: '游戏盈亏',
        rewardsAmount: '活动',
        settlement: '总盈亏'
      },
      otherCommonTableColumn: {
        date: '日期',
        realBuy: '投注',
        profit: '游戏盈亏',
        getpoint: '返点',
        rewards: '活动'
      },

      profitAndLossSummaryData: [],
      personaLotteryData: [],
      otherCommonReportData: [],

      startDate: '',
      endDate: '',

      methodsMap: {
        tab0: 'getPersonalReportSummary',
        tab1: 'getLotteryReportData',
        tab2: 'getOtherReportData',
        tab3: 'getOtherReportData',
        tab4: 'getOtherReportData',
        tab5: 'getOtherReportData',
        tab6: 'getOtherReportData',
        tab7: 'getOtherReportData',
        tab8: 'getOtherReportData'
      },

      gameTypeMap: {
        tab0: 0,
        tab1: 0,
        tab2: 6,
        tab3: 3,
        tab4: 2,
        tab5: 1,
        tab6: 5,
        tab7: 4,
        tab8: 7
      },
      curGameType: 0

    }
  },
  mounted () {
    this.curGameType = this.gameTypeMap['tab' + this.I]
    this[this.methodsMap['tab' + this.I]]()
  },
  methods: {
    __setReportI (i) {
      this.I = i
      this.curGameType = this.gameTypeMap['tab' + this.I]
      this[this.methodsMap['tab' + i]]()
    },
    /**
     * 盈亏汇总数据
     */
    getPersonalReportSummary () {
      let loading = this.$loading({
        text: '盈亏报表加载中...',
        target: this.$el
      }, 10000, '加载超时...')
      this.$http.get(api.personalReport).then(({data: {success, items, totalSize}}) => {
        if (success === 1) {
          if (items.length > 0) {
            this.profitAndLossSummaryData = items.slice(items.length - 1)
          }
        }
      }).finally(() => {
        setTimeout(() => {
          loading.close()
        }, 100)
      })
    },
    /**
     * 彩票报表
     */
    getLotteryReportData (params = {}) {
      let loading = this.$loading({
        text: '盈亏报表加载中...',
        target: this.$el
      }, 10000, '加载超时...')
      let p = {
        userId: this.me.userId,
        pageSize: this.pageSize,
        startDay: dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[-]/g, ''),
        endDay: dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[-]/g, '')
      }
      Object.assign(p, params)
      this.$http.get(api.personList, p).then(({data: {allDate, success}}) => {
        if (success === 1) {
          this.personaLotteryData = allDate
          setTimeout(() => {
            loading.text = '加载成功!'
          }, 100)
        } else {
          loading.text = '加载失败!'
        }
      }, (rep) => {
      }).finally(() => {
        setTimeout(() => {
          loading.close()
        }, 100)
      })
    },
    /**
     * 第三方游戏（体育，真人....）报表
     */
    getOtherReportData (params = {}) {
      let loading = this.$loading({
        text: '盈亏报表加载中...',
        target: this.$el
      }, 10000, '加载超时...')
      let p = {
        scope: 0,
        pageSize: this.pageSize,
        gameType: this.curGameType,
        startDay: dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[-]/g, ''),
        endDay: dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[-]/g, '')
      }
      Object.assign(p, params)
      this.$http.get(api.outerReport, p).then(({data: {items, success}}) => {
        if (success === 1) {
          this.otherCommonReportData = items
          setTimeout(() => {
            loading.text = '加载成功!'
          }, 100)
        } else {
          loading.text = '加载失败!'
        }
      }, (rep) => {
      }).finally(() => {
        setTimeout(() => {
          loading.close()
        }, 100)
      })
    },
    choicedSearchCondition (i, dates) {
      this.stEt = [dates.startDate, dates.endDate]
    },
    search () {
      this[this.methodsMap['tab' + this.I]]()
    },
    pageChanged () {
    }
  }
}
</script>

<style lang="stylus">
.my-report-record
  .scroll-content
    padding: 0 0.2rem;
  .search-bar
    line-height 0.7rem
  .tb-cell
    text-indent 0.2rem;
</style>
