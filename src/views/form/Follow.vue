<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .user-list.scroll-content

      .form
        label.item 追号时间 
          el-date-picker(:picker-options="pickerOptions" v-model="stEt" type="datetimerange" placeholder="请选择日期时间范围" v-bind:clearable="clearableOnTime")

        // label.item 追号时间 
        //   el-date-picker(v-model="st" type="datetime" placeholder="请选择日期时间")
        //   |  至 
        //   el-date-picker(v-model="et" type="datetime" placeholder="请选择日期时间")

        // label.item 状态 
        //   el-select(clearable v-bind:disabled=" !STATUS[0] " placeholder="全" v-model="status" style="width: .8rem")
        //     el-option(v-for="(S, i) in STATUS" v-bind:label="S" v-bind:value="i")

        label.item 奖金 
          el-select(clearable v-bind:disabled=" !ISFREE[0] " placeholder="全" v-model="isFree" style="width: .8rem")
            el-option(v-for="(S, i) in ISFREE" v-bind:label="S" v-bind:value="i")

        label.item 游戏名称 
          el-select(clearable v-bind:disabled=" !gameList[0] " placeholder="全" v-model="gameid" style="width: 1.5rem")
            el-option(v-for="U in gameList" v-bind:label="U.cnName" v-bind:value="U.lotteryId")

        label.item 游戏玩法 
          el-select(clearable v-bind:disabled=" !methodList[0] " placeholder="全" v-model="method" style="width: 1.5rem")
            el-option(v-for="U in methodList" v-bind:label="U.methodName" v-bind:value="U")

        label.item 游戏奖期 
          el-select(clearable v-bind:disabled=" !issueList[0] " placeholder="全" v-model="issue" style="width: 1.5rem" filterable)
            el-option(v-for="U in issueList" v-bind:label="U.issue" v-bind:value="U.issue")

        label.item 游戏模式 
          el-select(clearable v-bind:disabled=" !MODES[0] " placeholder="全" v-model="mode" style="width: .6rem")
            el-option(v-for="(U, i) in MODES" v-bind:label="U" v-bind:value="i")

        label.item 追号编号 
          el-input(v-model="id" style="width: 1rem")

        label.item 游戏用户 
          input.ds-input.small(v-model="name" style="width: 1rem")

        label.item 范围 
          el-select(clearable v-bind:disabled=" !ZONES[0] " placeholder="全" v-model="zone" style="width: 1rem")
            el-option(v-for="(U, i) in ZONES" v-bind:label="U" v-bind:value="i")


        .buttons(style="margin-left: .6rem")
          .ds-button.primary.large.bold(@click="followList()") 搜索
          .ds-button.cancel.large(@click="clear(true)") 清空
      
      .table-list(style="padding: .15rem .2rem ")
      
        el-table.header-bold.nopadding(:data="Cdata" v-bind:row-class-name="tableRowClassName" v-on:row-click="setSelected" style="margin-top: .1rem")

          el-table-column(label="追号编号" width="100" )
            template(scope="scope")
              div
                .ds-button.text-button.blue(v-if="!scope.row.last" style="padding: 0" @click.stop=" platform === 'ds' ? (showFollow = scope.row.taskId) : goFollowDetail(scope.row.taskId)  ") {{ scope.row.taskId }}
                span(v-if="scope.row.last" style="padding: 0") {{ scope.row.entry }}

          el-table-column(prop="userName" label="用户" width="80")
          
          el-table-column(prop="beginTime" label="追号时间" width="140" )
            template(scope="scope")
              span(v-if="!scope.row.last") {{ scope.row.beginTime }}
              span.text-blue(v-if="scope.row.last") {{ scope.row.expenditure }}

          el-table-column(prop="lotteryName" label="游戏" width="100" )

          el-table-column(prop="methodName" label="玩法" min-width="100" )
            template(scope="scope")
              div(v-if="!scope.row.last") {{ scope.row.methodName }}（{{ scope.row.codeType === 1 ? '复式' : '单式'}}）

          el-table-column(prop="beginIssue" label="开始期数" width="100" )

          el-table-column(class-name="pl2" prop="issuecount" label="追号期数" align="right" width="80")

          el-table-column(prop="finishedcount" label="完成期数" width="80" align="right")

          el-table-column(class-name="pl2"  prop="codes" label="追号内容"  min-width="140" show-overflow-tooltip=true)

          el-table-column(class-name="pl1" prop="modes" label="模式" width="50" )
            template(scope="scope")
              span {{ MODES[scope.row.modes - 1] }}            

          el-table-column(prop="taskprice" label="总金额" width="100" align="right")
            template(scope="scope")
              span(v-if="!scope.row.last") {{ scope.row.taskprice }}
              span.text-danger(v-if="scope.row.last") {{ scope.row.expectCost }}

          el-table-column(prop="finishprice" label="完成金额" width="100" align="right")
            template(scope="scope")
              span(v-if="!scope.row.last") {{ scope.row.finishprice }}
              span.text-danger(v-if="scope.row.last") {{ scope.row.expenditure }}

          el-table-column(class-name="pl2"   label="状态" width="100")
            template(scope="scope")
              span(:class="{ 'text-green': scope.row.status === 0, 'text-grey': scope.row.status === 2, 'text-danger': scope.row.status === 1}") {{ STATUS[scope.row.status] }}
         

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")
      

    .modal(v-show="showFollow" )
      .mask
      .box-wrapper
        .box(ref="box" style="width: 10rem; max-height: 9rem; height: 6.06rem;")
          .tool-bar
            span.title 追号详情
            el-button-group
              el-button.close(icon="close" @click="showFollow = ''")
          Follow.followDetail-page(v-bind:id=" showFollow " style="min-height: 5.7rem")
