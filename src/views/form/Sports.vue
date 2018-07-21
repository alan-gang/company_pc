<template lang="jade">
  .group-page.tool-bar-page-content
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .user-list.scroll-content
      
      div(v-if=" I === 0 ")

        .form.form-filters
          label.item 游戏时间 
            el-date-picker(:picker-options="pickerOptions" v-model="stEt" type="datetimerange" placeholder="请选择日期时间范围" v-bind:clearable="clearableOnTime")


          label.item 用户 
            input.ds-input.small(v-model="name" style="width: 1rem")

          label.item 范围 
            el-select(clearable v-bind:disabled=" !ZONES[0] "  v-model="zone" style="width: 1rem" placeholder="全")
              el-option(v-for="(U, i) in ZONES" v-bind:label="U" v-bind:value="i")

          

          .ds-button.primary.large.bold(@click="getData") 搜索
          //- .buttons(style="margin-left: .6rem")
        
        .table-list(style="padding: .15rem .2rem ")
        
          el-table.header-bold.nopadding(:data="data"  style=""   ref="table" stripe v-bind:max-height=" MH "  v-bind:row-class-name="tableRowClassName" v-on:row-click="setSelected" )

            el-table-column(class-name="pl2" prop="username" label="用户名"  width="150")
            el-table-column(prop="betTime" label="时间" width="150")
            el-table-column(prop="oddstype" label="盘口" width="100")
            el-table-column(prop="odds" label="赔率"  align="center"  width="100")
            el-table-column(prop="betAmount" label="下注金额"  align="right" width="100")
            el-table-column(prop="winAmount" label="奖金"  align="right" width="100")
            el-table-column(prop="betStatus" label="状态"  align="center" width="150")
              template(scope="scope")
                  span(:class=" { 'text-green': scope.row.betStatus === '中奖', 'text-grey': scope.row.betStatus === '未中奖' } ") {{ scope.row.betStatus }}
            el-table-column(prop="eventName" label="赛事"  min-width="250")


           

          el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")

      BGVedioRecord.scroll-content(v-if=" I === 1 ")
      BGGameRecord.scroll-content(v-if=" I === 2 ")
      BGFishRecord.scroll-content(v-if=" I === 3 ")
      VROrder.scroll-content(v-if=" I === 4 ")
      VRFollow.scroll-content(v-if=" I === 5 ")
      VRTip.scroll-content(v-if=" I === 6 ")

</template>

<script>
  import BGVedioRecord from './BGVedioRecord'
  import BGGameRecord from './BGGameRecord'
  import BGFishRecord from './BGFishRecord'
  import VROrder from './VROrder'
  import VRFollow from './VRFollow'
  import VRTip from './VRTip'
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import api from '../../http/api'
  import {dateTimeFormat} from '../../util/Date'
  export default {
    mixins: [setTableMaxHeight],
    components: {
      BGVedioRecord,
      BGGameRecord,
      BGFishRecord,
      VROrder,
      VRFollow,
      VRTip
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
          }],
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        defaultStEt: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), new Date(new Date().getTime())],
        stEt: [dateTimeFormat(new Date().getTime() - 3600 * 1000 * 24 * 7), dateTimeFormat(new Date().getTime())],
        // stEt: [dateTimeFormat(new Date().getTime() - 3600 * 1000 * 24 * 7), dateTimeFormat(new Date().getTime())],
        // defaultStEt: ['', ''],
        // stEt: ['', ''],
        // st: '',
        ZONES: ['自己', '直接下级', '所有下级'],
        zone: '',
        data: [{}],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {},
        STATE: ['未结算', '结算赢', '结果和', '结算输', '取消', '过期', '系统取消'],
        name: '',
        I: 0
      }
    },
    computed: {
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
      I () {
        if (this.I === 0) {
          setTimeout(this.getData)
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      __setGRPTI (i) {
        this.I = i
      },
      tableRowClassName (row, index) {
        if (row.selected) return 'selected-row'
      },
      setSelected (row) {
        this.$set(row, 'selected', !row.selected)
      },
      pageChanged (cp) {
        this.getData(cp, () => {
          this.currentPage = cp
        })
      },
      getData (page, fn) {
        let loading = this.$loading({
          text: '其它游戏记录加载中...',
          target: this.$refs['table'].$el
        }, 10000, '加载超时...')
        if (!fn) {
          this.preOptions = {
            startTime: this.stEt[0] ? dateTimeFormat(this.stEt[0]) : '',
            endTIme: this.stEt[1] ? dateTimeFormat(this.stEt[1]) : '',
            userName: this.name,
            scope: this.zone,
            pageIndex: 1,
            pageSize: this.pageSize
          }
        } else {
          this.preOptions.page = page
        }
        this.$http.post(api.tcgOrderList, this.preOptions).then(({data}) => {
          // success
          if (data && data.items) {
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 500)
            typeof fn === 'function' && fn()
            !fn && (this.currentPage = 1)
            this.data = data.items
            this.total = data.total || this.data.length
          } else loading.text = data.msg || '加载失败!'
        }, (rep) => {
          // error
        }).finally(() => {
          setTimeout(() => {
            loading.close()
          }, 100)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .user-list
    // top TH
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

