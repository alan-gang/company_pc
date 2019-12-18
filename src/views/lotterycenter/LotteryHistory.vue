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
        span 重庆时时彩
    div.lottery-header
      GameInfo(
        ref="GI"
        v-on:set-timeout="fetchTimeout"
        v-bind:timeout="timeout"
        v-bind:game-type="gameType"
        v-bind:NPER="NPER"
        v-bind:CNPER="CNPER"
        v-bind:type="type"
        v-bind:class="[['game-header-' + 'lottery-history']]"
        v-on:set-NPER="setNPER"
        v-bind:gameid="gameid"
        v-bind:allLuckyNumbers="allLuckyNumbers"
        v-bind:methodid="methodid"
        v-bind:overtime="overtime"
        v-bind:lucknumbers="lucknumbers"
      )
</template>

<script>
import GameInfo from '../../components/GameInfo'
import api from '../../http/api'
export default {
  components: {
    GameInfo
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
      gameType: 'SSC',
      gameid: 1,
      lucknumbersTimeout: 0,
      allLuckyNumbers: []
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
  methods: {
    fetchTimeout () {
      this.timeout = 0
    },
    setNPER (n) {
      this.NPER = n
    },
    // 获得当前已开奖信息
    __recentlyCode (noloop) {
      if (!noloop && this.lucknumbersTimeout) clearTimeout(this.lucknumbersTimeout)
      this.$http.mypost(api.recentlyCodeNew, {gameid: this.page.gameid, pageNum: 1, size: 100}).then(({data}) => {
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
      this.$http.mypost(api.getIssue, {gameid: this.page.gameid}).then(({data}) => {
        // success
        if (data.success > 0) {
          // 当前期
          // this.NPER = (parseInt(data.issue) || 1) - 1
          this.CNPER = data.issue
          this.PNPER = data.openedCount
          this.FNPER = data.dailyCount
          this.timeout = Math.floor((data.saleend - data.current) / 1000) || Math.random()
          this.codeMissColdHeat()
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
    }
  }
}
</script>

<style lang="stylus">
.lottery-history ~ .el-carousel.ad
.lottery-history ~ .our-game
  display none
.lottery-history
  padding-bottom .6rem
  position relative
  .content-width
    background #fff
  .lottery-header

  div.page-position
    line-height .5rem
    font-size 12px
    color #999
    padding-left .2rem
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
</style>
