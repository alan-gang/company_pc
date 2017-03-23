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
          el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围")
        
        .buttons(style="margin-left: .9rem")
          .ds-button.primary.large.bold(@click="profitDetail") 搜索

        el-table.header-bold.nopadding(:data="data" v-bind:row-class-name="tableRowClassName" style="margin: .2rem 0 0 0")

          el-table-column(prop="nickName" label="用户名" width="100")
            template(scope="scope")
                span {{ nickName }}
          el-table-column(prop="day" label="日期" width="100" sortable)
          el-table-column(prop="userPoint" label="返点级别" width="80" )
            template(scope="scope")
              span {{ userPoint }}
          el-table-column(prop="saveAmount" label="充值总额" width="100" )
          el-table-column(prop="withdrawAmount" label="提款总额" width="100" )
          el-table-column(prop="buyAmount" label="投注总额" width="100" )
          el-table-column(prop="pointAmount" label="返点总额" width="100" )
          el-table-column(prop="prizeAmount" label="派奖总额" width="100" )
          el-table-column(prop="settleAmount" label="盈亏结算" width="100" )
        
        el-table.header-bold.nopadding(:data="total" row-class-name="text-danger" style="" v-if="total[0]")

          el-table-column(prop="nickName" label="" width="100")
          el-table-column(prop="day" label="" width="100")
          el-table-column(prop="userPoint" label="" width="80" )
            
          el-table-column(prop="totalSsave" label="" width="100" )
          el-table-column(prop="totalWithdraw" label="" width="100" )
            template(scope="scope")
              span(style="color: #666; position: absolute; left: -.4rem") 合计:
              | {{ scope.row. totalWithdraw}}
          el-table-column(prop="totalBuy" label="" width="100" )
          el-table-column(prop="totalPoint" label="" width="100" )
          el-table-column(prop="totalPrize" label="" width="100" )
          el-table-column(prop="totalSettle" label="" width="100" )
</template>

<script>
  import { dateTimeFormat, dateFormat } from '../../util/Date'
  import api from '../../http/api'
  import store from '../../store'
  export default {
    data () {
      return {
        me: store.state.user,
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
        stEt: [dateTimeFormat(new Date().getTime() - 3600 * 1000 * 24 * 7), dateTimeFormat(new Date().getTime())],
        data: [{}],
        userId: '',
        total: []
      }
    },
    computed: {
    },
    mounted () {
      let {stEt, userId} = this.$route.query
      if (stEt) this.stEt = stEt
      if (userId) this.userId = userId
      this.profitDetail()
    },
    methods: {
      // 盈亏详情列表（按用户和时间范围查询）
      // http://192.168.169.44:9901/cagamesclient/report/profit.do?method=detail&destUserId=2&startDay=20170101&endDay=20170301
      // profitDetail: api + 'report/profit.do?method=detail',
      profitDetail () {
        let loading = this.$loading({
          text: '盈亏报表加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.profitDetail, {
          startDay: dateFormat(new Date(this.stEt[0]).getTime()).replace(/[-]/g, ''),
          endDay: dateFormat(new Date(this.stEt[1]).getTime()).replace(/[-]/g, ''),
          destUserId: this.userId
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            this.data = data.allDate
            this.nickName = data.nickName
            this.userPoint = data.userPoint
            this.total = [data.totalJson]
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