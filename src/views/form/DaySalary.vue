<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      .form.form-filters

        label.item 查询时间范围 
          el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围" v-bind:clearable="clearableOnTime")
        
        label.item 用户名 
          input.ds-input.small(v-model="name" style="width: 1rem")

        .ds-button.primary.large.bold(@click="daySalaryRepor()") 搜索
        //- .buttons(style="margin-left: .9rem")
      
      .table-list(style="padding: .15rem .2rem ")

        p(style="margin: 0 0 .15rem 0")
          el-breadcrumb(separator=">")
            el-breadcrumb-item(v-for="(B, i) in BL" @click.native=" link(B, i) " ) {{ i === 0 ? '自己' : B.userName }}

        el-table.header-bold.nopadding(:data="data" v-bind:row-class-name="tableRowClassName" style="margin: 0 0" @cell-click="cellClick" v-bind:max-height=" MH ")

          el-table-column(class-name="pl2" prop="userName" label="用户名")
            template(scope="scope")
              span.pointer.text-blue(:class=" { 'text-danger': scope.row.userName === me.account } ") {{ scope.row.userName }}

          // el-table-column(prop="date" label="日期")
          el-table-column(prop="buyAmount" label="团队销量" )
          el-table-column(prop="buyAmount" label="有效销量" )
          // el-table-column(prop="activitUser" label="有效用户")
          // el-table-column(prop="salaryLevel" label="工资标准" )
          el-table-column(prop="subSalary" label="下级工资总额" )
          el-table-column(prop="daySalary" label="本人工资" )
          el-table-column(prop="getDaySalary" label="本人已领工资" )
          el-table-column(prop="" label="操作" align="center")
            template(scope="scope")
              .ds-button.text-button.blue(style=" padding: 0 .05rem" @click=" (showDetail = true) && getSalaryById(scope.row.userId) ") 详情
              .ds-button.green.text-button(style=" padding: 0 .05rem" v-if=" scope.row.canGet " @click="goToGift()") 去领取

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
          
            el-table.header-bold.nopadding(:data="cdata" stripe max-height=" 500 " v-bind:row-class-name="tableRowClassName" style="margin: .2rem 0 0 0")

              el-table-column(class-name="pl2" prop="userName" label="用户名")
                template(scope="scope")
                  span.pointer.text-blue(:class=" { 'text-danger': scope.row.userName === me.account } ") {{ scope.row.userName }}

              el-table-column(prop="date" label="日期")
              el-table-column(prop="buyAmount" label="团队销量" )
              el-table-column(prop="buyAmount" label="有效销量" )
              el-table-column(prop="activitUser" label="有效用户")
              el-table-column(prop="salaryLevel" label="工资标准" )
              el-table-column(prop="subSalary" label="下级工资总额" )
              el-table-column(prop="daySalary" label="本人工资" )
              el-table-column(prop="daySalary" label="是否领取" )
                template(scope="scope")

                  span.text-danger(v-if="scope.row.isDone") 已领取
                  span.text-danger(v-if="!scope.row.isDone && !scope.row.canGet ") 未领取
                  span.text-oblue(style="cursor: pointer" v-if=" scope.row.canGet " @click=" goToGift() ") 去领取

</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import { dateFormat } from '../../util/Date'
  import api from '../../http/api'
  import store from '../../store'
  export default {
    mixins: [setTableMaxHeight],
    data () {
      return {
        TH: 280,
        me: store.state.user,
        clearableOnTime: false,
        pickerOptions: {
          shortcuts: [{
            text: '最近3天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近5天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 5)
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近7天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }],
          disabledDate (time) {
            return time.getTime() > (Date.now() - 3600 * 1000 * 24 * 1) || time.getTime() < (Date.now() - 3600 * 1000 * 24 * 30)
          }
        },
        stEt: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 1), new Date(new Date().getTime() - 3600 * 1000 * 24 * 1)],
        data: [{}],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {},
        BL: [
          {title: '自己'},
          {}
        ],
        canGet: false,
        cdata: []
      }
    },
    computed: {
    },
    mounted () {
      this.daySalaryRepor()
    },
    methods: {
      goToGift () {
        setTimeout(() => {
          this.$router.push('/activity/5-1-2')
        }, 0)
      },
      cellClick (row, column, cell, event) {
        if (column.property === 'userName') {
          // this.BL.push({
          //   id: row.userId,
          //   title: row.userName
          // })
          this.daySalaryRepor(undefined, undefined, row.userId)
        }
      },
      link (B, i) {
        // if (i !== B.length - 1) {
          // this.BL = this.BL.slice(0, i + 1)
          // this.daySalaryRepor()
        // }
        this.daySalaryRepor(undefined, undefined, B.userId)
      },
      pageChanged (cp) {
        this.daySalaryRepor(cp, () => {
          this.currentPage = cp
        })
      },
      // 查询日工资（数据要分页）
      // http://192.168.169.161:8080/cagamesclient/report/daySalaryRepor.do?method=list&startDate=20170601&endDate=20170701&page=1&pageSize=10
      daySalaryRepor (page, fn, id) {
        let loading = this.$loading({
          text: '加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        if (!fn) {
          this.preOptions = {
            startDate: dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[-]/g, ''),
            endDate: dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[-]/g, ''),
            page: 1,
            pageSize: this.pageSize,
            userId: id || '',
            userName: this.name
          }
        } else {
          this.preOptions.page = page
        }
        this.$http.get(api.daySalaryRepor, this.preOptions).then(({data}) => {
          // success
          if (data.success === 1) {
            typeof fn === 'function' && fn()
            !fn && (this.currentPage = 1)
            this.BL = (data.userBreads).concat([{}])
            this.total = data.totalSize || this.data.length
            this.data = data.recordList
            this.canGet = data.canGet
            // this.data = data.subUserProfit
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
      getSalaryById (userId) {
        this.cdata = []
        let loading = this.$loading({
          text: '加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.getSalaryById, {
          startDate: dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[-]/g, ''),
          endDate: dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[-]/g, ''),
          destUserId: userId
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.cdata = data.data
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