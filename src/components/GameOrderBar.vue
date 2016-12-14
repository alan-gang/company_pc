<template lang="jade">
  el-row

    el-popover(ref="times" placement="top" v-bind:offset="0" trigger="click" v-model="show" v-bind:popper-class="'popover-blue popover-times ' + (ts.length > 0 ? true : false)")
      dl.submenu
        dd(v-for="i in tss" @click="(show = false) || (t = i)") {{ i }}

    el-col.left(:span="15")
      .ds-button.xx-small.outline.minus(@click="t > 1 && t--" v-bind:class="{disabled: times === 1 }") 一
      el-input-number.ds-button.small.input.outline.times(v-model="t" v-bind:min="1" v-popover:times="times") 
      .ds-button.xx-small.outline.plus(size="mini" @click="t++") 十
      span.bei &nbsp;倍
      .ds-button-group
        .ds-button.x-small.text-button(v-for=" (c, index) in currencies " @click="cIndex = index" v-bind:class="{selected: index === cIndex}") {{c.title}}
      
      el-slider(v-model="p" v-bind:max="max" v-bind:min="min")
      span.p {{ p }}%

    el-col.right(:span="9")
      | 已选 
      span.count {{ n }} 
      | 注&nbsp;&nbsp;共 
      span.pay {{ pay }}
      |  元
      .ds-button.primary.bold(v-bind:class="{disabled: !canOrder}" @click="canOrder && order()") 选号




</template>

<script>
export default {
  props: ['times', 'currency', 'point', 'n', 'pay', 'canOrder'],
  data () {
    return {
      cIndex: 0,
      currencies: [
        {title: '元', value: 1},
        {title: '角', value: 0.1},
        {title: '分', value: 0.01},
        {title: '厘', value: 0.001}
      ],
      points: ['1700-10%', '1600-10%', '300-10%', '3700-10%'],
      max: 1700,
      min: 40,
      p: 1700,
      ts: [1, 3, 5, 10, 20, 50],
      show: false,
      t: 1
    }
  },
  computed: {
    tss () {
      return this.ts.reverse()
    }
  },
  watch: {
    cIndex () {
      this.$emit('set-currency', this.currencies[this.cIndex])
    },
    p () {
      this.$emit('set-point', this.p)
    },
    t () {
      this.setTimes(this.t)
    }
  },
  created () {
    this.p = Math.floor(0.4 * this.max)
    this.t = this.times
  },
  methods: {
    setTimes (t) {
      this.$emit('set-times', t)
    },
    order () {
      this.$emit('order')
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  .el-popover.popover-times
    transform translateY(.07rem)
    .submenu
      padding .05rem 0
      dd
        padding 0 .25rem
        line-height .3rem
        cursor pointer
        &:hover
          color #fff
          background-color BLUE
</style>


<style lang="stylus" scoped>
  @import '../var.stylus'
  .el-row
    width 100%
    color #666
    background-color #fff
    &.fixed
      position absolute
      bottom 0
      border-bottom-right-radius .05rem
      border-bottom-left-radius .05rem
    .el-row
      width 100%
  .el-col
    min-height GOH

  .minus
  .times
  .plus
    vertical-align bottom
    position relative
    top -.1rem
  .times
    margin 0 .05rem
      
    
  .bei
    vertical-align bottom
    line-height .4rem  
    
  .ds-button-group
    height .3rem
    line-height .3rem
    display inline-block
    vertical-align middle
    margin 0 PW
    background-color #fff
    radius()
    overflow hidden
    border .01rem solid #ccc
    box-shadow .02rem .02rem .02rem rgba(0, 0, 0, .1)
    box-sizing border-box
    overflow visible
    .ds-button
      position relative
      top -.01rem
      color #666
      text-shadow none
      radius(0)
      &:last-child
        border-top-right-radius .05rem
        border-bottom-right-radius .05rem
      &:first-child
        border-top-left-radius .05rem
        border-bottom-left-radius .05rem
      &.selected
        background-color BLUE
        color #fff
        
    
  .right
    text-align right
    .ds-button
      vertical-align middle
      margin-left PW
  
  .count
  .pay
    color DANGER
    font-weight bold
  .p
    padding 0 PW
    color BLUE
    
</style>
