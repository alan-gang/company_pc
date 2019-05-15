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
      el-table.header-bold.nopadding(:data="profitAndLossSummaryData" style="margin: .2rem 0" stripe ref="table")  
        el-table-column(v-bind:prop="k" v-bind:label="v" v-for="(v, k, i) in lotteryTableColumn" v-bind:class-name="i === 0 ? 'pl2' : ''")
    
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

    el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")


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
import SearchConditions from 'components/SearchConditions'
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
      I: 0,
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

      },
      profitAndLossSummaryData: [],
      startDate: '',
      endDate: ''
    }
  },
  mounted () {
    this.getPersonalReport()
  },
  methods: {
    __setReportI (i) {
      this.I = i
      console.log('i=', i)
    },
    getPersonalReport () {
      this.$http.get(api.personalReport).then(({data: {success, items, totalSize}}) => {
        if (success === 1) {
          if (items.length > 0) {
            this.profitAndLossSummaryData = items.slice(items.length - 1)
          }
        }
      }).finally(() => {
        // setTimeout(() => {
        //   loading.close()
        // }, 100)
      })
    },
    choicedSearchCondition (i, dates) {
      this.startDate = dates.startDateStr
      this.endDate = dates.endDateStr
    },
    search () {
      this.list({page: 1, pageSize: this.pageSize, startDate: this.startDate, endDate: this.endDate})
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
