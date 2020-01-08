<template lang="jade">
  div.lottery-history
    div.content-width
      div.page-position
        span.title 您的位置：
        router-link(class="home" to="/") 首页
        span.icon-slice >
        span 彩票游戏
        span.icon-slice >
        router-link(to="/lotterycenter") 开奖中心
        span.icon-slice >
        span {{game.title}}
      div.lottery-header
        GameInfo(
          ref="GI"
          v-on:set-timeout="fetchTimeout"
          v-bind:timeout="timeout"
          v-bind:game-type="gameType"
          v-bind:NPER="NPER"
          v-bind:CNPER="CNPER"
          v-bind:type="type"
          v-bind:class="`is-lottery-history ${game.class ? 'game-header-' + game.class : ''}`"
          v-on:set-NPER="setNPER"
          v-bind:gameid="gameid"
          v-bind:allLuckyNumbers="allLuckyNumbers"
          v-bind:methodid="methodid"
          v-bind:overtime="overtime"
          v-bind:lucknumbers="lucknumbers"
          v-bind:isLotteryHistory="true"
          v-bind:game="game"
        )
      div.search-box
        div.page-size
          span(v-bind:class="{active: searchIndex === 0}" @click="changeSearchIndex(0)") 最近30期
          span(v-bind:class="{active: searchIndex === 1}" @click="changeSearchIndex(1)") 最近50期
          span(v-bind:class="{active: searchIndex === 2}" @click="changeSearchIndex(2)") 最近100期
          span(v-bind:class="{active: searchIndex === 3}" @click="changeSearchIndex(3)") 最近200期
        div.search-date
          span(v-bind:class="{active: searchIndex === 4}" @click="changeSearchIndex(4)") 今天
          span(v-bind:class="{active: searchIndex === 5}" @click="changeSearchIndex(5)") 昨天
          span(v-bind:class="{active: searchIndex === 6}" @click="changeSearchIndex(6)") 前天
          div.date-picker-comp
            span 时间
            el-date-picker(v-model="datePickerVal" v-bind:picker-options="pickerOptions" type="date" placeholder="选择日期" @change="datePickerChange")
        span.search-btn(@click="search") 搜索
      div.lottery-history-table(v-loading="loading")
          div.thead
            span.th.title(v-for="headName in thead") {{headName}}
          div.tbody
            template(v-for="lottery in allLuckyNumbers")
              div.tr(v-show="lottery.code" v-bind:key="lottery.lotteryid + 'id' + lottery.issue")
                div.td {{`第${lottery.issue}期开奖`}}
                div.td {{dayjs(lottery.openTime).format('YYYY.MM.DD HH:mm:ss')}}
                div.td.open-code
                  div.code-box
                    span.num(v-for="num in lottery.code.split(',')") {{num}}
                div.td
                  span.icon-zst(@click="goZst")

</template>

