<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      .form

        label.item 帐变时间范围 
          el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围" v-bind:clearable="clearableOnTime")
        
        .buttons(style="margin-left: .9rem")
          .ds-button.primary.large.bold(@click="profitList") 搜索

        el-table.header-bold.nopadding(:data="data" v-bind:row-class-name="tableRowClassName" style="margin: .2rem 0")

          el-table-column(prop="userName" label="用户名" width="100" v-bind:sortable="true")
          el-table-column(prop="userPoint" label="返点级别" width="100" )
          el-table-column(prop="salaryAmount" label="工资总额" width="100" )
          el-table-column(prop="saveAmount" label="充值总额" width="100" )
          el-table-column(prop="withdrawAmount" label="提款总额" width="100" )
          el-table-column(prop="buyAmount" label="投注总额" width="100" )
          el-table-column(prop="pointAmount" label="返点总额" width="100" )
          el-table-column(prop="prizeAmount" label="派奖总额" width="100" )
          el-table-column(prop="profitAmount" label="盈亏结算" width="100"  v-bind:sortable="true")

          // el-table-column(prop="userName" label="用户名" width="100" sortable="true")
          // el-table-column(prop="buy" label="投注总额" width="100" )
          // el-table-column(prop="point" label="返点总额" width="100" )
          // el-table-column(prop="prize" label="中奖总额" width="100" )
          // el-table-column(prop="profit" label="盈亏结算" width="100" )
          // el-table-column(prop="rate" label="中奖率" width="100" )
          
          el-table-column(prop="userpoint" label="操作" align="center")
            template(scope="scope")
              .ds-button.text-button.blue(style="padding: 0 .05rem" @click.stop="goProfitLossDetail(scope.row.userId)") 明细
      
</template>

<script>
  import { dateFormat } from '../../util/Date'
  import api from '../../http/api'
  import store from '../../store'
  export default {
    data () {
      return {
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
        stEt: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date(new Date().getTime())],
        data: [{}]
      }
    },
    computed: {
    },
    mounted () {
      this.profitList()
    },
    methods: {
      // 盈亏报表列表
      // http://192.168.169.44:9901/cagamesclient/report/profit.do?method=list&startDay=20170101&endDay=20170301
      // profitList: api + 'report/profit.do?method=list',
      // api.getTeamProfit
      profitList () {
        let loading = this.$loading({
          text: '盈亏报表加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.profitList, {
          startDay: dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[-]/g, ''),
          endDay: dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[-]/g, '')
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.data = data.allDate
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
          }, 1000)
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
