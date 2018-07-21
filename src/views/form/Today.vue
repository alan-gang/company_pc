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

        label.item 范围 
          el-select(clearable v-bind:disabled=" !ZONES[0] "  v-model="zone" style="width: 1rem" placeholder="全")
            el-option(v-for="(U, i) in ZONES" v-bind:label="U" v-bind:value="i")

        
        el-select(clearable v-model="S" placeholder="默认排序")
          el-option(v-for="(F, i) in SS" v-bind:label="F" v-bind:value="i")
        
        | &nbsp;&nbsp;

        label.item 
          el-select(clearable v-model=" btos " placeholder="默认" style="width: .8rem")
            el-option(v-for="(F, i) in ['升序', '降序']" v-bind:label="F" v-bind:value=" i ")

        
        .ds-button.primary.large.bold(@click="profitList()") 搜索
        //- .buttons(style="margin-left: .3rem")
        
      
      .table-list(style="padding: .15rem .2rem ")
        p(style="margin: 0 0  .15rem 0")
          el-breadcrumb(separator=">")
            el-breadcrumb-item(v-for="(B, i) in BL" @click.native=" link(B, i) " ) {{ i === 0 ? '自己' : B.userName }}
      
        el-table.header-bold.nopadding(:data="data"  style="; margin: 0"   ref="table" stripe v-bind:summary-method="getSummaries"  @cell-click="cellClick" v-bind:row-class-name="tableRowClassName"  v-bind:max-height=" MH ")

          el-table-column(class-name="pl2" prop="userName" label="用户名" )
            template(scope="scope")
              span.pointer.text-blue(:class=" { 'text-danger': scope.row.userName === me.account } " v-if="!scope.row.lst") {{ scope.row.userName }}
              span(v-if="scope.row.lst") 小结
              
          el-table-column(prop="userPoint" label="返点级别" align="center")


          el-table-column(align="right" prop="saveAmount" label="充值总额" )
            template(scope="scope")
              span {{ numberWithCommas(scope.row.saveAmount) }}

          el-table-column(align="right" prop="withdrawAmount" label="提款总额" )
            template(scope="scope")
              span {{ numberWithCommas(scope.row.withdrawAmount) }}


          el-table-column(align="right" prop="buyAmount" label="投注总额" )
            template(scope="scope")
              span {{ numberWithCommas(scope.row.buyAmount) }}

          el-table-column(align="right" prop="pointAmount" label="返点总额" )
            template(scope="scope")
              span {{ numberWithCommas(scope.row.pointAmount) }}


          el-table-column(align="right" prop="prizeAmount" label="派奖总额" )
            template(scope="scope")
              span {{ numberWithCommas(scope.row.prizeAmount) }}

          el-table-column(align="right" prop="rewardsAmount" label="活动")
            template(scope="scope")
              span {{ numberWithCommas(scope.row.rewardsAmount) }}

          el-table-column(align="right" prop="salaryAmount" label="工资")
            template(scope="scope")
              span {{ numberWithCommas(scope.row.salaryAmount) }}


          el-table-column(align="right" class-name="pr2" prop="profitAmount" label="盈亏"  )
            template(scope="scope")
              span(:class=" { 'text-danger': scope.row.profitAmount.startsWith('-'), 'text-green': !scope.row.profitAmount.startsWith('-') } ") {{ numberWithCommas(scope.row.profitAmount) }}
      
      el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")

          
      
</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import { numberWithCommas } from '../../util/Number'
  import { dateFormat } from '../../util/Date'
  import api from '../../http/api'
  import store from '../../store'
  export default {
    mixins: [setTableMaxHeight],
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
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }],
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        stEt: [new Date(new Date().getTime()), new Date(new Date().getTime())],
        data: [],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {},
        BL: [
          {title: '自己'},
          {}
        ],
        ZONES: ['直接下级', '所有下级'],
        zone: '',
        name: '',
        SS: ['投注总额', '盈亏金额', '工资总额', '返点级别'],
        S: '',
        btos: '',
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
      pageChanged (cp) {
        this.profitList(cp, () => {
          this.currentPage = cp
        })
      },
      // 盈亏报表列表
      // http://192.168.169.44:9901/cagamesclient/report/profit.do?method=list&startDay=20170101&endDay=20170301
      // profitList: api + 'report/profit.do?method=list',
      // api.getTeamProfit
      profitList (page, fn, id) {
        let loading = this.$loading({
          text: '加载中...',
          target: this.$refs['table'].$el
        }, 10000, '加载超时...')
        if (!fn) {
          this.preOptions = {
            startDay: dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[-]/g, ''),
            endDay: dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[-]/g, ''),
            userId: id || this.BL[this.BL.length - 2].userId,
            parentId: !id && this.zone !== '' ? this.zone + 1 : '',
            userName: id ? '' : this.name,
            orderType: this.S === '' ? '' : this.S + 1,
            sort: this.btos === '' ? 2 : this.btos + 1,
            page: 1,
            pageSize: this.pageSize
          }
        } else {
          this.preOptions.page = page
        }

        this.$http.get(api.profitList, this.preOptions).then(({data}) => {
          // success
          if (data.success === 1) {
            typeof fn === 'function' && fn()
            !fn && (this.currentPage = 1)
            // this.totalJson = data.totalJson
            // data.pageTotalJson.lst = true
            // data.allDate.push(data.pageTotalJson)
            this.data = data.allDate
            this.BL = (data.userBreads).concat([{}])
            this.total = data.totalSize || this.data.length
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
      tableRowClassName (row) {
        // if (this.me.account === row.userName) return 'text-danger'
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
