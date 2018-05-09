<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .user-list.scroll-content

      .form
        
        label.item 类型 
          el-select(multiple placeholder="全" v-model="type" v-bind:style="multipleSelectStyle" v-bind:multiple-limit="typeMax")
            el-option(v-for="(S, i) in TYPES" v-bind:label="S.cnTitle" v-bind:value="S.ordertypeId")

        label.item 帐变时间范围 
          el-date-picker(:picker-options="pickerOptions" v-model="stEt" type="datetimerange" placeholder="请选择日期时间范围" v-bind:clearable="clearableOnTime" @change="detectDate")

        
        label.item 资金 
          el-select(clearable placeholder="全" v-model="isFree" style="width: .8rem")
            el-option(v-for="(S, i) in ISFREE" v-bind:label="S" v-bind:value="i")

        label.item 用户名 
          input.ds-input.small(v-model="name" style="width: 1rem")


        label.item 范围 
          el-select(clearable placeholder="全" v-model="zone" style="width: 1rem")
            el-option(v-for="(U, i) in ZONES" v-bind:label="U" v-bind:value="i")
        
        .item
          el-select(clearable  v-model="query" style="width: 1rem; margin-right: .1rem" placeholder="编号查询")
            el-option(v-for="(U, i) in QUERYS" v-bind:label="U" v-bind:value="i")
          el-input(v-model="id" style="width: 1.5rem")
        
        label.item 游戏名称 
          el-select(clearable placeholder="全" v-model="gameid" style="width: 1.5rem; ")
            el-option(v-for="U in gameList" v-bind:label="U.cnName" v-bind:value="U.lotteryId")

        label.item 玩法 
          el-select(clearable v-bind:disabled=" !methodList[0] " placeholder="全" v-model="method" style="width: 1.5rem")
            el-option(v-for="U in methodList" v-bind:label="U.methodName" v-bind:value="U")

        label.item 奖期 
          el-select(clearable v-bind:disabled=" !issueList[0] " placeholder="全" v-model="issue" style="width: 1.5rem" filterable)
            el-option(v-for="U in issueList" v-bind:label="U.issue" v-bind:value="U.issue")

        label.item 模式 
          el-select(clearable placeholder="全" v-model="mode" style="width: .6rem" )
            el-option(v-for="(U, i) in MODES" v-bind:label="U" v-bind:value="i")


        label.item.block(style="margin-left: .32rem") 快速查询：
          span.ds-button.text-button.blue(style="padding: 0 .05rem" @click="myTopup") 我充值的..
          span.ds-button.text-button.blue(style="padding: 0 .05rem" @click="myWithdraw") 我提现的..
          span.ds-button.text-button.blue(style="padding: 0 .05rem" @click="myOrder") 我投注的..
          span.ds-button.text-button.blue(style="padding: 0 .05rem" @click="myFollow") 我追号的..
          span.ds-button.text-button.blue(style="padding: 0 .05rem" @click="myBonus") 我的奖金..
          span.ds-button.text-button.blue(style="padding: 0 .05rem" @click="myPoint") 我的返点..
        

        .buttons(style="margin-left: .3rem")
          .ds-button.primary.large.bold(@click="list") 搜索
          .ds-button.cancel.large(@click="clear(true)") 清空
      
      .table-list(style="padding: .15rem .2rem ")
      
        el-table.header-bold.nopadding(:data="data" v-bind:row-class-name="tableRowClassName"  v-on:row-click="setSelected"  style="margin-top: .1rem")

          el-table-column(prop="entry" label="帐变编号" width="80" )
            template(scope="scope")
              div
                .text-blue(v-if="!scope.row.last" style="padding: 0") {{ scope.row.entry }}
                span(v-if="scope.row.last" style="padding: 0") {{ scope.row.entry }}


          el-table-column(prop="userName" label="用户名" width="80")
           
          
          el-table-column(prop="times" label="时间" width="120")
            template(scope="scope")
              span(v-if="!scope.row.last") {{ scope.row.times }}
              span.text-blue(v-if="scope.row.last") {{ scope.row.difMoney }}

          el-table-column(prop="title" label="类型" width="80" )

          el-table-column(prop="lotteryName" label="游戏" width="100" )

          el-table-column(prop="methodName" label="玩法" width="140" )

          el-table-column(prop="issue" label="期号" width="100" )

          el-table-column(prop="modes" label="模式" width="50" )
            template(scope="scope")
                span {{ MODES[scope.row.modes - 1] }}   

          el-table-column(prop="income" label="收入" width="100" align="right")
            template(scope="scope")
              span(v-if="!scope.row.last") {{ numberWithCommas(scope.row.income) }}
              span.text-green(v-if="scope.row.last") {{ numberWithCommas(scope.row.income) }}

          el-table-column(prop="expenditure" label="支出" width="100" align="right")
            template(scope="scope")
              span(v-if="!scope.row.last") {{ numberWithCommas(scope.row.expenditure) }}
              span.text-danger(v-if="scope.row.last") {{ numberWithCommas(scope.row.expenditure) }}

          el-table-column(prop="balance" label="主帐户余额" width="100" align="right")
            template(scope="scope")
              span{{ numberWithCommas(scope.row.balance) }}
          
          el-table-column(prop="speBalance"  label="特殊余额" width="100" align="right")
            template(scope="scope")
              span{{ numberWithCommas(scope.row.speBalance) }}


          el-table-column(label="备注" align="center")
            template(scope="scope")
              span {{ ISFREE[scope.row.isFree] }}

        
        // el-table.header-bold.nopadding(:data="amount" v-bind:row-class-name="tableRowClassName" style="" v-if="amount[0]")
        //   el-table-column(prop="entry" label="" width="750" )
        //     template(scope="scope")
        //       p 小结：本页变动金额 &nbsp;&nbsp;
        //         span.text-blue {{ scope.row.difMoney }}
        //   el-table-column(prop="income" label="" width="100" align="right")
        //     template(scope="scope")
        //       span.text-green + {{ scope.row.income }}
        //   el-table-column(prop="expenditure" label="" width="100" align="right")
        //     template(scope="scope")
        //       span.text-danger - {{ scope.row.expenditure }}
        //   el-table-column( label="" width="100" align="right")
        //   el-table-column(label="" align="right")

          

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")

    
      
