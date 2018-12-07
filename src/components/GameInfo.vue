<template lang="jade">
  .game-header
    .wrap
      .game-logo
      .volume.ds-icon-volume.pointer(:class="{ on: volume }" @click=" setVolume() ")
      .game-countdow.inlb.text-666
        .vm.inlb.t_r
          span.title {{ CNPER.slice(-6) }}
          span &nbsp;&nbsp;期
          p 截止时间
        .vm.inlb.time-box.text-black.ft36
          span {{ showTime.split(':')[0] }}
          span.text-999.time-dot :
          span {{ showTime.split(':')[1] }}
          span.text-999.time-dot :
          span {{ showTime.split(':')[2] }}

      .game-win.inlb.text-666
        .vm.inlb.t_r
          span.title {{ NPER }}
          span &nbsp;&nbsp;期
          p.text-danger.pointer(@click="__setCall({fn: '__recentlyCode'})" v-if="overtime") 开奖超时，请刷新
        .vm.inlb

          RollingNumbers(v-bind:numbers=" numbers " v-bind:game-type="gameType" v-bind:hl=" ccs ? ccs.pos : '' ") 
        
        
</template>

<script>
import util from '../util'
import RollingNumbers from './RollingNumbers'
export default {
  props: {
    NPER: String,
    CNPER: String,
    timeout: Number,
    gameType: String,
    allLuckyNumbers: Array,
    methodid: String,
    overtime: Boolean
  },
  components: {
    RollingNumbers
  },
  data () {
    return {
      time: 0,
      interval: 0,
      t: 0,
      volume: false
    }
  },
  computed: {
    numbers () {
      return (this.allLuckyNumbers[0] || {lucknumbers: [0, 0, 0, 0, 0]}).lucknumbers
    },
    showTime () {
      return util.timeFormat(this.time)
    },
    codeStyle () {
      return this.allLuckyNumbers[0] && this.allLuckyNumbers[0].codeStyle ? this.allLuckyNumbers[0].codeStyle : this.allLuckyNumbers[1] ? this.allLuckyNumbers[1].codeStyle : ''
    },
    cs () {
      return this.codeStyle ? JSON.parse(this.codeStyle) : []
    },
    ccs () {
      return this.cs.filter(x => (x.methodId || []).indexOf(this.methodid) !== -1)[0]
    }
  },
  mounted () {
    this.time = this.timeout
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time--
      }
    }, 1000)
    this.volume = !!parseInt(window.localStorage.getItem('volume')) || false
  },
  watch: {
    t () {
      if (this.t !== 0) {
        setTimeout(() => {
          this.t = 0
        }, this.t)
      }
    },
    timeout () {
      this.time = Math.floor(this.timeout)
    },
    time () {
      if (this.time <= 0) {
        this.$emit('set-timeout', 0)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    setVolume () {
      this.volume = !this.volume
      window.localStorage.setItem('volume', this.volume ? 1 : 0)
    }
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  .game-header
    for n, i in chq
      &.game-header-ds-icon-game-{n}
        .wrap
          background-image url('../assets/gameheader/' + n '.jpg')
    .wrap
      height .8rem
      background-color #fff
      background-repeat no-repeat
      background-position left .2rem center      
      background-size 2rem
      padding-left 2.4rem
    
    .volume
      position absolute
      left 2.2rem
      top .14rem
      width .2rem
      height .2rem
    .vm
      vertical-align middle
    
    .game-countdow
      padding .12rem .2rem
      height .56rem
    .time-box
      height 100%
      line-height .56rem
      margin-left .2rem
      font-family Arial-BoldMT
      border-radius 5px
      box-shadow 0 0 10px rgba(0,0,0, .4) inset
      padding 0 .2rem
    .time-dot
      padding 0 .1rem
      
</style>