</template>

<script>
  import Follow from './FollowDetail'
  import { digitUppercase } from '../../util/Number'
  import { dateTimeFormat } from '../../util/Date'
  import api from '../../http/api'
  // import util from '../../util'
  export default {
    components: {
      Follow
    },
    data () {
      return {
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
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }],
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        // stEt: [dateTimeFormat(new Date().getTime() - 3600 * 1000 * 24 * 7), dateTimeFormat(new Date().getTime())],
        defaultStEt: ['', ''],
        stEt: ['', ''],
        // st: '',
        // et: '',
        STATUS: ['进行中', '取消', '已完成'],
        status: '',
        ISFREE: ['现金', '优惠券'],
        isFree: '',
        gameList: [],
        gameid: '',
        methodList: [],
        method: '',
        issueList: [],
        issue: '',
        MODES: ['元', '角', '分', '厘'],
        mode: '',
        id: '',
        name: '',
        ZONES: ['自己', '直接下级', '所有下级'],
        zone: '',
        data: [{}],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {},
        // modal
        show: false,
        type: 0,
        row: {},
        modalTitles: ['投注详情', '发起跟单', '撤销'],
        // 用户级别
        UL: [
          {id: 1, title: '代理用户'},
          {id: 2, title: '会员用户'}
        ],
        u: {},
        user: {name: 'it001', game: '美国时时彩'},
        amount: [{}],
        Cdata: [],
        showFollow: ''
      }
    },
    computed: {
      textMoney () {
        return digitUppercase(this.money)
      }
      // Cdata () {
      //   if (this.data.length <= this.pageSize) return this.data
      //   else {
      //     return util.groupArray(this.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage), this.pageSize, {_empty: true})[0]
      //   }
      // }
    },
    watch: {
      '$route': 'openRoute',
      gameid () {
        this.getMethods()
        this.getRecentIssueList()
      },
      stEt: {
        deep: true,
        handler () {
          if (!this.stEt[0] && !this.stEt[1]) this.stEt = this.defaultStEt
          if ((window.newDate(this.stEt[0])).getTime() === (window.newDate(this.stEt[1])).getTime()) {
            this.stEt[1] = new Date((window.newDate(this.stEt[1])).getTime() + 3600 * 1000 * 24 - 1000)
          }
        }
      }
    },
    mounted () {
      this.getLotterys()
      this.$route.query.gameid && (this.gameid = this.$route.query.gameid)
      this.followList()
    },
    methods: {
      openRoute ({path, query: {gameid}}) {
        if (path !== '/form/4-2-1') return false
        if (gameid && gameid !== this.gameid) {
          this.gameid = gameid
          this.followList()
        }
      },
      summary () {
        this.amount[0].income = 0
        this.amount[0].expectCost = 0
        this.amount[0].expenditure = 0
        this.amount[0].difMoney = 0
        this.Cdata.forEach(d => {
          this.amount[0].expectCost += d.taskprice
          this.amount[0].expenditure += d.finishprice
        })
        this.amount[0].difMoney = this.amount[0].income - this.amount[0].expenditure
        this.amount[0].income = this.amount[0].income.toFixed(3)
        this.amount[0].expenditure = this.amount[0].expenditure.toFixed(3)
        this.amount[0].difMoney = this.amount[0].difMoney.toFixed(3)
        if (!this.amount[0].difMoney.startsWith('-')) this.amount[0].difMoney = '+' + this.amount[0].difMoney
        this.Cdata[0] && this.Cdata.push({
          last: true,
          difMoney: this.amount[0].difMoney,
          entry: '小结：',
          userName: '本页变动金额',
          times: '',
          title: '',
          lotteryName: '',
          methodName: '',
          issue: '',
          modes: '',
          income: '+' + this.amount[0].income,
          expectCost: '-' + this.amount[0].expectCost,
          expenditure: '-' + this.amount[0].expenditure,
          balance: ''
        })
      },
      tableRowClassName (row, index) {
        if (row.selected) return 'selected-row'
      },
      setSelected (row) {
        this.$set(row, 'selected', !row.selected)
        // row.selected = !row.selected
      },
      goFollowDetail (id) {
        this.$router.push({
          path: '/form/4-2-2',
          query: {
            id: id
          }
        })
      },
      pageChanged (cp) {
        this.followList(cp, () => {
          this.currentPage = cp
        })
      },
      clear (a) {
        // this.st = ''
        // this.et = ''
        this.stEt = this.defaultStEt
        this.status = ''
        this.isFree = ''
        this.gameid = ''
        this.method = {}
        this.issue = ''
        this.mode = ''
        this.id = ''
        this.name = ''
        this.zone = ''
        a && this.followList()
      },
      cancel () {
        let loading = this.$loading({
          text: '撤单中...',
          target: this.$el
        }, 10000, '撤单超时...')
        this.$http.get(api.cancel, {id: this.row.projectId}).then(({data}) => {
          // success
          if (data.success === 1) {
            setTimeout(() => {
              loading.text = '撤单成功!'
            }, 100)
          } else loading.text = '撤单失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      followList (page, fn) {
        let loading = this.$loading({
          text: '追号记录加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        if (!fn) {
          this.preOptions = {
            projectId: this.id,
            // beginDate: this.st ? dateTimeFormat(this.st.getTime()).replace(/[\s:-]*/g, '') : '',
            // endDate: this.et ? dateTimeFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
            // beginDate: this.st ? dateTimeFormat(this.st.getTime()).replace(/[\s:-]*/g, '') : '',
            beginDate: this.stEt[0] ? dateTimeFormat(this.stEt[0]).replace(/[\s:-]*/g, '') : '',
            // endDate: this.et ? dateTimeFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
            endDate: this.stEt[1] ? dateTimeFormat(this.stEt[1]).replace(/[\s:-]*/g, '') : '',
            // stat: this.status,
            isFree: this.isFree,
            userName: this.name,
            scope: this.zone,
            lotteryId: this.gameid,
            methodId: this.method.methodId,
            issue: this.issue,
            modes: this.mode !== '' ? this.mode + 1 : '',
            page: 1,
            pageSize: this.pageSize
          }
        } else {
          this.preOptions.page = page
        }
        this.$http.post(api.followList, this.preOptions).then(({data}) => {
          // success
          if (data.success === 1) {
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
            typeof fn === 'function' && fn()
            this.Cdata = data.taskList
            this.total = data.totalSize || this.data.length
            this.summary()
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      },
      getLotterys () {
        this.$http.get(api.getLotterys).then(({data}) => {
          // success
          if (data.success === 1) {
            this.gameList = data.lotteryList
          }
        }, (rep) => {
          // error
        })
      },
      getMethods () {
        this.$http.get(api.getMethods, {lotteryId: this.gameid}).then(({data}) => {
          // success
          if (data.success === 1) {
            this.methodList = data.methodList
          } else {
            this.methodList = []
            this.method = {}
          }
        }, (rep) => {
          // error
        })
      },
      getRecentIssueList () {
        this.$http.get(api.getRecentIssueList, {lotteryId: this.gameid, issCount: 30}).then(({data}) => {
          // success
          if (data.success === 1) {
            this.issueList = data.issueList
          } else {
            this.issueList = []
            this.issue = ''
          }
        }, (rep) => {
          // error
        })
      }
      // 追号列表
      // http://192.168.169.44:9901/cagamesclient/report/taskBuy.do?method=list&beginDate=20170201000000&endDate=20170303000000&isFree=0&userName=test&scope=0&lotteryId=1&methodId=14&issue=170216085&modes=1&projectId=120
      // followList: api + 'report/taskBuy.do?method=list',
      // 根据追号号查看追号详情
      // ttp://192.168.169.44:9901/cagamesclient/report/taskBuy.do?method=detail&projectId=120
      // followDetail: api + 'report/taskBuy.do?method=detail',
      // 在追号详情页面，取消追号（没有）
      // http://192.168.169.44:9901/cagamesclient/booking.do?method=cancel&id=1304
      // followCancel: api + 'booking.do?method=cancel',
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .user-list
    top TH
    .form
      padding PWX

  .item
    display inline-block
    margin 0 PW .1rem 0

    
  .el-select
  .el-input-number
    width 1.2rem
  .el-select
    position relative
    top .01rem

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