</template>

<script>
  import { digitUppercase, numberWithCommas } from '../../util/Number'
  import { dateTimeFormat } from '../../util/Date'
  import api from '../../http/api'
  // import util from '../../util'
  export default {
    data () {
      return {
        numberWithCommas: numberWithCommas,
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
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }],
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        defaultStEt: [new Date(new Date().getTime() - 3600 * 1000 * 24), new Date(new Date().getTime())],
        stEt: [new Date((new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate() + ' 00:00:00'), new Date((new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate() + ' 23:59:59')],
        ISFREE: ['现金', '优惠券', '积分'],
        isFree: '',
        gameList: [],
        gameid: '',
        methodList: [],
        method: '',
        issueList: [],
        issue: '',
        MODES: ['元', '角', '分', '厘'],
        mode: '',
        TYPES: '',
        multipleSelectStyle: {minWidth: '1.5rem'},
        typeMax: 5,
        type: [],
        preTypeLength: 0,
        id: '',
        name: '',
        ZONES: ['自己', '直接下级', '所有下级'],
        zone: '',
        QUERYS: ['注单编号', '追号编号', '帐变编号'],
        query: '',
        data: [{}],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {},
        amount: [{income: 0, expenditure: 0, difMoney: 0}]
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
      stEt: {
        deep: true,
        handler () {
          if (!this.stEt[0] && !this.stEt[1]) this.stEt = this.defaultStEt
          if ((window.newDate(this.stEt[0])).getTime() === (window.newDate(this.stEt[1])).getTime()) {
            this.stEt[1] = new Date((window.newDate(this.stEt[1])).getTime() + 3600 * 1000 * 24 - 1000)
          }
        }
      },
      type (o, n) {
        // this.preTypeLength = o.length
        this.preTypeLength > n.length ? setTimeout(() => {
          this.multipleSelectStyle = {
            minWidth: '1.5rem',
            height: '.3rem',
            width: this.type.length + 0.5 + 'rem'
          }
        }, 300) : this.multipleSelectStyle = {
          minWidth: '1.5rem',
          height: '.3rem',
          width: this.type.length + 0.5 + 'rem'
        }
        this.preTypeLength = n.length
      },
      gameid (o, n) {
        this.getMethods()
        this.getRecentIssueList()
      }
    },
    mounted () {
      this.getLotterys()
      this.getOrderType()
      this.list()
      if (this.platform === 'ds') {
        this.ISFREE.splice(2)
      }
    },
    methods: {
      detectDate (v) {
        // console.log(v)
      },
      summary () {
        this.amount[0].income = 0
        this.amount[0].expenditure = 0
        this.amount[0].difMoney = 0
        this.data.forEach(d => {
          this.amount[0].income += d.income
          this.amount[0].expenditure += parseFloat(d.expenditure)
        })
        this.amount[0].difMoney = this.amount[0].income - this.amount[0].expenditure
        this.amount[0].income = this.amount[0].income.toFixed(3)
        this.amount[0].expenditure = this.amount[0].expenditure.toFixed(3)
        this.amount[0].difMoney = this.amount[0].difMoney.toFixed(3)
        if (!this.amount[0].difMoney.startsWith('-')) this.amount[0].difMoney = '+' + this.amount[0].difMoney

        this.data[0] && this.data.push({
          last: true,
          difMoney: this.amount[0].difMoney,
          entry: '小结：',
          nickName: '本页变动金额',
          times: '',
          title: '',
          lotteryName: '',
          methodName: '',
          issue: '',
          modes: '',
          income: '+' + this.amount[0].income,
          expenditure: '-' + this.amount[0].expenditure,
          balance: ''
        })
      },
      myTopup () {
        this.clear()
        this.zone = 0
        this.type = [1]
        this.list()
      },
      myWithdraw () {
        this.clear()
        this.zone = 0
        this.type = [2, 3, 4]
        this.list()
      },
      myOrder () {
        this.clear()
        this.zone = 0
        this.type = [7]
        this.list()
      },
      myFollow () {
        this.clear()
        this.zone = 0
        this.type = [9]
        this.list()
      },
      myBonus () {
        this.clear()
        this.zone = 0
        this.type = [12, 16]
        this.list()
      },
      myPoint () {
        this.clear()
        this.zone = 0
        this.type = [11, 15]
        this.list()
      },
      tableRowClassName (row, index) {
        if (row.selected) return 'selected-row'
      },
      setSelected (row) {
        this.$set(row, 'selected', !row.selected)
        // row.selected = !row.selected
      },
      pageChanged (cp) {
        this.list(cp, () => {
          this.currentPage = cp
        })
      },
      clear (a) {
        // this.st = ''
        // this.et = ''
        this.isFree = ''
        this.game = {}
        this.method = {}
        this.issue = ''
        this.mode = ''
        this.id = ''
        this.name = ''
        this.zone = ''
        this.type = []
        this.query = ''
        a && this.list()
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
      list (page, fn) {
        console.log(this.stEt[0], this.stEt[1], dateTimeFormat(this.stEt[0]).replace(/[-:\s]/g, ''), dateTimeFormat(this.stEt[1]).replace(/[-:\s]/g, ''))
        let loading = this.$loading({
          text: '帐变记录加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        // OrderReport.do?method=list&orderId=7&beginDate=20170201000000&endDate=20170303000000&isFree=1&userName=test&scope=1&serialType=2&serialValue=3397&lotteryId=1&methodId=37&issueId=1111&modes=11&page=1&pageSize=20
        if (!fn) {
          this.preOptions = {
            orderId: this.type.join(','),
            beginDate: dateTimeFormat(this.stEt[0]).replace(/[-:\s]/g, ''),
            endDate: dateTimeFormat(this.stEt[1]).replace(/[-:\s]/g, ''),
            isFree: this.isFree,
            userName: this.name,
            scope: this.zone,
            serialType: this.query,
            serialValue: this.id,
            lotteryId: this.gameid,
            methodId: this.method.methodId,
            issueId: this.issue,
            modes: this.mode !== '' ? this.mode + 1 : '',
            page: 1,
            pageSize: this.pageSize
          }
        } else {
          this.preOptions.page = page
        }
        this.$http.post(api.list, this.preOptions).then(({data}) => {
          // success
          if (data.success === 1) {
            typeof fn === 'function' && fn()
            this.data = data.orderRecordList
            this.total = data.totalSize || this.data.length
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 100)
            this.summary()
          } else loading.text = data.msg || '加载失败!'
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
      },
      getOrderType () {
        this.$http.get(api.getOrderType).then(({data}) => {
          // success
          if (data.success === 1) {
            this.TYPES = data.orderTypeList
          }
        }, (rep) => {
          // error
        })
      }
    }
  }
  // 投注列表
  // http://192.168.169.44:9901/cagamesclient/report/buyReport.do?method=list&beginDate=20170101000000&endDate=20170303000000&stat=1&isFree=1&userName=test&scope=1&lotteryId=1&methodId=16&issue=170104071&modes=1
  // list: api + 'report/buyReport.do?method=list',
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
  .block
    display block
    
  .el-select
  .el-input-number
    width 1.2rem
  .el-select
    position relative
    top .01rem

</style>
