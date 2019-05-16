<template lang="jade">
.my-report-record
  slot(name="cover")
  slot(name="movebar")
  slot(name="resize-x")
  slot(name="resize-y")
  slot(name="toolbar")
  .scroll-content
    .search-bar.pl20
        span.date-wp
          SearchConditions(@choiced="choicedSearchCondition" v-show=" [0].indexOf(I) == -1 ")
        
        label.item.ml10 查询范围 
          el-select(clearable v-model="range" style="width: 1.2rem" popper-class="search-range-slt")
            el-option(v-for="(o, i) in searchRange" v-bind:label="o" v-bind:value="i")

        label.item.ml10 用户&nbsp;
          //- input.ds-input.small(v-model="subUserName" style="width: 1rem")
          el-autocomplete(
            class="inline-input uname-ipt"
            v-model="subUserName"
            v-bind:fetch-suggestions="querySearchName"
            placeholder="请输入用户名"
            v-bind:maxlength="12"
            v-bind:clearable="true"
            v-on:select="handleSelectName"
          )

        .ds-button.primary.large.bold.ml10(@click="search()") 搜索

    template(v-if=" I === 0 ")
      el-table.header-bold.nopadding(:data="profitAndLossSummaryData" style="margin: .2rem 0" stripe ref="table")  
        el-table-column(v-bind:prop="k" v-bind:label="v" v-for="(v, k, i) in profitAndLossSummaryTableColumn" v-bind:class-name="i === 0 ? 'pl2' : ''")

        el-table-column(label="操作")
          template(slot-scope="scope")
            el-button(type="text" size="small" @click="viewHighterLevel(scope.row)") 查看上级
            el-button(type="text" size="small" @click="viewDailyProfitDetail(scope.row)") 每日明细
      

    template(v-if=" [1, 2, 3, 4, 5, 6, 7, 8].indexOf(I) !== -1 ")
      el-table.header-bold.nopadding(:data="otherCommonReportData" style="margin: .2rem 0" stripe ref="table")  
        el-table-column(v-bind:prop="k" v-bind:label="v" v-for="(v, k, i) in otherCommonTableColumn" v-bind:class-name="i === 0 ? 'pl2' : ''")

        el-table-column(label="操作" )
          template(slot-scope="scope")
            el-button(type="text" size="small" @click="viewHighterLevel(scope.row)") 查看上级
            el-button(type="text" size="small" @click="viewDailyProfitDetail(scope.row)") 每日明细
    
    el-pagination(:total="totalSize" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="curPage" small v-if=" totalSize > 20 " v-on:current-change="pageChanged")
    
    el-dialog(custom-class="higher-level-breaks-dialog" v-bind:visible.sync="isShowHigherLevelDialog" center v-bind:modal="false" )
      .higher-level-breaks
        el-breadcrumb(separator-class="el-icon-arrow-right" separator=">")
          el-breadcrumb-item(v-for="(info, i) in higherLevelUserBreads") {{info.userName}}
        .ds-button.primary.large.bold.ml10(@click="isShowHigherLevelDialog = false") 确定
    
    el-dialog(custom-class="daily-profit-dialog" v-bind:visible.sync="isShowDailyProfitDialog" center v-bind:modal="false" )
      span(slot="title") 每日明细
      .daily-profit-dialog-ctx
        .info-header 每日明细-{{}}(个人)
        el-table.header-bold.nopadding(:data="profitAndLossSummaryData" style="margin: .2rem 0" stripe ref="table-daily-profit") 
          el-table-column(label="时间")
</template>

