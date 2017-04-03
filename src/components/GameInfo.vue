<template lang="jade">
  el-row.game-info

    el-col.left(:span="18")
      span.title {{ CNPER }}
      | &nbsp;&nbsp;期
      span.ds-icon-clock {{ showTime }}
      .ds-button.outline.small.instruction ? {{ type.title }}
        .popover-instruction.font-white
          p(style="line-height: .25rem")
            span.label.font-gold 玩法说明：
            {{ type.description || '暂无' }}
          p(style="line-height: .25rem")
            span.label.font-gold 中奖举例：
            {{ type.example || '暂无' }}
      router-link.ds-icon-polyline.ds-button.outline.small(:to=" {path: '/form/4-5-3', query: { gameid:  gameid}}  ") 走势图

    el-col.right(:span="6")
      el-button-group.right
        router-link.ds-button.text-button(:to=" {path: '/form/4-1-1', query: { gameid:  gameid}} ") 投注记录
        router-link.ds-button.text-button(:to=" {path: '/form/4-2-1', query: { gameid:  gameid}} ") 追号记录
</template>

<script>
import util from '../util'
export default {
  props: {
    // NPER: Number,
    CNPER: Number,
    timeout: Number,
    type: Object,
    gameid: Number
    // title: String
  },
  data () {
    return {
      // 默认倒计时
      defautTime: 1 * 5,
      time: 0,
      lstTimeout: 0
    }
  },
  computed: {
    showTime () {
      return util.timeFormat(this.time)
    }
  },
  mounted () {
    this.time = this.timeout
    setInterval(() => {
      if (this.time <= 0 || !this.time) {
        this.$emit('set-NPER', this.CNPER)
        this.time = this.lstTimeout || this.defautTime
      } else {
        this.time--
      }
    }, 1000)
  },
  watch: {
    timeout () {
      this.time = this.timeout
      if (this.time > 0) this.lstTimeout = this.time
    }
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  

</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  F = .3rem
  .game-info
    background-color: #ededed;
    // height GH
    line-height GH
    margin 0
    padding 0 .1rem 0 .2rem
    font-size .12rem
    font-weight normal
    color #666
    background-position .2rem .2rem

  .ds-icon-clock
    margin-left .2rem
    padding-left .32rem
    font-size F
    color DANGER
    font-family Roboto
    font-weight bold
      
  .left
    min-width 6rem
    .title
      padding-left .8rem
      font-size F
      font-family Roboto
      font-weight bold
      color #666
    .outline
      vertical-align super
      margin-left .2rem
      padding-left .08rem
      padding-right .1rem
    .ds-icon-polyline
      padding 0 .1rem 0 .36rem
      margin-left .1rem
    .instruction
      position relative
      &:hover
        color WHITE
        background-color rgba(22, 113, 188, .9)
        border-bottom-left-radius 0
        border-bottom-right-radius 0
        border none
        padding 0 .11rem 0 .09rem
        .popover-instruction
          display block
    
  .right
    min-width 1.5rem
    text-align right
    .text-button
      font-size .12rem
      color #666
      text-shadow none
      padding PW .1rem
      &:hover
        color BLUE
      &:active
        color #087ad8
  
  .popover-instruction
    display none
    position absolute
    top 100%
    min-width 100%
    left 0rem
    padding PW .2rem 0 .2rem
    text-align left
    background-color rgba(22, 113, 188, .95)
    box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
    radius()
    border-top-left-radius 0
    z-index 1
    cursor text
    user-select text
    
    p
      
      min-width 3.6rem
      padding-left .6rem
      margin 0 0 PW 0
      .label
        &::selection
          background-color GOLD
        position absolute
        left .2rem

</style>