<script>
import GameInfo from '../../components/GameInfo'
import api from '../../http/api'
import { DatePicker } from 'element-ui'
import dayjs from 'dayjs'
export default {
  components: {
    GameInfo,
    'el-date-picker': DatePicker
  },
  data() {
    return {
      // 最近的已开奖期数
      NPER: '100000000', // 下一期
      CNPER: '100000000', // 当前
      // 用户选择投注的起始期数
      // usernper: '100000000',
      // 最近的已开奖期号码
      lucknumbers: [0, 0, 0, 0, 0],
      // 即将开奖的期数
      // CNPER: 150730053 + 1,
      // 即将开奖倒计时
      // 秒
      timeout: (100 * 3600) - 1,
      gameid: 1,
      lucknumbersTimeout: 0,
      allLuckyNumbers: [],
      overtime: false,
      type: 1, // 1 投注  2 追号
      pageSize: 30,
      datePickerVal: '',
      searchIndex: 0,
      realIndex: 0,
      thead: ['期号', '开奖时间', '开奖号码', '走势图表'],
      loading: false,
      dayjs,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.gameid = Number(this.$route.params.id)
    }
  },
  computed: {
    game() {
      let game = {}
      if (this.$attrs.menus && this.$attrs.menus[6] && this.gameType) {
        this.$attrs.menus[6].groups.some(item => {
          return item.items.some(lottery => {
            if (Number(lottery.gameid) === Number(this.gameid)) {
              game = lottery
              return true
            }
          })
        })
      }
      return game
    },
    gameType() {
      let type = ''
      if (this.$attrs.menus && this.$attrs.menus[6]) {
        let arr = this.$attrs.menus[6].groups
        arr.some(item => {
          let flag = item.items.some(temp => {
            if (Number(temp.gameid) === Number(this.gameid)) {
              if (item.url === 'OTHER') {
                type = temp.url
              }
              return true
            }
          })
          if (flag && item.url !== 'OTHER') type = item.url
          return flag
        })
      }
      return type
    }
  },
  watch: {
    timeout () {
      if (this.timeout === 0) {
        setTimeout(this.__getIssue, 1000)
        // this.__getTraceIssueList()
        setTimeout(this.__recentlyCode, 1000)
        setTimeout(this.__recentlyCode, 5000)
      } else if (this.timeout < 1) {
        setTimeout(this.__getIssue, 1000)
      }
    }
  },
  mounted() {
    // 获得当前奖期
    this.__getIssue()
    // 获得游戏所有奖期的开奖时间
    // this.__getTraceIssueList()
    // 获得历史开奖号码
    this.__recentlyCode()
  },
  beforeDestroy () {
    clearTimeout(this.lucknumbersTimeout)
  },
  methods: {
    search() {
      this.realIndex = this.searchIndex
      let params = this.getParams()
      this.loading = true
      this.$http.mypost(api.recentlyCodeNew, params).then(
        ({data}) => {
          if (data.success > 0 && data.items.length > 0) {
            this.allLuckyNumbers = data.items
          }
          this.loading = false
        },
        (rep) => {
          this.loading = false
      })
    },
    getParams() {
      let params = {
        gameid: Number(this.gameid)
      }
      switch (this.realIndex) {
        case 0:
          params.size = 30
          break
        case 1:
          params.size = 50
          break
        case 2:
          params.size = 100
          break
        case 3:
          params.size = 200
          break
        case 4:
          params.timeStamp = dayjs().valueOf()
          break
        case 5:
          params.timeStamp = dayjs().subtract(1, 'day').valueOf()
          break
        case 6:
          params.timeStamp = dayjs().subtract(2, 'day').valueOf()
          break
        default:
          params.timeStamp = dayjs(this.datePickerVal).valueOf()
      }
      return params
    },
    goZst() {
      let href = window.location.href
      let url = 'https://www.ds-graph.com:8000/xy/'
      if (href.indexOf('.net') !== -1) url = 'https://graph.dongsens.net:8000/xy/'
      if (href.indexOf('192.168.') !== -1 || href.indexOf('www.game.com') !== -1) url = 'http://192.168.169.75:8000/xy/'
      window.open(url + '#?gameid=' + this.gameid)
    },
    datePickerChange(val) {
      if (val) this.searchIndex = ''
    },
    changeSearchIndex(val) {
      this.datePickerVal = ''
      this.searchIndex = val
    },
    fetchTimeout () {
      this.timeout = 0
    },
    setNPER (n) {
      this.NPER = n
    },
    // 获得当前已开奖信息
    __recentlyCode (noloop) {
      if (!noloop && this.lucknumbersTimeout) clearTimeout(this.lucknumbersTimeout)
      let params = this.getParams()
      this.$http.mypost(api.recentlyCodeNew, params).then(({data}) => {
        // success
        if (data.success > 0 && data.items.length > 0) {
          data.items.forEach(d => {
            d.lucknumbers = d.code.split(',')
            // 如果没有code, 但已经有了code
            if (!d.code) {
              let the = this.allLuckyNumbers.find(x => String(x.issue) === String(d.issue))
              the && (d = Object.assign(d, the))
            }
          })
          let lst = data.items[1] || data.items[0]
          if (data.items[0] && data.items[0].code) lst = data.items[0]
          this.overtime = false
          this.NPER = lst.issue + ''
          this.lucknumbers = lst.lucknumbers
          this.allLuckyNumbers = data.items || []
        } else if (data.success >= 0) {
          this.overtime = true
          this.lucknumbersTimeout = setTimeout(() => {
            this.__recentlyCode()
            clearTimeout(this.lucknumbersTimeout)
            this.lucknumbersTimeout = 0
          }, 3000)
        }
      }, (rep) => {
        // error
      })
    },
    // 获得当前正在进行的奖期信息
    __getIssue () {
      this.$http.mypost(api.getIssue, {gameid: this.gameid}).then(({data}) => {
        // success
        if (data.success > 0) {
          // 当前期
          // this.NPER = (parseInt(data.issue) || 1) - 1
          this.CNPER = data.issue
          this.PNPER = data.openedCount
          this.FNPER = data.dailyCount
          this.timeout = Math.floor((data.saleend - data.current) / 1000) || Math.random()
          // this.codeMissColdHeat()
        } else {
          // this.$message.error({message: '当前奖期获取失败！'})
          this.$modal.warn({
            target: this.$el,
            content: '当前奖期已停止销售！',
            btn: ['好的']
          })
          // this.timeout += 0.05
        }
      }, (rep) => {
        // error
        this.$message.error({message: '当前奖期获取失败！'})
        this.timeout += 0.05
      })
    },
    __openWinCode (x) {
      if (String(this.gameid) === String(x.lottId)) {
        x.lucknumbers = x.code.split(',')
        this.overtime = false
        // this.NPER = x.issue + ''
        this.lucknumbers = x.lucknumbers
        parseInt(window.localStorage.getItem('volume')) && this.__setCall({fn: '__music', callId: undefined})
        // this.allLuckyNumbers.splice(0, 0, x)
        let the = this.allLuckyNumbers.find(y => String(x.issue) === String(y.issue))
        if (the) {
          the = Object.assign(the, x)
          this.NPER = x.issue + ''
        } else {
          this.allLuckyNumbers.splice(0, 0, x)
          this.NPER = x.issue + ''
        }
        this.__setCall({fn: '__orderlist'})
        // this.updateFromSocket = true
        // this.codeMissColdHeat()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.lottery-history ~ .el-carousel.ad
.lottery-history ~ .our-game
  display none
.lottery-history
  padding-bottom .6rem
  position relative
  user-select none
  .content-width
    background-image: linear-gradient(
      #e9e9e9,
      #e9e9e9),
    linear-gradient(
      #ffffff,
      #ffffff);
    background-blend-mode: normal,
      normal;
    box-sizing border-box
    padding 0 .1rem
  div.page-position
    line-height .5rem
    font-size 12px
    color #999
    padding-left .15rem
    .home
      padding-left .2rem
      background url('~@/assets/lotterycenter/icon-home.png') no-repeat
      background-position left .16rem
      margin-left: .08rem
      display inline-block
      transition .2s
    a
      color #999
      &:hover
        color #333
    .icon-slice
      display inline-block
      width .2rem
      text-align center
  .search-box
    height .68rem
    line-height .68rem
    border-radius 4px 4px 0 0
    background #fff
    margin-top .16rem
    .page-size
    .search-date
      display: inline-block
      &.page-size
        margin-right .32rem
        span
          display inline-block
          margin-left .24rem
          color #666
          cursor pointer
          transition .2s ease
          &.active
            color #f37e0c
      &.search-date
        >span
          display inline-block
          cursor pointer
          width .8rem
          text-align center
          height .3rem
          line-height .3rem
          background-image linear-gradient(0deg, #f3f3f3 0%, #fff 100%)
          border 1px solid #e0e0e0
          border-radius 3px
          margin-right 8px
          box-sizing border-box
          transition .2s ease
          &.active
            background #f37e0c
            color #fff
            border-color #f37e0c
        .date-picker-comp
          display inline-block
          span
            margin-right .12rem
    .search-btn
      display inline-block
      width .98rem
      line-height .3rem
      text-align center
      border-radius 4px
      background-color #f37e0c
      cursor pointer
      transition .2s ease
      color #fff
      margin-left .56rem
      &:hover
        opacity .8
  .lottery-history-table
    line-height .48rem
    padding-bottom .4rem
    .icon-zst
      background url('~@/assets/lotterycenter/icon-zst.png') no-repeat
      background-position center center
      height .48rem
      width 100%
      display inline-block
      vertical-align middle
      cursor pointer
    .thead
       background-image: linear-gradient(0deg,
        #e7e7e7 0%,
        #cccccc 100%),
      linear-gradient(
        #ececec,
        #ececec);
      background-blend-mode: normal,
        normal;
    .th
    .td
      text-align center
      display inline-block
      height 100%
      &:nth-child(1)
        width 2.3rem
      &:nth-child(2)
        width 2.2rem
      &:nth-child(3)
        width 6rem
        overflow hidden
      &:nth-child(4)
        width 1.1rem
    .tr
      background #fff
      display flex
      align-items center
      &:nth-child(even)
        background-image: linear-gradient(
          #fafafa,
          #fafafa),
        linear-gradient(
          #e7e7e7,
          #e7e7e7);
        background-blend-mode: normal,
          normal;
    .open-code
      padding-top .05rem
      display flex
      justify-content center
      .code-box
        overflow hidden
        display inline-block
      .num
        display inline-block
        width .36rem
        height .36rem
        line-height .36rem
        background-color #f37e0c
        border-radius 50%
        color #fff
        margin-right .22rem
        float left
        margin-bottom: .05rem
        &:last-child
          margin-right 0
    .open-more
    .bet
      display inline-block
      width .8rem
      line-height .26rem
      border-radius 4px
      text-align center
      cursor pointer
      &.open-more
        margin-right 6px
        box-sizing border-box
        color #f37e0c
        border 1px solid #f37e0c
      &.bet
        background-image: linear-gradient(90deg,
          #f17d0b 0%,
          #ff5429 100%),
        linear-gradient(
          #ffffff,
          #ffffff);
        background-blend-mode: normal,
          normal;
        color #fff
</style>
