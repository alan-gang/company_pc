<template lang="jade">
  el-row.lucky-numbers(v-bind:class="['game-' + gameType]")
    el-col.left(:span="onlyNumber ? 24: 20")
      span.NPER {{ NPER }} 
      | 期 &nbsp;
      span.number(v-if="isNumber" v-for=" (n, i) in lucknumbers " v-bind:class="'ds-icon-' + gameType + '-' +  (i + 1) ") 
        span.the-number {{ n }}
      span.number-array(v-if = " isArray " v-for=" ns in lucknumbers ")
        span.number(v-for=" (n, i) in ns " v-bind:class="'ds-icon-' + gameType + '-' +  (i + 1) ") 
          span.the-number {{ n | padStart(2, 0) }}
        
      Dice.dead(v-if="isDice" v-for=" n in lucknumbers " v-bind:value="n")

      span.timeout(v-if="!longNumbers && !onlyNumber && overtime" @click="fresh") &nbsp;开奖中，点击可刷新
    el-col.right(:span="4" v-bind:class="{ 'line-2': longNumbers }" v-if="!onlyNumber")
      span.timeout(v-if="longNumbers" @click="fresh") &nbsp;开奖中，点击可刷新
        br
      | 已开
      span.PNPER {{ PNPER }}
      | 期，总共
      span.FNPER {{ FNPER }}
      | 期
</template>

<script>
import Dice from './Dice'
export default {
  props: {
    NPER: String,
    FNPER: Number,
    PNPER: Number,
    lucknumbers: Array,
    gameType: String,
    overtime: Boolean,
    onlyNumber: {
      type: Boolean,
      default: false
    },
    gameid: Number
  },
  data () {
    return {
    }
  },
  computed: {
    isDice () {
      return this.gameType === 'K3'
    },
    isNumber () {
      return !this.isDice && typeof this.lucknumbers[0] !== 'object'
    },
    isArray () {
      return !this.isDice && typeof this.lucknumbers[0] === 'object'
    },
    longNumbers () {
      return !this.isDice && this.isArray
    }
  },
  methods: {
    fresh () {
      this.__setCall({fn: '__recentlyCode'})
    }
  },
  components: {
    Dice
  }
}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  W = .42rem
  w = .26rem
  .lucky-numbers
    
      
    line-height LH
    margin 0
    padding 0 .1rem 0 .2rem
    font-size .12rem
    font-weight normal
    color #ddd
    background-color #666
    cursor default
    .number
      position relative
      top .03rem
      display inline-block
      width W
      height W
      line-height W
      margin 0 .04rem
      font-size .2rem
      text-align center
      color WHITE
      background-color DANGER
      radius(50%)
      box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
    .number-array 
      & + .number-array 
        margin-left PWX - .03rem
      .number
        position relative
        top -.01rem
        width w
        height w
        line-height w
        margin 0 0.015rem
        font-size .15rem
    .timeout
      color GOLD
      cursor pointer
      &:hover
        color GOLD-HOVER
      &:active
        color GOLD-ACTIVE
    // 115
    &.game-G115
      .number
        color #333
    
    // PK10
    &.game-PK10
      // .number
      //   width 1rem
      //   font-size .18rem
      //   background-position center (.36rem - .27rem)
      //   background-color transparent
      //   line-height .36rem
      //   box-shadow none
      //   .the-number
      //     position relative
      //     display inline-block
      //     width .35rem
      //     height .35rem
      //     background-color #fff
      //     radius(50%)
      //     shadow(0 0 0 2px #666)
      //     border 1px solid #bd0615
      //     color #fff
      //     background-color DANGER
      //     font-shadow()
    
    // K3
    &.game-K3
      .left
        // perspective 100px
      .dice
        display inline-block
        float none
        vertical-align middle
        // transform-style  preserve-3d 
        // transform translateZ(-10px)
        transform scaleX(42/52) scaleY(42/52)
          
  .left
    min-width 4.5rem
  .right
    text-align right
    &.line-2
      padding .1rem 0
      line-height .2rem

  
</style>
