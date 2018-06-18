<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      .form.form-filters

        label.item 用户 
          input.ds-input.small(v-model="name" style="width: 1rem")

        label.item 平台 
          el-select(clearable v-model="platid" style="width: 1rem" placeholder="全")
            el-option(v-for="(p, i) in PL" v-bind:label="p" v-bind:value="i")
        
        label.item 时间范围 
          el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围" v-bind:clearable="clearableOnTime")


        label.item 范围 
          el-select(clearable v-bind:disabled=" !ZONES[0] "  v-model="zone" style="width: 1rem" placeholder="全")
            el-option(v-for="(U, i) in ZONES" v-bind:label="U" v-bind:value="i")

        //- el-select(v-model="S" placeholder="默认排序")
          el-option(v-for="(F, i) in SS" v-bind:label="F" v-bind:value="i")

        //- | &nbsp;&nbsp;
        
        //- label.item 
          el-select(clearable v-model=" btos " placeholder="默认" style="width: .8rem")
            el-option(v-for="(F, i) in ['升序', '降序']" v-bind:label="F" v-bind:value=" i ")
        
        .buttons(style="margin-left: .3rem")
          .ds-button.primary.large.bold(@click="profitList()") 搜索
        
      
      .table-list(style="padding: .15rem .2rem ")
        //- p(style="margin: 0 0 .15rem 0")
          el-breadcrumb(separator=">")
            el-breadcrumb-item(v-for="(B, i) in BL" @click.native=" link(B, i) " ) {{ i === 0 ? '自己' : B.userName }}
      
        el-table.header-bold.nopadding(:data="data" stripe v-bind:summary-method="getSummaries" @cell-click="cellClick" v-bind:row-class-name="tableRowClassName" style="margin: 0 0 0 0" v-bind:max-height=" MH " )

          el-table-column(class-name="pl2" prop="username" label="用户名" )

          el-table-column(prop="platName" label="平台" align="center")


          el-table-column(align="right" prop="buyamount" label="投注总额" )
            template(scope="scope")
              span {{ numberWithCommas(scope.row.buyamount) }}


          el-table-column(align="right" prop="prizeamount" label="奖金" )
            template(scope="scope")
              span {{ numberWithCommas(scope.row.prizeamount) }}


          el-table-column(align="right" prop="settlement" label="盈亏"  class-name="pr2")
            template(scope="scope")
              span {{ numberWithCommas(scope.row.settlement) }}

          //- el-table-column(prop="userpoint" label="操作" align="center")
            template(scope="scope")
              .ds-button.text-button.blue(v-if="!scope.row.lst" style="padding: 0 .05rem" @click.stop="(showDetail = true) && profitDetail(scope.row.userId)") 明细

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")
    
    .modal(v-show="showDetail" )
      .mask
      .box-wrapper
        .box(ref="box" style="width: 10rem; max-height: 9rem; height: 6.06rem;")
          .tool-bar
            span.title 明细
            el-button-group
              el-button.close(icon="close" @click="showDetail = ''")
          .table-list(style="padding: .15rem .2rem ")
          
            el-table.header-bold.nopadding(:data="cdata" stripe   v-bind:summary-method="getSummaries"  max-height="500" v-bind:row-class-name="tableRowClassName" style="margin: .2rem 0 0 0")

              el-table-column(class-name="pl2" prop="userName" label="用户名" )
                template(scope="scope")
                  span.pointer.text-blue(:class=" { 'text-danger': scope.row.userName === me.account } ") {{ scope.row.userName }}
      
              el-table-column(prop="date" label="日期" align="center")

              el-table-column(align="right" prop="saveAmount" label="充值总额" )
                template(scope="scope")
                  span {{ numberWithCommas(scope.row.saveAmount) }}

              el-table-column(align="right" prop="withdrawAmount" label="提款总额" )
                template(scope="scope")
                  span {{ numberWithCommas(scope.row.withdrawAmount) }}


              el-table-column(align="right" prop="buyAmount" label="投注总额" )
                template(scope="scope")
                  span {{ numberWithCommas(scope.row.buyAmount) }}


              el-table-column(align="right" prop="prizeAmount" label="派奖总额" )
                template(scope="scope")
                  span {{ numberWithCommas(scope.row.prizeAmount) }}

              el-table-column(align="right" prop="rewardsAmount" label="活动")
                template(scope="scope")
                  span {{ numberWithCommas(scope.row.rewardsAmount) }}

              el-table-column(align="right" prop="salaryAmount" label="工资")
                template(scope="scope")
                  span {{ numberWithCommas(scope.row.salaryAmount) }}


              el-table-column(align="right" prop="profitAmount" label="盈亏"  )
                template(scope="scope")
                  span {{ numberWithCommas(scope.row.profitAmount) }}

              el-table-column(align="right" prop="outProfitAmount" label="其它盈亏"  )
                template(scope="scope")
                  span {{ numberWithCommas(scope.row.outProfitAmount) }}

              el-table-column(align="right" prop="settlement" label="总结算" class-name="pr2" )
                template(scope="scope")
                  span {{ numberWithCommas(scope.row.settlement) }}
