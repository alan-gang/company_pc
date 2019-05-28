<template lang="jade">
  .daily-wage-set
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content
      .form.form-filters

          label.item 注册时间 
            el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围" v-bind:clearable="clearableOnTime")
          
          span.date-wp 
            SearchConditions(v-bind:showTimeTxt="false" v-bind:defaultDateIdx="defaultDateIdx" v-bind:searchConditions="searchConditions" v-bind:dateMappingConfig="dateMappingConfig" @choiced="choicedSearchCondition" v-show=" [0].indexOf(I) == -1 ")

          span.ml10 状态 
          span
            .ds-button.btn-item.mr10(v-for="(c, i) in statusButtons" v-bind:class="{selected: quickStatusIdx === i}" @click="choiceStatus(i)") {{c}}

          .ds-button.primary.large.bold(@click="mySubSalaryList") 搜索
      
      .table-list(style="padding: .15rem .2rem ")
        p(style="margin: 0 0 .15rem 0" )
          .ds-button.primary.large.bold(@click="setWage") 设置日工资
          el-breadcrumb(separator=">")
            el-breadcrumb-item(v-for="(B, i) in BL" ) {{ B.title }}

        el-table.header-bold.nopadding(:data="data" stripe ref="table" v-bind:max-height=" MH " @selection-change="handleSelectionChange")
          el-table-column(type="selection" width="100px" class-name="pl2")
          el-table-column(prop="userName" label="用户名")
          el-table-column(prop="registertime" label="注册日期" align="center")
          el-table-column(prop="teamCount" label="团队人数"  align="center")
          el-table-column(prop="salary" label="工资级别"  align="center") 
          el-table-column(prop="teamSales" label="团队销量"  align="center")
          el-table-column(prop="activityCount" label="有效人数"  align="center")
          el-table-column(class-name="pl2 pr2" prop="isopen" label="状态")
            template(scope="scope")
              span(:class=" {'text-green': scope.row.isopen == 1, 'text-danger': scope.row.isopen == 0} ") {{ scope.row.isopen ? '已设置' : '未设置' }}
          el-table-column(label="操作" )
            template(slot-scope="scope")
              span.pointer(style=" padding: 0 .05rem" class="fc-o" v-if=" scope.row.isopen == 0 || scope.row.isopen == 1 " @click="setWage()") 设置日工资

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > pageSize " v-on:current-change="pageChanged")


      DialogSetDailyWage(v-bind:showDialogSetWage="showDialogSetWage")
    


</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import api from '../../http/api'
  import store from '../../store'
  import { MMath } from '../../util/Number'
  import page from 'components/page'
  import SalaryDetail from './SalaryDetail'
  import SearchConditions from 'components/SearchConditions'
  import DialogSetDailyWage from './DialogSetDailyWage'
  export default {
    mixins: [setTableMaxHeight, page],
    components: {
      SalaryDetail,
      SearchConditions,
      DialogSetDailyWage
    },
    data () {
      return {
        TH: 280,
        ME: store.state.user,
        type: 0,
        stEt: [new Date()._setD(1)._setHMS('0:0:0'), new Date()._setD(1)._setHMS('0:0:0')._bfM(1)._setS(-1)],
        un: '',
        BL: [
          {title: '自己'},
          {}
        ],
        did: '',
        fn: 'mySubSalaryList',
        id: '',
        pageSize: 15,
        defaultDateIdx: -1,
        searchConditions: ['昨天', '前天', '最近7天'],
        dateMappingConfig: { d0: [1, 1], d1: [2, 2], d2: [6, 0] },
        quickStatusIdx: -1,
        statusButtons: ['全部', '已设置', '未设置'],
        showDialogSetWage: false
      }
    },
    mounted () {
      this.mySubSalaryList()
    },
    methods: {
      goToGift () {
        setTimeout(() => {
          this.$router.push('/activity/5-1-2')
        }, 0)
      },
      link (B, i) {
        this.id = B.userId
        this.list(undefined, undefined, B.userId)
      },
      setWage () {},
      handleSelectionChange (row) {
        console.log('row=', row)
      },
      // 我的日工资
      mylist (option = {page: 1, pageSize: this.pageSize}, cb = () => { this.currentPage = 1 }) {
        let loading = this.$loading({
          text: '加载中...',
          target: this.$refs['table'].$el
        }, 10000, '加载超时...')
        let p = {
          // userId: this.ME.userId,
          // userId: '',
          startDate: this.stEt[0] && this.stEt[0]._toDayString().replace(/-/g, ''),
          endDate: this.stEt[1] && this.stEt[1]._toDayString().replace(/-/g, ''),
          userState: 1,
          port: 1
        }
        if (this.quickStatusIdx - 1 >= 0) {
          p.isdone = this.quickStatusIdx - 1
        }
        Object.assign(p, option)
        this.$http.post(api.getSalaryById, p).then(({data: {success, userBreads, totalSize, data}}) => {
          // success
          if (success === 1) {
            this.total = totalSize || data.length
            // 增加工资总额
            data = data.map((item) => {
              item.groupTotalAmount = MMath.add(item.subSalary, item.daySalary)
              return item
            })
            this.data = data
            cb()
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
      mySubSalaryList (option = {page: 1, pageSize: this.pageSize}, cb = () => { this.currentPage = 1 }) {
        let loading = this.$loading({
          text: '加载中...',
          target: this.$refs['table'].$el
        }, 10000, '加载超时...')
        let p = {
          startDate: this.stEt[0] && this.stEt[0]._toDayString().replace(/-/g, ''),
          endDate: this.stEt[1] && this.stEt[1]._toDayString().replace(/-/g, '')
        }
        if (this.quickStatusIdx - 1 >= 0) {
          p.isdone = this.quickStatusIdx - 1
        }
        Object.assign(p, option)
        this.$http.post(api.mySubSalaryList, p).then(({data: {success, userBreads, totalSize, salaryList}}) => {
          // success
          if (success === 1) {
            this.total = totalSize || salaryList.length
            // 增加工资总额
            salaryList = salaryList.map((item) => {
              item.groupTotalAmount = MMath.add(item.subSalary, item.daySalary)
              return item
            })
            this.data = salaryList
            cb()
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
      choicedSearchCondition (i, dates) {
        this.defaultDateIdx = i
        this.stEt = [dates.startDate, dates.endDate]
      },
      choiceStatus (i) {
        this.quickStatusIdx = i
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .daily-wage-set
    .fc-o
      color #f37e0c
    .form-filters
      padding .15rem
    .el-breadcrumb
      display inline-block
      margin-left 0.2rem
    .item
      display inline-block
      margin 0 PW 0 0
    .date-wp
      display inline-block
</style>
