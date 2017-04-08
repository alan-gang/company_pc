<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .user-list.scroll-content

      .form
        
        label.item 游戏时间 
          el-date-picker(v-model="st" type="datetime" placeholder="请选择日期时间")
          |  至 
          el-date-picker(v-model="et" type="datetime" placeholder="请选择日期时间")

        label.item 状态 
          el-select(clearable v-bind:disabled=" !STATUS[0] "  v-model="status" style="width: .8rem" placeholder="全")
            el-option(v-for="(S, i) in STATUS" v-bind:label="S" v-bind:value="i")

        label.item 奖金 
          el-select(clearable v-bind:disabled=" !ISFREE[0] "  v-model="isFree" style="width: .8rem" placeholder="全")
            el-option(v-for="(S, i) in ISFREE" v-bind:label="S" v-bind:value="i")

        label.item 游戏名称 
          el-select(clearable v-bind:disabled=" !gameList[0] "  v-model="gameid" style="width: 1.5rem" placeholder="全")
            el-option(v-for="U in gameList" v-bind:label="U.cnName" v-bind:value="U.lotteryId")

        label.item 游戏玩法 
          el-select(clearable v-bind:disabled=" !methodList[0] "  v-model="method" style="width: 1.5rem" placeholder="全")
            el-option(v-for="U in methodList" v-bind:label="U.methodName" v-bind:value="U")

        label.item 游戏奖期 
          el-select(clearable v-bind:disabled=" !issueList[0] "  v-model="issue" style="width: 1.5rem" filterable placeholder="全")
            el-option(v-for="U in issueList" v-bind:label="U.issue" v-bind:value="U.issue")

        label.item 游戏模式 
          el-select(clearable v-bind:disabled=" !MODES[0] "  v-model="mode" style="width: .5rem" placeholder="全")
            el-option(v-for="(U, i) in MODES" v-bind:label="U" v-bind:value="i")

        label.item 注单编号 
          el-input(v-model="id" style="width: 1rem")

        label.item 游戏用户 
          input.ds-input.small(v-model="name" style="width: 1rem")

        label.item 范围 
          el-select(clearable v-bind:disabled=" !ZONES[0] "  v-model="zone" style="width: .8rem" placeholder="全")
            el-option(v-for="(U, i) in ZONES" v-bind:label="U" v-bind:value="i")


        .buttons(style="margin-left: .6rem")
          .ds-button.primary.large.bold(@click="Orderlist") 搜索
          .ds-button.cancel.large(@click="clear") 清空

        el-table.header-bold.nopadding(:data="Cdata" v-bind:row-class-name="tableRowClassName" v-on:row-click="setSelected" style="margin-top: .1rem")

          el-table-column(prop="projectId" label="注单编号" width="80" )
            template(scope="scope")
              .ds-button.text-button.blue(style="padding: 0" @click="(row = scope.row) && (show = true) && (type = 0) ") {{ scope.row.projectId }}

          el-table-column(prop="nickName" label="用户" width="80")
          
          el-table-column(prop="writeTime" label="投注时间" width="140")

          el-table-column(prop="lotteryName" label="游戏" width="100")

          el-table-column(prop="methodName" label="玩法" width="100")

          el-table-column(prop="issue" label="期号" width="100")

          el-table-column(prop="code" label="投注内容" width="120")

          el-table-column(prop="multiple" label="倍数" width="40" align="right")

          el-table-column(class-name="pl1" prop="modes" label="模式" width="60")
            template(scope="scope")
                span {{ MODES[scope.row.modes - 1] }}     

          el-table-column(prop="totalPrice" label="总金额" width="80" align="right")

          el-table-column(prop="bonus" label="奖金" width="80" align="right")

          el-table-column(class-name="pl2" prop="prizeCode" label="开奖号码" width="80")

          el-table-column(label="状态" width="60")
            template(scope="scope")
              span(:class="{ 'text-danger': scope.row.stat === 3,  'text-grey': scope.row.stat === 0, 'text-green': scope.row.stat === 2, 'text-black': scope.row.stat === 1}") {{ STATUS[scope.row.stat] }}
          el-table-column(label="操作")
            template(scope="scope")
              div(v-if="scope.row.stat === 0 ")
                .ds-button.text-button.blue(style="padding: 0 .05rem" @click="(row = scope.row) && (show = true) && (type = 1) ") 发起跟单
                .ds-button.text-button.blue(style="padding: 0 .05rem" @click="(row = scope.row) && (show = true) && (type = 2) ") 撤消

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")

      
    .modal(v-show="show" )
      .mask
      .box-wrapper
        .box
          .tool-bar
            span.title {{ modalTitles[type] }}
            el-button-group
              el-button.close(icon="close" @click="show = false")
          .content
            el-row
              el-col(:span="9")
                游戏用户：
                span(style="color: #333") {{ row.nickName }}
              el-col(:span="5")
                游戏：
                span(style="color: #333") {{ row.lotteryName }}
              el-col(:span="5")
                开奖号码：
                span(style="color: #333") {{ row.prizeCode }}

              el-col(:span="5")
                总金额：
                span(style="color: #333") {{ row.totalPrice }}

            el-row
              el-col(:span="9")
                注单编号：
                span(style="color: #333") {{ row.projectId }}
              el-col(:span="5")
                玩法：
                span(style="color: #333") {{ row.methodName }}
              el-col(:span="5")
                注单状态：
                span(style="color: #333") {{ STATUS[row.stat] }}

              el-col(:span="5")
                倍数模式：
                span(style="color: #333") {{ row.multiple }}

            
            el-row
              el-col(:span="9")
                投单时间：
                span(style="color: #333") {{ row.writeTime }}
              el-col(:span="5")
                奖期：
                span(style="color: #333") {{ row.issue }}
              el-col(:span="5")
                注单奖金：
                span(style="color: #333") {{ row.bonus }}

              el-col(:span="5")
                动态奖金返点：
                span(style="color: #333") {{ row.userPoint }}

            p.textarea-label
              span.label 投注内容：
              el-input.font-12(v-model="row.code" type="textarea" autofocus  v-bind:autosize="{ minRows: 5, maxRows: 10 }" placeholder="每一注号码之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开")

            p 可能中奖的情况：

            el-table.header-bold.nopadding(:data="[]" v-bind:row-class-name="tableRowClassName" style="margin: .15rem 0")

              el-table-column(prop="methodName" label="编号" width="160" )
                template(scope="scope")
                  .ds-button.text-button.blue(@click="") xxxx

              el-table-column(label="号码" width="160")
              

              el-table-column(prop="prize" label="倍数" width="80" align="right")

              el-table-column(prop="prize" label="奖级" width="80" align="right")

              el-table-column(prop="userpoint" label="奖金"  align="right")

            .buttons(style="margin: .3rem; text-align: center")
              .ds-button.primary.large.bold(v-if="type === 1" @click="") 发起跟单
              .ds-button.primary.large.bold(v-if="type === 2" @click="cancel") 确认撤销




      
