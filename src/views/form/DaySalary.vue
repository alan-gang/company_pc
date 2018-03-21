<template lang="jade">
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .stock-list.scroll-content

      .form

        label.item 查询时间范围 
          el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围" v-bind:clearable="clearableOnTime")
        
        .buttons(style="margin-left: .9rem")
          .ds-button.primary.large.bold(@click="daySalaryRepor()") 搜索
      
      .table-list(style="padding: .15rem .2rem ")
      
        el-table.header-bold.nopadding(:data="data" v-bind:row-class-name="tableRowClassName" style="margin: .2rem 0")

          // nds

         
          el-table-column(prop="date" label="日期" width="100" v-if=" this.platform === 'ds' ")
          el-table-column(prop="buyamount" label="团队销量" width="100"  v-if=" this.platform === 'ds' ")
          el-table-column(prop="activitUser" label="活跃人数" width="200"   v-if=" this.platform === 'ds' ")
          el-table-column(prop="salarylevel" label="工资标准" width="100"  v-if=" this.platform === 'ds' ")
          el-table-column(prop="subsalary" label="下级工资总额" width="100"  v-if=" this.platform === 'ds' ")
          el-table-column(prop="salary" label="我的工资"  v-if=" this.platform === 'ds' ")

          // el-table-column(prop="profitamount" label="团队总亏损" width="100" )
          // el-table-column(prop="booksalary" label="应发日工资" width="100" )
          // el-table-column(prop="gettime" label="领取时间" width="100"  v-bind:sortable="true")



          el-table-column(prop="daySalary" label="日工资" width="200"  v-if=" this.platform !== 'ds' ")
          el-table-column(prop="salaryLevel" label="日工资级别" width="200"  v-if=" this.platform !== 'ds' ")
          el-table-column(prop="buyAmount" label="团队销量" width="200"   v-if=" this.platform !== 'ds' ")
          el-table-column(prop="date" label="日期" v-if=" this.platform !== 'ds' ")

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")
      
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
          // shortcuts: [{
          //   text: '最近一周',
          //   onClick (picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          //     picker.$emit('pick', [start, end])
          //   }
          // }, {
          //   text: '最近一个月',
          //   onClick (picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          //     picker.$emit('pick', [start, end])
          //   }
          // }, {
          //   text: '最近三个月',
          //   onClick (picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          //     picker.$emit('pick', [start, end])
          //   }
          // }],
          disabledDate (time) {
            return time.getTime() > Date.now() || time.getTime() < (Date.now() - 3600 * 1000 * 24 * 30)
          }
        },
        stEt: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 1), new Date(new Date().getTime())],
        data: [{}],
        pageSize: 20,
        total: 0,
        currentPage: 1
      }
    },
    computed: {
    },
    mounted () {
      this.daySalaryRepor()
    },
    methods: {
      pageChanged (cp) {
        this.followList(cp, () => {
          this.currentPage = cp
        })
      },
      // 查询日工资（数据要分页）
      // http://192.168.169.161:8080/cagamesclient/report/daySalaryRepor.do?method=list&startDate=20170601&endDate=20170701&page=1&pageSize=10
      daySalaryRepor (page, fn) {
        let loading = this.$loading({
          text: '日工资报表加载中...',
          target: this.$el
        }, 10000, '加载超时...')
        this.$http.get(api.daySalaryRepor, {
          startDate: dateFormat((window.newDate(this.stEt[0])).getTime()).replace(/[-]/g, ''),
          endDate: dateFormat((window.newDate(this.stEt[1])).getTime()).replace(/[-]/g, ''),
          page: page !== undefined ? page : this.currentPage,
          pageSize: this.pageSize
        }).then(({data}) => {
          // success
          if (data.success === 1) {
            typeof fn === 'function' && fn()
            this.total = data.totalSize || this.data.length
            this.data = data.recordList
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
