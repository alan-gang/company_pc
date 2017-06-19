<template lang="jade">
  .trend-chart-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    el-row.game-info(:class="[ game.class + '-middle' ]" style="background-position: .2rem center;")

        el-col.left(:span="4" style="min-width: 1.8rem")
          .item 
            el-select(v-model="game" style="width: 1.5rem")
              el-option(v-for="U in gameList" v-bind:label="U.cnName" v-bind:value="U")
        el-col.right(:span="20")
          .item 
            .ds-checkbox-label(:class="{ active: polyline }" @click=" polyline = !polyline ")
              .ds-checkbox
              |  折线
            | &nbsp;&nbsp;
            .ds-checkbox-label(:class="{ active: shown }" @click=" shown = !shown")
              .ds-checkbox
              |  遗漏
            .ds-button.text-button.blue(@click="size = 30") 最近30期
            .ds-button.text-button.blue(@click="size = 50") 最近50期
            .ds-button.text-button.blue(@click=" size = 100 ") 最近100期
            .ds-button.text-button.blue(@click=" st = lyd ") 前天
            .ds-button.text-button.blue(@click=" st = yd ") 昨天
            .ds-button.text-button.blue(@click=" st = td ") 今天

          .item 时间范围  
            el-date-picker( :picker-options="pickerOptions" v-model="st" type="date" placeholder="选择日期")
            

          .item
            .ds-button.primary 搜索

    .trend-chart.scroll-content

      

      .chart(style="position: relative; display: inline-block;")

        // el-table.nopadding.header-bold.has-border(:data="data" border v-bind:row-class-name="tableRowClassName")
        //   el-table-column(prop="issue" label="期号" width="100" align="center" class-name="bg-white")
        //   el-table-column(v-for="(P, k) in PS" v-bind:label="P.title" align="center" v-bind:class-name=" k % 2 === 0 ? 'bg-light-blue' : 'bg-light-danger' ")
        //     el-table-column(align="center" width="30" v-for="(n, i) in P.numbers" v-bind:label="n+'' " v-bind:class-name=" (i % 2 === 0 ? 'bg-light-blue' : 'bg-light-danger')")
        //       template(scope="scope")
        //         div
        //           span(:class="[ scope.row.numbers && scope.row.numbers[i + k*10].class ]") {{ scope.row.numbers ? scope.row.numbers[i + k*10].n: 0 }}

        el-table.nopadding.header-bold.has-border(:data="myData" border v-bind:row-class-name="tableRowClassName")
          el-table-column(:resizable=" resizable " prop="issue" label="期号" width="100" align="center" class-name="bg-white")
          el-table-column(:resizable=" resizable " v-for="(P, k) in PS" v-bind:label="P.title" align="center" v-bind:class-name=" k % 2 === 0 ? 'bg-light-blue' : 'bg-light-danger' ")
            el-table-column(align="center" width="30" v-for="(n, i) in P.numbers" v-bind:label="n+'' " v-bind:class-name=" (k % 2 === 0 ? 'bg-light-blue' : 'bg-light-danger')")
              template(scope="scope")
                div
                  span(:class="{ball: i === parseInt(scope.row.code.split(',')[k]), danger: k % 2 !== 0  }" v-show=" i === parseInt(scope.row.code.split(',')[k]) || shown ") {{ i === parseInt(scope.row.code.split(',')[k]) ? i : scope.row.misseddata[k] && scope.row.misseddata[k]['d' + i] || ''}}

        
        svg(width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: 100px; top: 70px" v-show="polyline")
          polyline(fill="none"  v-for="(l, i) in lines" v-bind:points="l" v-bind:stroke="i % 2 === 0 ? '#1a9ff3' : '#ff5f6a' " )
          // polyline(fill="none"  v-for="(l, i) in lines" v-bind:points="l" v-bind:stroke="i % 2 === 0 ? '#89d2ff' : '#ff7f8a' " )

        el-table.nopadding.header-bold.has-border(:data="fData" border v-bind:row-class-name="tableRowClassName"  v-bind:show-header="false" style="position: relative; top: -5px;")
          el-table-column(prop="issue" label="期号" width="100" align="center")
          el-table-column(v-for="(P, k) in PS" v-bind:label="P.title" align="center" )
            el-table-column(align="center" width="30" v-for="(n, i) in P.numbers" v-bind:label="n+'' ")
              template(scope="scope")
                div
                  span(v-if="!scope.row.total") {{ scope.row.numbers ? scope.row.numbers[k*10 + i].n : 0 }}
                  span(v-if="scope.row.total") {{ scope.row.numbers ? (scope.row.numbers[k*10 + i].n / scope.row.total).toFixed(0) : 0 }}

    // .result(style="position: absolute; bottom: -5px; left: .2rem; right: .2rem; overflow: hidden")
</template>

<script>
import api from '../../http/api'
import { dateTimeFormat, dateFormat } from '../../util/Date'
import store from '../../store'
export default {
  data () {
    return {
      // dateTimeFormat: dateTimeFormat,
      // dateFormat: dateFormat,
      size: 100,
      st: '',
      td: dateTimeFormat(new Date().getTime()),
      yd: dateTimeFormat(new Date().getTime() - 3600 * 24 * 100),
      lyd: dateTimeFormat(new Date().getTime() - 3600 * 24 * 2 * 100),
      resizable: false,
      gameList: [],
      game: {},
      polyline: true,
      shown: true,
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
          return time.getTime() > Date.now()
        }
      },
      stEt: [dateTimeFormat(new Date().getTime() - 3600 * 1000 * 24 * 7), dateTimeFormat(new Date().getTime())],
      PS: [
        {title: '万位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
        {title: '千位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
        {title: '百位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
        {title: '十位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
        {title: '个位', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
      ],
      // line 遗漏
      type: 0,
      // data: [
      // ],
      myData: [],
      fData: [
        {issue: '出现总次数', myClass: 'bg-white border-top', numbers: Array(55).fill(0).map(n => (n = {n: 0}))},
        {total: 1, issue: '平均遗漏值', myClass: 'bg-white ', numbers: Array(55).fill(0).map(n => (n = {n: 0}))},
        {issue: '最大遗漏值', myClass: 'bg-white', numbers: Array(55).fill(0).map(n => (n = {n: 0}))},
        {issue: '最大连出值', myClass: 'bg-white', numbers: Array(55).fill(0).map(n => (n = {n: 0}))}
      ],
      lines: []
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'openRoute',
    gameid () {
      this.trendData()
    },
    size () {
      if (this.st) this.st = ''
      this.trendData()
    },
    st () {
      if (this.st) this.trendData()
    }
  },
  computed: {
    gameid () {
      return this.game.lotteryId
    }
    // Cdata () {
    //   return this.myData.map(c => {
    //     return {
    //       issue: c.issue,
    //       numbers: c.misseddata.replace(/\[/g, '').replace(/]/g, '').replace(/\{/g, '').replace(/\},/g, ',')
    //     }
    //   })
    // }
  },
  created () {
    // this.data = []
    // for (let i = 18820; i < 18830; i++) {
    //   let o = {issue: i, numbers: [], myClass: 'text-bbb'}
    //   let k = i - 18820
    //   for (let j = 0; j < 50; j++) {
    //     // o['prop' + j] = j
    //     o.numbers.push({n: j, class: (j + k) === 1 || (j + k) === 10 || (j + k) === 20 || (j + k) === 30 || (j + k) === 40 || (j + k) === 50 ? 'ball' : ''})
    //   }
    //   this.data.push(o)
    // }
    // this.data.push({issue: '出现总次数', myClass: 'bg-white border-top'})
    // this.data.push({issue: '平均遗漏值', myClass: 'bg-white '})
    // this.data.push({issue: '最大遗漏值', myClass: 'bg-white'})
    // this.data.push({issue: '最大连出值', myClass: 'bg-white '})
    // this.data.forEach((d, j) => {
    //   d.numbers && d.numbers.forEach((s, i) => {
    //     if (s.class !== 'ball') return false
    //     if (i < 10) {
    //       !this.lines[0] && (this.lines[0] = '')
    //       this.lines[0] += 30.5 * (i + 0.5) + ',' + (34 * j + 15) + ' '
    //     } else if (i < 20) {
    //       !this.lines[1] && (this.lines[1] = '')
    //       this.lines[1] += 30.4 * (i + 0.5) + ',' + (34 * j + 15) + ' '
    //     } else if (i < 30) {
    //       !this.lines[2] && (this.lines[2] = '')
    //       this.lines[2] += 30.3 * (i + 0.5) + ',' + (34 * j + 15) + ' '
    //     } else if (i < 40) {
    //       !this.lines[3] && (this.lines[3] = '')
    //       this.lines[3] += 30.2 * (i + 0.5) + ',' + (34 * j + 15) + ' '
    //     } else if (i < 50) {
    //       !this.lines[4] && (this.lines[4] = '')
    //       this.lines[4] += 30.1 * (i + 0.5) + ',' + (34 * j + 15) + ' '
    //     }
    //   })
    // })
  },
  mounted () {
    this.getLotterys()
    this.$route.query.gameid && (this.gameid = this.$route.query.gameid)
  },
  methods: {
    openRoute ({path, query: {gameid}}) {
      if (path !== '/form/4-5-3') return false
      if (gameid) {
        this.gameid = gameid
        // TODO update data
      }
    },
    tableRowClassName (row, i) {
      return row.myClass
    },
    getLotterys () {
      this.$http.get(api.getLotterys).then(({data}) => {
        // success
        if (data.success === 1) {
          data.lotteryList.forEach(d => {
            d.class = (store.state.pages.find(p => p.gameid === d.lotteryId) || {}).class
          })
          this.gameList = data.lotteryList
        }
      }, (rep) => {
        // error
      })
    },
    trendData () {
      let loading = this.$loading({
        text: '数据查询中...',
        target: this.$el
      }, 10000, '数据查询超时...')
      this.$http.get(api.trendData, {id: this.gameid, size: this.st ? '' : this.size, date: this.st ? dateFormat(new Date(this.st).getTime(), 6).replace(/[\s-]*/g, '') : ''}).then(({data}) => {
        // success
        if (data.success === 1) {
          this.fData[0].numbers = Array(55).fill(0).map(n => (n = {n: 0}))
          this.fData[1].numbers = Array(55).fill(0).map(n => (n = {n: 0}))
          this.fData[2].numbers = Array(55).fill(0).map(n => (n = {n: 0}))
          this.fData[3].numbers = Array(55).fill(0).map(n => (n = {n: 0}))
          data.items.forEach(d => {
            d.misseddata = JSON.parse(d.misseddata)
            d.myClass = 'text-bbb'
            // d.series = JSON.parse(d.series)
            // d.totalmissed = JSON.parse(d.totalmissed)
            // d.totalseries = JSON.parse(d.totalseries)
            d.misseddata.forEach((s, i) => {
              Object.keys(s).forEach((key) => {
                // if (i * 10 + parseInt(key.replace(/[a-zA-Z]/g, '')) === 6) console.log(s[key])
                // 平均遗漏值
                this.fData[1].numbers[i * 10 + parseInt(key.replace(/[a-zA-Z]/g, ''))].n += parseInt(s[key])
                // 最大遗漏值
                parseInt(s[key]) > this.fData[2].numbers[i * 10 + parseInt(key.replace(/[a-zA-Z]/g, ''))].n && (this.fData[2].numbers[i * 10 + parseInt(key.replace(/[a-zA-Z]/g, ''))].n = parseInt(s[key]))
              })
            })
          })
          this.fData[1].total = data.items.length
          this.myData = data.items
          this.lines = []

          this.myData.forEach((d, j) => {
            d.code.split(',').forEach((s, i) => {
              !this.lines[i] && (this.lines[i] = '')
              this.lines[i] += 30.5 * (parseInt(s) + 11.8 * i + 0.5) + ',' + (34 * j + 15) + ' '
              // 总出现
              // this.$set(this.fData[0].numbers, i * 10 + parseInt(s), parseInt(s))
              this.fData[0].numbers[i * 10 + parseInt(s)].n += 1
              // 最大连出值
              if (this.fData[3].numbers[i * 10 + parseInt(s)].i === j - 1) {
                this.fData[3].numbers[i * 10 + parseInt(s)].temp += 1
                this.fData[3].numbers[i * 10 + parseInt(s)].i = j
              } else {
                this.fData[3].numbers[i * 10 + parseInt(s)].temp = 1
                this.fData[3].numbers[i * 10 + parseInt(s)].i = j
              }
              if (this.fData[3].numbers[i * 10 + parseInt(s)].temp > this.fData[3].numbers[i * 10 + parseInt(s)].n) {
                this.fData[3].numbers[i * 10 + parseInt(s)].n = this.fData[3].numbers[i * 10 + parseInt(s)].temp
              }
            })
          })
          setTimeout(() => {
            loading.text = '查询成功!'
          }, 100)
          // this.gameList = data.lotteryList
        } else loading.text = '查询失败!'
      }, (rep) => {
        // error
      }).finally(() => {
        setTimeout(() => {
          loading.close()
        }, 1000)
      })
    }
  },
  components: {
  }
}
</script>


<style lang="stylus">
.app.night .trend-chart-page
  BC = #999
  BOC = #000
  .el-table
    // color BC
    border-color BOC
    thead
    table
    th
    tr
    td
      background-color #333
      border-color BOC
      color BC
      
    .bg-light-blue
      background-color #666
      // color #ccc
    .bg-light-danger
      background-color #555
      // color #ccc
      
    .bg-white
      background-color #333
      border-color BOC
      color BC
  
</style>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  H = 1rem
  .scroll-content
    top TH * 4
    // bottom TH * 1.7
  .game-info
    text-align left
    padding PWX
    padding-left .8rem
    .text-button
      padding 0 .05rem
  .trend-chart
    padding 0 PWX 
    text-align center
    
    .chart
      // min-width 14.4rem
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