<script>
import api from 'src/http/api'
import { dateFormat, dateTimeFormat } from '../../util/Date'
import SearchConditions from 'components/SearchConditions'
import store from '../../store'
export default {
  components: {
    SearchConditions
  },
  name: 'my-game-record',
  props: ['menus'],
  data () {
    return {
      me: store.state.user,
      userId: '',
      I: 0,
      stEt: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date(new Date().getTime())],
      pageSize: 20,
      curPage: 1,
      totalSize: 0,

      range: 0,
      searchRange: ['所有下级', '直接下级', '间接下级'],

      profitAndLossSummaryTableColumn: {
        date: '时间',
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
      otherCommonTableColumn: {
        userName: '用户名',
        buy: '投注',
        gameProfit: '游戏盈亏',
        totalProfit: '总盈亏'
      },

      profitAndLossSummaryData: [],
      otherCommonReportData: [],

      startDate: '',
      endDate: '',
      subUserName: '',
      gameTypeMap: {
        tab0: -1,
        tab1: 0,
        tab2: 6,
        tab3: 3,
        tab4: 2,
        tab5: 1,
        tab6: 5,
        tab7: 4,
        tab8: 7
      },
      curGameType: -1,

      names: [],
      higherLevelUserBreads: [],
      isShowHigherLevelDialog: false,
      isShowDailyProfitDialog: false

    }
  },
  mounted () {
    this.userId = this.me.userId
    this.curGameType = this.gameTypeMap['tab' + this.I]
    this.getPersonalReport()
  },
  methods: {
    __setReportI (i) {
      this.I = i
      this.curGameType = this.gameTypeMap['tab' + this.I]
      this.getPersonalReport()
    },
    /**
     * 盈亏汇总数据
     */
    getPersonalReport (params = {}) {
      let loading = this.$loading({
        text: '盈亏报表加载中...',
        target: this.$el
      }, 10000, '加载超时...')
      let p = {
        gameType: this.curGameType,
        userId: this.userId,
        page: this.curPage,
        pageSize: this.pageSize,
        scope: this.range === '' ? 0 : this.range,
        beginDate: dateTimeFormat(this.stEt[0]).split(' ')[0],
        endDate: dateTimeFormat(this.stEt[1]).split(' ')[0],
        username: this.subUserName
      }
      Object.assign(p, params)
      this.setNameHistory(p.username)
      this.$http.get(api.subPersonalProfit, p).then(({data: {success, items, totalSize}}) => {
        if (success === 1) {
          if (items.length > 0) {
            items[items.length - 1].date = '赢亏汇总'
            if (this.I === 0) {
              this.profitAndLossSummaryData = items // items.slice(items.length - 1)
            } else {
              this.otherCommonReportData = items
              this.totalSize = totalSize
            }
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
    getUserBread (userId) {
      let loading = this.$loading({
        text: '加载中...',
        target: this.$el
      }, 10000, '加载超时...')
      this.$http.get(api.getUserBread, {userId}).then(({data: {userBreads, success}}) => {
        if (success === 1) {
          // let msg = ``
          this.higherLevelUserBreads = userBreads
          this.isShowHigherLevelDialog = true
          // this.$modal.confirm({
          //   title: '',
          //   boxStyle: {
          //     width: '580px'
          //   },
          //   content: '<pre class="text-666" style="text-align: left;">' + userBreads + '</pre>',
          //   btn: ['知道了'],
          //   ok () {
          //   },
          //   close () {
          //   },
          //   O: this
          // })
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
      this.getPersonalReport()
    },
    pageChanged (p) {
      this.curPage = p
      this.getPersonalReport()
    },
    querySearchName (name, cb) {
      let rs = name ? this.names.filter((n) => {
        return n.value.indexOf(name) === 0
      }) : this.names
      cb(rs)
    },
    handleSelectName (item) {
      console.log(item)
    },
    setNameHistory (name) {
      if (!name || this.names.filter((n) => n.value.indexOf(name) === 0).length > 0) return
      this.names.push({value: name, address: name})
      if (this.names.length > 3) this.names.shift()
    },
    viewHighterLevel (row) {
      console.log('row=', row)
      this.getUserBread(row.userId)
    },
    viewDailyProfitDetail (row) {
      this.isShowDailyProfitDialog = true
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
  .date-wp
    display inline-block
  .uname-ipt
    width 1.3rem
  .higher-level-breaks
    text-align center
    background #fff
    padding 0.5rem 0.2rem
    .el-breadcrumb
      margin-bottom 0.2rem
      text-align center
    .el-breadcrumb__item
      float none
  .higher-level-breaks-dialog
    width 4.5rem
    .el-dialog__header
      background #fff

  .daily-profit-dialog
    background #fff
    .daily-profit-dialog-ctx
      padding 0.2rem
    .info-header
      background-color #2d86ea
      color #fff
      line-height 0.36rem
      text-align center
</style>
<style lang="stylus">
.search-range-slt
  &.el-select-dropdown
    background-color #fff
    .el-select-dropdown__item.selected, 
    .el-select-dropdown__item.hover
      color #48576a
      background-color #e4e8f1
    .el-select-dropdown__item
      color #48576a
</style>