</template>

<script>
  import { digitUppercase } from '../../util/Number'
  import { dateTimeFormat } from '../../util/Date'
  import api from '../../http/api'
  import util from '../../util'
  export default {
    data () {
      return {
        st: '',
        et: '',
        STATUS: ['未开奖', '未中奖', '已中奖', '已撤单'],
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
        modalTitles: ['投注详情', '发起跟单', '撤销']
      }
    },
    computed: {
      textMoney () {
        return digitUppercase(this.money)
      },
      Cdata () {
        if (this.data.length <= this.pageSize) return this.data
        else {
          return util.groupArray(this.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage), this.pageSize, {_empty: true})[0]
        }
      }
    },
    watch: {
      gameid () {
        this.getMethods()
        this.getRecentIssueList()
      }
    },
    mounted () {
      this.getLotterys()
      this.$route.query.gameid && (this.gameid = this.$route.query.gameid)
      this.Orderlist()
    },
    methods: {
      tableRowClassName (row, index) {
        if (row.selected) return 'selected-row'
      },
      setSelected (row) {
        this.$set(row, 'selected', !row.selected)
        // row.selected = !row.selected
      },
      pageChanged (cp) {
        this.Orderlist(cp, () => {
          this.currentPage = cp
        })
      },
      clear () {
        this.st = ''
        this.et = ''
        this.status = ''
        this.isFree = ''
        this.gameid = ''
        this.method = {}
        this.issue = ''
        this.mode = ''
        this.id = ''
        this.name = ''
        this.zone = ''
      },
      cancel () {
        let loading = this.$loading({
          text: '撤单中...',
          target: this.$el
        }, 10000, '撤单超时...')
        this.$http.get(api.cancel, {id: this.row.projectId}).then(({data}) => {
          // success
          if (data.success === 1) {
            this.show = false
            setTimeout(() => {
              loading.text = '撤单成功!'
              setTimeout(() => {
                this.Orderlist()
              }, 500)
            }, 500)
          } else loading.text = '撤单失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 1000)
        })
      },
      Orderlist (page, fn) {
        let loading = this.$loading({
          text: '投注记录加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        if (!fn) {
          this.preOptions = {
            beginDate: this.st ? dateTimeFormat(this.st.getTime()).replace(/[\s:-]*/g, '') : '',
            endDate: this.et ? dateTimeFormat(this.et.getTime()).replace(/[\s:-]*/g, '') : '',
            stat: this.status,
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
        this.$http.get(api.Orderlist, this.preOptions).then(({data}) => {
          // success
          if (data.success === 1) {
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 500)
            typeof fn === 'function' && fn()
            this.data = data.recordList
            this.total = data.totalSize || this.data.length
          } else loading.text = '加载失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 1000)
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
          }
        }, (rep) => {
          // error
        })
      }
    }
  }
  // 投注列表
  // http://192.168.169.44:9901/cagamesclient/report/buyReport.do?method=list&beginDate=20170101000000&endDate=20170303000000&stat=1&isFree=1&userName=test&scope=1&lotteryId=1&methodId=16&issue=170104071&modes=1
  // Orderlist: api + 'report/buyReport.do?method=list',
  // 根据投注号Id查询投注详情
  // http://192.168.169.44:9901/cagamesclient/report/buyReport.do?method=detail&projectId=2290
  // OrderDetail: api + 'report/buyReport.do?method=list',
  // 撤单
  // http://192.168.169.44:9901/cagamesclient/booking.do?method=cancel&id=1304
  // cancel: api + '/booking.do?method=cancel',
  // 获取玩法
  // http://192.168.169.44:9901/cagamesclient/report/OrderReport.do?method=getMethods&lotteryId=1
  // getMethods: api + 'report/OrderReport.do?method=getMethods',
  // 获取期号
  // http://192.168.169.44:9901/cagamesclient/issue.do?method=getRecentIssueList&lotteryId=1&issCount=10
  // getRecentIssueList: api + 'issue.do?method=getRecentIssueList'
  // 获取彩种列表
  // http://192.168.169.44:9901/cagamesclient/report/OrderReport.do?method=getLotterys
  // getLotterys: api + 'report/OrderReport.do?method=getLotterys',
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
    top 0
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
      width 7rem
      radius()
    .content
      margin 0 .2rem
      .el-row
        margin PW 0
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