</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import ProfitLossDetail from './ProfitLossDetail'
  import { numberWithCommas } from '../../util/Number'
  import { dateFormat } from '../../util/Date'
  import api from '../../http/api'
  import store from '../../store'
  export default {
    mixins: [setTableMaxHeight],
    components: {
      ProfitLossDetail
    },
    data () {
      return {
        TH: 270,
        numberWithCommas: numberWithCommas,
        me: store.state.user,
        clearableOnTime: false,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 89)
              picker.$emit('pick', [start, end])
            }
          }],
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        stEt: [new Date(new Date().getTime() - 3600 * 1000 * 24).getDate() < 16 ? ((new Date(new Date().getTime() - 3600 * 1000 * 24)).setDate(1)) : ((new Date(new Date().getTime() - 3600 * 1000 * 24)).setDate(16)), new Date(new Date().getTime() - 3600 * 1000 * 24)],
        data: [{}],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {},
        BL: [
          {title: '自己'},
          {}
        ],
        // 平台
        PL: ['BG', '体育'],
        platid: '',
        ZONES: ['直接下级', '所有下级'],
        zone: '',
        name: '',
        SS: ['投注总额', '盈亏金额', '工资总额', '返点级别'],
        S: '',
        btos: '',
        cdata: [],
        totalJson: {}
      }
    },
    computed: {
    },
    mounted () {
      this.profitList()
    },
    methods: {
      getSummaries (param) {
        const { columns } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计'
            return
          } else {
            sums[index] = numberWithCommas(this.totalJson[column.property])
          }
        })
        return sums
      },
      pageChanged (cp) {
        this.profitList(cp, () => {
          this.currentPage = cp
        })
      },
      cellClick (row, column, cell, event) {
        if (column.property === 'userName') {
          // this.BL.push({
          //   id: row.userId,
          //   title: row.userName
          // })
          this.profitList(undefined, undefined, row.userId)
        }
      },
      link (B, i) {
        // if (i !== B.length - 1) {
          // this.BL = this.BL.slice(0, i + 1)
          // this.profitList()
        // }
        this.profitList(undefined, undefined, B.userId)
      },
      summary () {
        let s = {
          last: true,
          userName: '小结：',
          salaryAmount: 0,
          saveAmount: 0,
          withdrawAmount: 0,
          buyAmount: 0,
          pointAmount: 0,
          prizeAmount: 0,
          profitAmount: 0
        }
        this.data.forEach(d => {
          s.salaryAmount += parseInt(d.salaryAmount) || 0
          s.saveAmount += parseInt(d.saveAmount) || 0
          s.withdrawAmount += parseInt(d.withdrawAmount) || 0
          s.buyAmount += parseInt(d.buyAmount) || 0
          s.pointAmount += parseInt(d.pointAmount) || 0
          s.prizeAmount += parseInt(d.prizeAmount) || 0
          s.profitAmount += parseInt(d.profitAmount) || 0
        })
        this.data[0] && this.data.push(s)
      },
      // 盈亏报表列表
      // http://192.168.169.44:9901/cagamesclient/report/profit.do?method=list&startDay=20170101&endDay=20170301
      // profitList: api + 'report/profit.do?method=list',
      // api.getTeamProfit
      profitList (page, fn, id) {
        let loading = this.$loading({
          text: '加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        if (!fn) {
          this.preOptions = {
            beginDate: dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[-]/g, ''),
            endDate: dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[-]/g, ''),
            // userId: id || this.BL[this.BL.length - 2].userId,
            scope: this.zone !== '' ? this.zone + 1 : '',
            userName: this.name,
            platid: this.platid !== '' ? this.platid + 2 : '',
            page: 1,
            pageSize: this.pageSize
          }
        } else {
          this.preOptions.page = page
        }
        this.$http.myget(api.outReportList, this.preOptions).then(({data}) => {
          // success
          if (data.success === 1) {
            // this.totalJson = data.totalJson
            // data.pageTotalJson.lst = true
            // data.pageNum > 1 && data.allDate.push(data.pageTotalJson)
            this.data = data.items
            // this.BL = (data.userBreads).concat([{}])
            this.total = data.totalSize || this.data.length
            typeof fn === 'function' && fn()
            !fn && (this.currentPage = 1)
            // this.data = data.subUserProfit
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
            // this.summary()
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      goProfitLossDetail (userId) {
        this.$router.push({
          path: '/form/4-5-4',
          query: {
            st: (window.newDate(this.stEt[0])).getTime(),
            et: (window.newDate(this.stEt[1])).getTime(),
            userId: userId
          }
        })
      },
      // 盈亏详情列表（按用户和时间范围查询）
      // http://192.168.169.44:9901/cagamesclient/report/profit.do?method=detail&destUserId=2&startDay=20170101&endDay=20170301
      // profitDetail: api + 'report/profit.do?method=detail',
      profitDetail (userId) {
        this.cdata = []
        let loading = this.$loading({
          text: '加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.myget(api.profitDetail, {
          startDay: dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[-]/g, ''),
          endDay: dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[-]/g, ''),
          destUserId: userId
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.cdata = data.allDate
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      tableRowClassName (row) {
        if (this.me.account === row.userName) return 'text-danger'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .stock-list
    top TH
    .form
      padding PWX

  .item
    display inline-block
    margin 0 PW .1rem 0

    
  .el-select
  .el-input-number
    width 1rem

</style>


<style lang="stylus" scoped>

  @import '../../var.stylus'

  bg = #d8d8d8
  bg-hover = #ececec
  bg-active = #e2e2e2
  .tool-bar
    height TH
    line-height TH 
    background-color bg
    font-size .12rem
    border-top-right-radius .05rem
    border-top-left-radius .05rem
    overflow hidden
    background-position .2rem center

  .title
    color #333
    font-weight bold
    padding-left .2rem

  .el-button-group
    float right
    height 100%
    .el-button
      font-size .12rem
      color GREY
      border none
      height 100%
      width TH
      padding 0
      background-color transparent
      &:hover
        background-color bg-hover
      &:active
        background-color bg-active
      &:first-child
        font-size .16rem
      &.close
        &:hover
          background-color #f34
          color #fff
        &:active
          color #fff
          background-color #d40c1d

  .modal 
    position absolute
    top TH
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
      background-color #ededed
      font-size .12rem
      width 9rem
      radius()
    .content
      margin 0 .2rem
      .el-row
        margin PW 0
        word-wrap break-word
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