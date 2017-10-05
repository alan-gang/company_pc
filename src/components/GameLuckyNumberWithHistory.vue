<template lang="jade">
  el-row.lucky-numbers(v-bind:class="['game-' + gameType]")
    
    el-col.left(:span="onlyNumber ? 24 : longNumbers ? 20 : 18")
      el-popover(placement="bottom-start" trigger="hover"  v-bind:popper-class="'popover-orderlist popover-luckynumber'" ref="MO" v-if="!nopopper")
        span(slot="reference")
          div(style="display: inline-block;")
            span.NPER {{ NPER }} 
            | 期 &nbsp;
            .number(v-if="isNumber" v-for=" (n, i) in lucknumbers " v-bind:class="'ds-icon-' + gameType + '-' +  (i + 1) " style="overflow: hidden;") 
              //.the-number {{ n }}
              //.the-number(v-if="String(n).length > 1" v-for=" (xx, nn ) in Array(15) " v-bind:style=" {transform: 'translateY(' + (-100 * n)  + '%)' , transition: 'transform ' + (1 + (1 * i))  + 's ease' } ") {{ n | padStart(2, 0)  }}
              //.the-number(v-if="String(n).length === 1" v-for=" (xx, nn ) in Array(15) " v-bind:style=" {transform: 'translateY(' + (-100 * n)  + '%)' , transition: 'transform ' + (1 + (1 * i))  + 's ease' } ") {{ n }}
              .the-number(v-for=" (xx, nn ) in Array(15) " v-bind:style=" {transform: 'translateY(' + (-100 * n)  + '%)' , transition: 'transform ' + (1 + (1 * i))  + 's ease' } ") {{ nn === parseInt(n) ? n : nn }}

            span.number-array(v-if = " isArray " v-for=" ns in lucknumbers " )
              span.number(v-for=" (n, i) in ns " v-bind:class="'ds-icon-' + gameType + '-' +  (i + 1) " style="overflow: hidden;") 
                // span.the-number {{ n | padStart(2, 0) }}
                .the-number(v-for=" (xx, nn ) in Array(81) " v-bind:style=" {transform: 'translateY(' + (-100 * n)  + '%)' , transition: 'transform ' + (1 + (1 * i))  + 's ease' } ") {{ nn | padStart(2, 0) }}

              
            // Dice.dead(v-if="isDice" v-for=" n in lucknumbers " v-bind:value=" n ")

            .number(v-if="isDice" v-for=" (n, i) in lucknumbers " style="background: none; overflow: hidden; border-radius: 0; vertical-align: middle; top: 0; box-shadow: none;" )
              Dice.dead(style="display: block; position: relative; left: -.05rem; top: -.05rem; " v-for=" (xx, nn ) in Array(6) " v-bind:value=" nn + 1 " v-bind:style=" {transform: 'translateY(' + (-100 * (n - 1))  + '%) scaleX(0.8076923076923077) scaleY(0.8076923076923077)' , transition: 'transform ' + (1 + (1 * i)) + 's ease' } ")


            span.timeout(v-if="!longNumbers && !onlyNumber && overtime" @click="fresh") &nbsp;开奖中，点击可刷新
        slot
          GameLuckyNumberHistory(v-bind:game-type="gameType" v-bind:gameid="gameid" v-bind:allLuckyNumbers="allLuckyNumbers")

    el-col.right(:span=" longNumbers ? 4 : 6" v-bind:class="{ 'line-2': longNumbers }" v-if="!onlyNumber")
      span.timeout(v-if="longNumbers" @click="fresh") &nbsp;开奖中，点击可刷新
        br
      | 已派奖
      span.PNPER {{ PNPER }}
      | 期，总共
      span.FNPER {{ FNPER }}
      | 期
</template>

<script>
import Dice from './Dice'
import GameLuckyNumberHistory from './GameLuckyNumberHistory'
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
    gameid: Number,
    allLuckyNumbers: Array,
    nopopper: Boolean
  },
  data () {
    return {
      my: [2, 2, 2]
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
  watch: {
    // lucknumbers () {
    // }
  },
  methods: {
    fresh () {
      this.__setCall({fn: '__recentlyCode'})
    }
  },
  components: {
    Dice,
    GameLuckyNumberHistory
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'

  body
    .popover-luckynumber
      transform translateX(-.1rem) translateY(.2rem)
      padding 0
      width auto    
     

</style>
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
      vertical-align middle
      position relative
      top -.03rem
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
        background-color rgba(0,0,0,0)
    
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
        // perspective 80px
        // perspective-origin  1.2rem center 
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
