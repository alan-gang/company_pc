<template lang="jade">
  .sub-salary
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content
      .form.form-filters

          label.item( v-if=" type === 1 ") 用户名 
            input.ds-input.small(v-model="un" style="width: 1rem")

          label.item 时间 
            el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围" v-bind:clearable="clearableOnTime")
          
          span.date-wp 
            SearchConditions(v-bind:showTimeTxt="false" v-bind:defaultDateIdx="defaultDateIdx" v-bind:searchConditions="searchConditions" v-bind:dateMappingConfig="dateMappingConfig" @choiced="choicedSearchCondition" v-show=" [0].indexOf(I) == -1 ")

          span.ml10 状态 
          span
            .ds-button.btn-item.mr10(v-for="(c, i) in statusButtons" v-bind:class="{selected: quickStatusIdx === i}" @click="choiceStatus(i)") {{c}}

          .ds-button.primary.large.bold(@click=" list() ") 搜索
      
      .table-list(style="padding: .15rem .2rem ")

        p(style="margin: 0 0 .15rem 0" )
          el-breadcrumb(separator=">")
            el-breadcrumb-item(v-for="(B, i) in BL" @click.native=" link(B, i) " ) {{ i === 0 ? '自己' : B.userName }}

        el-table.header-bold.nopadding(:data="data" stripe ref="itable" v-bind:max-height=" MH " @cell-click="cellClick")

          el-table-column(class-name="pl2" prop="userName" label="用户名" )
            template(scope="scope")
              span.pointer.text-blue(:class=" { 'text-danger': scope.row.userName === ME.account } ") {{ scope.row.userName }}
          
          el-table-column(prop="totBuyAmount" label="团队销量"  align="right")
          el-table-column(prop="buyAmount" label="有效销量"  align="right")
          el-table-column(prop="activitUser" label="有效人数"  align="right")
          el-table-column(prop="groupTotalAmount" label="团队工资总额"  align="right")
          el-table-column(prop="subSalary" label="下级工资总额"  align="right")
          el-table-column(prop="daySalary" label="个人工资"  align="center")
          //- el-table-column(prop="getDaySalary" label="本人已领工资"  align="right")
            template(scope="scope")
              span(:class=" { 'text-green': scope.row.getDaySalary && scope.row.getDaySalary._o0() } ") {{ scope.row.getDaySalary && scope.row.getDaySalary._o0() ? '+' : ''}} {{ scope.row.getDaySalary }}

          el-table-column(prop="" label="操作" align="center" v-if="showOperColumn")
            template(scope="scope")
              span.pointer(style=" padding: 0 .05rem" class="fc-o" v-if=" scope.row.canGet " @click=" goToGift() ") 立即领取
              .ds-button.text-button.blue(style=" padding: 0 .05rem" @click="viewDailyDetail(scope.row)") 每日明细

        el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > pageSize " v-on:current-change="pageChanged")

    
    .modal.inner-modal(v-if="did" )
      .mask
      .box-wrapper
        .box(ref="box" style="width: 10rem; max-height: 9rem; height: 6.2rem;")
          .tool-bar
            span.title 明细
            el-button-group
              el-button.close(icon="close" @click=" did = ''")

          SalaryDetail(:stEt="stEt" v-bind:id="did" v-bind:userName="subUserName")


</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import api from '../../http/api'
  import store from '../../store'
  import page from 'components/page'
  import SalaryDetail from './SalaryDetail'
  import SearchConditions from 'components/SearchConditions'
  import { MMath } from '../../util/Number'
  export default {
    mixins: [setTableMaxHeight, page],
    components: {
      SalaryDetail,
      SearchConditions
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
        fn: 'list',
        id: '',
        pageSize: 15,
        defaultDateIdx: -1,
        searchConditions: ['昨天', '前天', '最近7天'],
        dateMappingConfig: { d0: [1, 1], d1: [2, 2], d2: [6, 0] },
        quickStatusIdx: -1,
        statusButtons: ['全部', '未领取', '已领取'],
        showOperColumn: true,
        subUserName: ''
      }
    },
    mounted () {
      this.list()
    },
    methods: {
      goToGift () {
        setTimeout(() => {
          this.$router.push('/activity/5-1-2')
        }, 0)
      },
      cellClick (row, column, cell, event) {
        if (column.property === 'userName' && this.type) {
          this.list(undefined, undefined, row.userId)
        }
      },
      link (B, i) {
        this.id = B.userId
        this.list(undefined, undefined, B.userId)
      },
      // 我的日工资
      list (option = {page: 1, pageSize: this.pageSize}, cb = () => { this.currentPage = 1 }) {
        let loading = this.$loading({
          text: '加载中...',
          target: this.$refs['itable'].$el
        }, 10000, '加载超时...')
        let p = {
          // userId: this.ME.userId,
          // userId: '',
          startDate: this.stEt[0] && this.stEt[0]._toDayString().replace(/-/g, ''),
          endDate: this.stEt[1] && this.stEt[1]._toDayString().replace(/-/g, ''),
          userState: 3,
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
            this.showOperColumn = p.startDate !== p.endDate
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
      viewDailyDetail (row) {
        this.did = row.userId
        this.subUserName = row.userName
      },
      choicedSearchCondition (i, dates) {
        this.defaultDateIdx = i
        this.stEt = [dates.startDate, dates.endDate]
      },
      choiceStatus (i) {
        this.quickStatusIdx = i
      }

      // 下级日工资
      // list (option = {page: 1, pageSize: this.pageSize}, cb = () => { this.currentPage = 1 }, id) {
      //   let loading = this.$loading({
      //     text: '加载中...',
      //     target: this.$refs['itable'].$el
      //   }, 10000, '加载超时...')
      //   this.$http.post(api.daySalaryRepor, Object.assign({
      //     userId: id || this.id,
      //     userName: this.un,
      //     startDate: this.stEt[0] && this.stEt[0]._toDayString().replace(/-/g, ''),
      //     endDate: this.stEt[1] && this.stEt[1]._toDayString().replace(/-/g, '')
      //   }, option)).then(({data: {success, userBreads, totalSize, recordList}}) => {
      //     // success
      //     if (success === 1 || !success) {
      //       this.BL = userBreads.concat([{}])
      //       this.total = totalSize || recordList.length
      //       // 增加工资总额
      //       recordList = recordList.map((item) => {
      //         item.groupTotalAmount = MMath.add(item.subSalary, item.daySalary)
      //         return item
      //       })
      //       this.data = recordList
      //       cb()
      //       setTimeout(() => {
      //         loading.text = '加载成功!'
      //       }, 100)
      //     } else loading.text = '加载失败!'
      //   }, (rep) => {
      //     // error
      //   }).finally(() => {
      //     setTimeout(() => {
      //       loading.close()
      //     }, 100)
      //   })
      // }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .form-filters
    padding .15rem

  .item
    display inline-block
    margin 0 PW .1rem 0
  .date-wp
      display inline-block
</style>
