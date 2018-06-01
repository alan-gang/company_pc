<template lang="jade">
  // title: 'BG视讯记录
  // url: 'BGVedioRecord
  // title: 'BG电游记录
  // url: 'BGGameRecord
  // title: 'BG捕鱼记录
  // url: 'BGFishRecord
  // title: 'VR投注记录列表
  // url: 'VROrder
  // title: 'VR追号记录列表
  // url: 'VRFollow
  // title: 'VR打赏列表
  // url: 'VRTip
  .group-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .user-list.scroll-content.other-game
      div(style="text-align: center")
        .ds-button-group
          .ds-button.x-small.text-button(v-for=" (b, i) in btns " @click=" I = i  " v-bind:class=" {selected: I === i} ") {{ b }}
      
      div(v-if=" I === 0 ")
        .form.form-filters(style="margin-top: .03rem")

          label.item 游戏时间 
            el-date-picker(:picker-options="pickerOptions" v-model="stEt" type="datetimerange" placeholder="请选择日期时间范围" v-bind:clearable="clearableOnTime")

          label.item 用户 
            input.ds-input.small(v-model="name" style="width: 1rem")

          label.item 范围  
            el-select(clearable v-bind:disabled=" !ZONES[0] "  v-model="zone" style="width: 1rem" placeholder="全")
              el-option(v-for="(U, i) in ZONES" v-bind:label="U" v-bind:value="i")


          .buttons(style="margin-left: .6rem")
            .ds-button.primary.large.bold(@click="getData") 搜索
        
        .table-list(style="padding: .15rem .2rem ")
        
          el-table.header-bold.nopadding(:data="data" stripe v-bind:max-height=" MH "  v-bind:row-class-name="tableRowClassName" v-on:row-click="setSelected")

            el-table-column(class-name="pl2" prop="orderId" label="订单号"  )
            el-table-column(prop="gameName" label="游戏类型"  )
            el-table-column(prop="orderTime" label="下注时间（美东）"  )
            el-table-column(prop="playName" label="结算"  )
            el-table-column(prop="validBet" label="总投注"  )
            el-table-column(prop="payment" label="派彩"  )
            el-table-column(prop="validBet" label="打码量"  )
            el-table-column(prop="orderStatus" label="状态"  )
              template(scope="scope")
                 span(:class=" { 'text-green': scope.row.orderStatus === 2 } ") {{ STATE[scope.row.orderStatus - 1] }}

           

          el-pagination(:total="total" v-bind:page-size="pageSize" layout="prev, pager, next, total" v-bind:page-sizes="[5, 10, 15, 20]" v-bind:current-page="currentPage" small v-if=" total > 20 " v-on:current-change="pageChanged")
      
      BGGameRecord.scroll-content(v-if=" I === 1 " style="top: .5rem")
      BGFishRecord.scroll-content(v-if=" I === 2 " style="top: .5rem")
      VROrder.scroll-content(v-if=" I === 3 " style="top: .5rem")
      VRFollow.scroll-content(v-if=" I === 4 " style="top: .5rem")
      VRTip.scroll-content(v-if=" I === 5 " style="top: .5rem")
      
</template>

<script>
  import setTableMaxHeight from 'components/setTableMaxHeight'
  import BGGameRecord from './BGGameRecord'
  import BGFishRecord from './BGFishRecord'
  import VROrder from './VROrder'
  import VRFollow from './VRFollow'
  import VRTip from './VRTip'
  import api from '../../http/api'
  import {dateTimeFormat} from '../../util/Date'
  export default {
    mixins: [setTableMaxHeight],
    components: {
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
        defaultStEt: [new Date(new Date().getTime() - 3600 * 1000 * 24 * 30), new Date(new Date().getTime())],
        stEt: [dateTimeFormat(new Date().getTime() - 3600 * 1000 * 24 * 30), dateTimeFormat(new Date().getTime())],
        ZONES: ['自己', '直接下级', '所有下级'],
        zone: '',
        data: [{}],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        preOptions: {},
        STATE: ['未结算', '结算赢', '结果和', '结算输', '取消', '过期', '系统取消'],
        // btns: ['真人记录', '电游记录', '捕鱼记录', 'VR投注', 'VR追号', 'VR打赏'],
        btns: ['真人记录', '电游记录', '捕鱼记录'],
        I: 0,
        name: ''
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
        if (this.I === 0) this.getData()
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
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
          target: this.$el
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
        this.$http.post(api.videoOrderList, this.preOptions).then(({data}) => {
          // success
          if (data.result && data.result.items) {
            setTimeout(() => {
              loading.text = '加载成功!'
            }, 500)
            typeof fn === 'function' && fn()
            !fn && (this.currentPage = 1)
            this.data = data.result.items
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

<style lang="stylus">
#app.v2 .other-game
  .scroll-content
    top .1rem
</style>

