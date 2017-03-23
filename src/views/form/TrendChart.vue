<template lang="jade">
  .me-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .trend-chart.scroll-content

      el-row.game-info.ds-icon-item

        el-col.left(:span="4" style="min-width: 1.8rem")
          .item 
            el-select(v-model="gameid" style="width: 1.5rem")
              el-option(v-for="U in gameList" v-bind:label="U.cnName" v-bind:value="U.lotteryId")
        el-col.right(:span="20")
          .item 
            .ds-checkbox-label(:class="{ active: type === 0 }" @click=" type = 0 ")
              .ds-checkbox
              |  折线
            | &nbsp;&nbsp;
            .ds-checkbox-label(:class="{ active: type === 1 }" @click=" type = 1 ")
              .ds-checkbox
              |  遗漏
            .ds-button.text-button.blue 最近30期
            .ds-button.text-button.blue 最近50期
            .ds-button.text-button.blue 最近100期
            .ds-button.text-button.blue(@click="") 前天
            .ds-button.text-button.blue(@click="") 昨天
            .ds-button.text-button.blue(@click="") 今天

          .item 时间范围  
            el-date-picker( :picker-options="pickerOptions" v-model="stEt" type="daterange" placeholder="选择日期范围")
            

          .item
            .ds-button.primary 搜索

      .chart(style="position: relative")

        el-table.nopadding.header-bold.has-border(:data="data" border v-bind:row-class-name="tableRowClassName")
          el-table-column(prop="issue" label="期号" width="100" align="center" class-name="bg-white")
          el-table-column(v-for="(P, k) in PS" v-bind:label="P.title" align="center" v-bind:class-name=" k % 2 === 0 ? 'bg-light-blue' : 'bg-light-danger' ")
            el-table-column(align="center" width="30" v-for="(n, i) in P.numbers" v-bind:label="n+'' " v-bind:class-name=" (i % 2 === 0 ? 'bg-light-blue' : 'bg-light-danger')")
              template(scope="scope")
                div
                  span(:class="[ scope.row.numbers && scope.row.numbers[i + k*10].class ]") {{ scope.row.numbers ? scope.row.numbers[i + k*10].n: 0 }}
        
        svg(width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: 100px; top: 62px")
          polyline(fill="none"  v-for="(l, i) in lines" v-bind:points="l" v-bind:stroke="i %2 === 0 ? '#89d2ff' : '#ff7f8a' " )


</template>

<script>
import api from '../../http/api'
import { dateTimeFormat } from '../../util/Date'
// import store from '../../store'
export default {
  data () {
    return {
      // dateTimeFormat: dateTimeFormat,
      // dateFormat: dateFormat,
      gameList: [],
      gameid: '',
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
      PS: [
        {title: '万位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
        {title: '千位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
        {title: '百位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
        {title: '十位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
        {title: '个位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      ],
      // line 遗漏
      type: 0,
      data: [
      ],
      lines: []
    }
  },
  computed: {
  },
  created () {
    this.data = []
    for (let i = 18820; i < 18830; i++) {
      let o = {issue: i, numbers: [], myClass: 'text-bbb'}
      let k = i - 18820
      for (let j = 0; j < 50; j++) {
        // o['prop' + j] = j
        o.numbers.push({n: j, class: (j + k) === 1 || (j + k) === 10 || (j + k) === 20 || (j + k) === 30 || (j + k) === 40 || (j + k) === 50 ? 'ball' : ''})
      }
      this.data.push(o)
    }
    this.data.push({issue: '出现总次数', myClass: 'bg-white border-top'})
    this.data.push({issue: '平均遗漏值', myClass: 'bg-white '})
    this.data.push({issue: '最大遗漏值', myClass: 'bg-white'})
    this.data.push({issue: '最大连出值', myClass: 'bg-white '})
    this.data.forEach((d, j) => {
      d.numbers && d.numbers.forEach((s, i) => {
        if (s.class !== 'ball') return false
        if (i < 10) {
          !this.lines[0] && (this.lines[0] = '')
          this.lines[0] += 30.5 * (i + 0.5) + ',' + (31 * j + 15) + ' '
        } else if (i < 20) {
          !this.lines[1] && (this.lines[1] = '')
          this.lines[1] += 30.4 * (i + 0.5) + ',' + (31 * j + 15) + ' '
        } else if (i < 30) {
          !this.lines[2] && (this.lines[2] = '')
          this.lines[2] += 30.3 * (i + 0.5) + ',' + (31 * j + 15) + ' '
        } else if (i < 40) {
          !this.lines[3] && (this.lines[3] = '')
          this.lines[3] += 30.2 * (i + 0.5) + ',' + (31 * j + 15) + ' '
        } else if (i < 50) {
          !this.lines[4] && (this.lines[4] = '')
          this.lines[4] += 30.1 * (i + 0.5) + ',' + (31 * j + 15) + ' '
        }
      })
    })
  },
  mounted () {
    this.getLotterys()
    this.$route.query.gameid && (this.gameid = this.$route.query.gameid)
  },
  methods: {
    tableRowClassName (row, i) {
      return row.myClass
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
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  H = 1rem
  .scroll-content
    top TH
  .trend-chart
    // padding PW
    
    .game-info
      padding PWX
      padding-left .8rem
      .text-button
        padding 0 .05rem
    .chart
      min-width 14.4rem
      .el-row
        height .4rem
        line-height .4rem
        &.header
          height .8rem
          color #333
          font-weight bold
          border-top 1px solid #d4d4d4
          &:first-child
            line-height .8rem
      .el-row
          border-bottom 1px solid #d4d4d4
      .el-col
        text-align center
        height 100%
        border-right 1px solid #e6e6e6
        
        
  .ds-icon-item
    background-position .2rem .2rem
  .item
    display inline-block
    margin .1rem PW
</style>

