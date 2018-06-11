<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      
      .form

        div(style="text-align: center; min-height: .2rem" )
          .ds-button-group(v-if="me.role >= 2")
            .ds-button.x-small.text-button(:class=" { selected: type === 0 } " @click=" type = 0 " ) 我的分红
            .ds-button.x-small.text-button(:class=" { selected: type === 1 } " @click=" type = 1 " ) 下级分红
        .form-filters(style="padding: .15rem; margin: 0 0 .2rem 0;")
          label.item 发放日期 
            el-date-picker(:picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="请选择日期时间范围" v-bind:clearable="clearableOnTime")

            
          label.item  &nbsp;状态 
            el-select(v-model="s" clearable style="width: .9rem")
              el-option(v-for="S in STATUS" v-bind:label="S.title" v-bind:value="S.id")

          label.item(v-if="type === 1") 用户名  
            input.ds-input.small(v-model="name" style="width: 1rem")
              
          .ds-button.primary.large.bold(@click="bonus") 搜索

        el-table.header-bold.nopadding(:data="bonusList"  stripe v-bind:max-height=" MH "  v-bind:row-class-name="tableRowClassName")

          el-table-column(class-name="pl2" prop="userName" label="用户名"  v-if="type === 1")

          el-table-column(class-name="pl2" prop="issue" label="分紅期号"  )

          el-table-column(label="总销量")
            template(scope="scope")
              span {{ scope.row.saleAmount }}


          el-table-column(label="总盈亏")
            template(scope="scope")
              span {{ scope.row.profitAmount }}


          el-table-column(prop="actUser" label="活跃人數")


          el-table-column(prop="bounsRate" label="分红比例")
            template(scope="scope")
              span {{ scope.row.bounsRate }}%

          el-table-column(prop="bouns" v-bind:label=" type ? '应发分红' : '应收分红' ")

          el-table-column(prop="status" label="状态")
             template(scope="scope")
              span(:class=" STATUS[scope.row.isDone].css ") {{ STATUS[scope.row.isDone].title }}

          el-table-column(prop="userpoint" label="操作" align="center")
            template(scope="scope")
              .ds-button.text-button.blue(style="padding: 0 .05rem" @click.stop=" (showDetail = scope.row.id)") 查看详情


       
      
        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > pageSize " v-on:current-change="pageChanged")
        
    
    .modal(v-if="showDetail" )
      .mask
      .box-wrapper
        .box(ref="box" style="max-width: 5rem; max-height: 9rem; height: 6.06rem;")
          .tool-bar
            span.title 分红详情
            el-button-group
              el-button.close(icon="close" @click="showDetail = ''")
          StockDetail(v-bind:id=" showDetail " v-bind:myself=" !this.type " style="min-height: 5.7rem;")
      
</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import StockDetail from './StockDetail'
  import api from '../../http/api'
  import store from '../../store'
  import { dateFormat } from '../../util/Date'
  export default {
    mixins: [setTableMaxHeight],
    components: {
      StockDetail
    },
    data () {
      return {
        TH: 250,
        pickerOptions: {
          shortcuts: [{
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
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近六个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起六个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今起一年',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 360)
              picker.$emit('pick', [start, end])
            }
          }]
          // disabledDate (time) {
          //   return time.getTime() > Date.now()
          // }
        },
        defaultStEt: ['', ''],
        stEt: ['', ''],
        me: store.state.user,
        // 0 我的分红
        // 1 下级分红
        type: 0,
        // st: '',
        // et: '',
        // 分红状态
        STATUS: [
          {css: 'text-danger', id: '0', title: '未发放', class: 'waiting-pay'},
          {css: 'text-green', id: 1, title: '已发放', class: 'paid'},
          {css: 'text-oblue', id: 2, title: '待确认', class: 'wait'}
          // {id: 2, title: '已发放', class: 'paid'},
          // {id: 3, title: '平台外已发放', class: 'paid-out'}
        ],
        s: '',
        bonusList: [],
        topBonuList: [],
        topDetailList: [],
        pageSize: 20,
        // pageSize: 5,
        total: 0,
        currentPage: 1,
        preOptions: {},
        showDetail: false,
        name: ''
      }
    },
    computed: {
      apiBonus () {
        return this.me.role <= 2 ? [api.topBonus, api.mySubBouns][this.type] : [api.myBonus, api.mySubBouns][this.type]
      }
    },
    watch: {
      type () {
        this.bonus()
      },
      stEt: {
        deep: true,
        handler () {
          if (!this.stEt) this.stEt = this.defaultStEt
          if (this.stEt[0] && this.stEt[1] && (window.newDate(this.stEt[0])).getTime() === (window.newDate(this.stEt[1])).getTime()) {
            this.stEt[1] = dateFormat((window.newDate(this.stEt[1])).getTime() + 3600 * 1000 * 24 - 1000)
          }
        }
      }
    },
    mounted () {
      this.bonus()
    },
    methods: {
      pageChanged (cp) {
        this.bonus(cp, () => {
          this.currentPage = cp
        })
      },
      expand (row, expanded) {
        if (expanded && !row.topDetailList) {
          this.topBonuDetail(row)
        }
      },
      topBonuDetail (row) {
        let loading = this.$loading({
          text: '分红详情加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.topBonuDetail, {
          issue: row.issue
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.topDetailList = data.topDetailList
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
          this.$message.error('加载失败！')
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      goContractDetail (id) {
        this.$router.push({
          path: '/group/3-3-4',
          query: {id: id}
        })
      },
      goStockDetail (id) {
        this.$router.push({
          path: '/group/3-3-2',
          query: {id: id, self: !this.type}
        })
      },
      __bonus () {
        this.bonus()
      },
      bonus (page, fn) {
        let loading = this.$loading({
          text: '分红加载中...',
          target: this.$el
        }, 10000, '加载超时...')

        if (!fn) {
          this.preOptions = {
            startDate: this.stEt[0] ? dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[\s:-]*/g, '') : '',
            // endDate: this.et ? dateFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
            endDate: this.stEt[1] ? dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[\s:-]*/g, '') : '',
            // startDate: this.st ? dateFormat(this.st.getTime()).replace(/[\s:-]*/g, '') : '',
            // endDate: this.et ? dateFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
            status: this.s,
            page: 1,
            pageSize: this.pageSize,
            userName: this.type === 1 ? this.name : ''
          }
        } else {
          this.preOptions.page = page
        }

        this.$http.get(this.apiBonus, this.preOptions).then(({data}) => {
          // success
          if (data.success === 1) {
            let bonus = data.myBonus || data.mySubBonus
            this.bonusList = bonus
            data.topBonuList && (this.topBonuList = data.topBonuList)

            this.total = data.totalSize || (data.topBonuList || this.bonusList).length
            typeof fn === 'function' && fn()
            !fn && (this.currentPage = 1)
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
          }
          // else loading.text = '加载失败...!'
        }, (rep) => {
          // error
          // this.$message.error('加载失败...！')
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      }
      // 查询我的奖金
      // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=myBonus&startDate=20170101200000&endDate=20170115200000
      // 查询下级奖金
      // http://192.168.169.44:9901/cagamesclient/team/contractBonus.do?method=mySubContract&issue=20170301&sendType=1

    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .stock-list
    top TH
    .form
      padding 0 PWX

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