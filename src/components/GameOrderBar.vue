<template lang="jade">
  el-row

    el-popover(ref="times" placement="top" v-bind:offset="0" trigger="click" v-model="show" v-bind:popper-class="'popover-blue popover-times ' + (ts.length > 0 ? true : false)")
      dl.submenu
        dd(v-for="i in tss" @click="(show = false) || (t = i)") {{ i }}

    el-col.left(:span="16")
      .ds-button.xx-small.outline.minus(@click="t > 1 && t--" v-bind:class="{disabled: times === 1 }") 一
      el-input-number.ds-button.small.input.outline.times(v-model="t" v-bind:min="1" v-popover:times="times" v-bind:max="MAXTIMES") 
      .ds-button.xx-small.outline.plus(size="mini" @click="t++") 十
      span.bei &nbsp;倍
      .ds-button-group
        .ds-button.x-small.text-button(v-for=" (c, index) in currencies " @click="cIndex = index" v-bind:class="{selected: index === cIndex}") {{c.title}}
      
      el-slider(v-model="p" v-bind:max="max" v-bind:min="min" v-if="P")
      span.p(v-if="P") {{ ps}} - {{ prize }}

    el-col.right(:span="8")
      | 已选 
      span.count {{ n }} 
      | 注&nbsp;&nbsp;共 
      span.pay {{ pay }}
      |  元
      .ds-button.primary.bold(v-bind:class="{disabled: !canOrder}" @click="canOrder && order()") 选号




</template>

<script>
export default {
  props: ['times', 'currency', 'point', 'n', 'pay', 'canOrder', 'P'],
  data () {
    return {
      XXX: 19,
      XM: 100,
      XMM: 0,
      S: 100,
      MAXTIMES: 100,
      cIndex: 0,
      currencies: [
        {title: '元', value: 1, model: 1},
        {title: '角', value: 0.1, model: 2},
        {title: '分', value: 0.01, model: 3},
        {title: '厘', value: 0.001, model: 4}
      ],
      p: 0,
      ts: [1, 3, 5, 10, 20, 50],
      show: false,
      t: 1
    }
  },
  computed: {
    tss () {
      return this.ts.reverse()
    },
    max () {
      return Math.floor(this.P.maxpoint * 10000) || 800
    },
    min () {
      return Math.floor(this.P.minpoint * 10000) || 0
    },
    // step () {
    //   return (this.P.maxpoint - this.P.minpoint) / 10
    // },
    // point string
    ps () {
      return (this.p / 100).toFixed(2) + '%'
    },
    prize () {
      return (this.P.maxprize - (this.p - this.min) * (this.P.maxprize - this.P.minprize) / (this.max - this.min)).toFixed(3)
    }
  },
  watch: {
    cIndex () {
      this.$emit('set-currency', this.currencies[this.cIndex])
    },
    p () {
      if (this.p < this.min) this.p = this.min
      else if (this.p > this.max) this.p = this.max
      this.$emit('set-point', (this.p / 10000).toFixed(4), this.prize)
    },
    t () {
      this.setTimes(this.t)
    },
    // p changing or prize changing need update point and bonus in game/common.vue
    prize () {
      this.$emit('set-point', (this.p / 10000).toFixed(4), this.prize)
    }
  },
  mounted () {
    // console.log('new orderbar, point:', this.point)
    this.t = this.times
    this.p = this.point * 10000
    this.cIndex = this.currency.model - 1
    // setTimeout(() => {
    //   this.$emit('set-point', this.p / 10000, this.prize)
    // }, 0)
  },
  methods: {
    setTimes (t) {
      this.$emit('set-times', t)
    },
    order () {
      if (this.n > (this.P.maxCount || 1) || this.n < (this.P.minCount || 0)) {
        if (this.n > (this.P.maxCount || 1)) {
          return this.$modal.warn({
            content: '<div class="text-666" style="text-align: left; line-height: .3rem;text-indent: .15rem">该玩法一个方案最多投注量：<span class="text-danger">' + this.P.maxCount + '</span> 注',
            btn: ['确定'],
            target: this.$el.parentNode
          })
        } else {
          return this.$modal.question({
            content: '<div class="text-666" style="text-align: left; line-height: .3rem;text-indent: .15rem">该玩法一个方案投注量少于：<span class="text-danger">' + this.P.minCount + '</span> 注，奖金受限',
            btn: ['继续购买', '再来几注'],
            target: this.$el.parentNode,
            O: this,
            ok () {
              this.$emit('order')
            }
          })
        }
      }
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
    // color #666
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
    top -.09rem
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
      // color #666
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
