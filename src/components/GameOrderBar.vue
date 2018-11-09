<template lang="jade">
  el-row(v-bind:class="['game-' + gameType]")



    el-popover(ref="ft" placement="top" v-bind:offset="0" trigger="click" v-model="ftshow" v-bind:visible-arrow="false" v-bind:popper-class="'popover-blue popover-times ' + (fts.length > 0 ? true : false)")
      dl.submenu
        dd(v-for="i in fts" @click="(ftshow = false) || (ft = i)") {{ i }}
    
    



    el-popover(ref="times" placement="top" v-bind:offset="0" trigger="click" v-model="show" v-bind:visible-arrow="false" v-bind:popper-class="'popover-blue popover-times ' + (ts.length > 0 ? true : false)")
      dl.submenu
        dd(v-for="i in tss" @click="(show = false) || (t = i)") {{ i }}
    

    // el-col.left(:span="4" v-show="HC6")
        



    el-col.left(:span="14")
      span(v-show="HC6") 快速金额
      el-input-number.input.times.my-center(style="width: .5rem;" v-model="ft" v-bind:min="0" v-popover:ft="ft" v-show="HC6")
      .ds-button.xx-small.outline.minus(@click="t > 1 && t--" v-bind:class="{disabled: times === 1 }" v-show="!HC6") 一
      el-input-number.input.times.my-center(style="width: .5rem;" v-model="t" v-bind:min="0" v-popover:times="times" v-show="!HC6") 
      .ds-button.xx-small.outline.plus(size="mini" @click="t++" v-show="!HC6") 十
      span.bei(v-show="!HC6") &nbsp;倍
      .ds-button-group
        .ds-button.x-small.text-button(v-for=" (c, index) in currencies " @click="cIndex = index" v-bind:class="{selected: index === cIndex}" v-if="!HC6 || (HC6 && index < 2)") {{c.title}}
      
      el-slider(v-model="p" v-bind:max="max" v-bind:min="min" v-if="P && !(P.maxpoint === P.minpoint)" v-show="!HC6")
      span.p(v-if="P && !(P.maxpoint === P.minpoint)" v-show="!HC6") {{ ps}} - {{ prize }}

    el-col.right(:span=" 10 ")
      | 已选 
      span.count {{ n }} 
      | 注&nbsp;&nbsp;共 
      span.pay {{ pay.toFixed(3) }}
      |  元
      .ds-button.success.random.bold.large(@click="!tt && (tt = 750) && __setCall({fn: '__random', args: {}})" v-show="HC6") 机选
      // .ds-button.primary.bold.large(v-bind:class="{disabled: !canOrder}" @click="canOrder && order()" v-show="!HC6") 选号
      .ds-button.danger.bold(v-bind:class="{disabled: !canOrder}" @click="canOrder && order(true)"  v-show="HC6") 一键下单
      .buttons(v-show="!HC6")
        .ds-button.danger.bold.large(v-bind:class="{disabled: !canOrder}" @click="canOrder && sh()") 梭哈
        .ds-button.primary.bold(v-bind:class="{disabled: !canOrder}" @click="canOrder && order(true)") 一键下单
        .ds-button.success.bold.large(@click="!tt && (tt = 750) && __setCall({fn: '__random', args: {}})") 机选
        .ds-button.primary.bold.large(v-bind:class="{disabled: !canOrder}" @click="canOrder && order()") 选号




</template>

<script>
import store from '../store'
export default {
  props: ['model', 'times', 'currency', 'point', 'n', 'pay', 'canOrder', 'P', 'gameType', 'type', 'ns'],
  data () {
    return {
      me: store.state.user,
      XXX: 19,
      XM: 100,
      XMM: 0,
      S: 100,
      // MAXTIMES: 1000000000,
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
      t: 1,
      // 快速金额
      ft: 2,
      fts: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 10000],
      ftshow: false,
      // for random
      tt: 0
    }
  },
  computed: {
    HC6 () {
      return this.gameType === 'HC6'
    },
    tss () {
      return this.ts.reverse()
    },
    ftss () {
      return this.fts.reverse()
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
      return ((this.MAX - (this.p - this.min) * (this.MAX - this.P.minprize) / (this.max - this.min)) * this.currencies[this.cIndex].value).toFixed(3)
    },
    MAX () {
      return this.P.maxprize - parseFloat((this.P.scale * this.P.minpoint * 100).toFixed(3))
    }
  },
  watch: {
    point () {
      this.p = Math.min(Number(this.P.maxpoint), Math.max(this.point, Number(this.P.minpoint))) * 10000
    },
    tt () {
      if (this.tt !== 0) {
        setTimeout(() => {
          this.tt = 0
        }, this.tt)
      }
    },
    cIndex () {
      this.$emit('set-currency', this.currencies[this.cIndex])
      !this.HC6 && window.localStorage.setItem('model', this.cIndex)
    },
    p () {
      if (this.p < this.min) this.p = this.min
      else if (this.p > this.max) this.p = this.max
      this.$emit('set-point', (this.p / 10000).toFixed(4), this.prize)
    },
    t () {
      this.setTimes(parseInt(this.t))
    },
    // p changing or prize changing need update point and bonus in game/common.vue
    prize () {
      this.$emit('set-point', (this.p / 10000).toFixed(4), this.prize)
    },
    ft () {
      setTimeout(() => {
        this.ft = parseInt(this.ft)
      }, 0)
      this.t = this.ft
      if (this.ft >= 0) {
        this.__setCall({fn: '__setDefaultTimes', args: this.ft})
      }
    }
  },
  mounted () {
    // console.log('new orderbar, point:', this.point)
    this.t = this.times
    this.p = Math.min(this.P.maxpoint, Math.max(this.point, this.P.minpoint)) * 10000
    this.cIndex = parseInt(window.localStorage.getItem('model') || 0)
    if (this.HC6) {
      this.t = this.ft
      this.cIndex = 0
    }
    // setTimeout(() => {
    //   this.$emit('set-point', this.p / 10000, this.prize)
    // }, 0)
  },
  methods: {
    __setFt () {
      if (this.ft >= 0 && (!(this.$el.currentStyle ? this.$el.currentStyle : window.getComputedStyle(this.$el, null)).display) || ((this.$el.currentStyle ? this.$el.currentStyle : window.getComputedStyle(this.$el, null)).display !== 'none')) {
        this.__setCall({fn: '__setDefaultTimes', args: this.ft})
      }
    },
    setTimes (t) {
      this.$emit('set-times', t)
    },
    quickbook () {
      this.$emit('quickbook')
    },
    sh (force) {
      // 提示是否真的要清空余额
      if (!force) {
        return this.$modal.question({
          content: '<div class="text-666" style="text-align: left; line-height: .3rem;text-indent: .15rem">您确定要“<span class="text-danger">使用所有余额</span>”来购买此注单吗？</div>',
          target: this.$el.parentNode,
          O: this,
          ok () {
            this.sh(true)
          }
        })
      }
      // 如果是梭哈， 改变模式为厘， 全部余额投注到上面
      this.cIndex = 3
      let am = this.me.amoney
      this.__setCall({fn: '__getUserFund', callId: undefined})
      setTimeout(() => {
        if (this.me.amoney !== am) {
          this.t = Math.max(Math.floor(this.me.amoney / (this.pay / this.t)), 1)
          setTimeout(() => {
            this.order(true)
          }, 100)
        } else {
          setTimeout(() => {
            this.t = Math.max(Math.floor(this.me.amoney / (this.pay / this.t)), 1)
            setTimeout(() => {
              this.order(true)
            }, 100)
          }, 300)
        }
        // this.order(true)
      }, 0)
    },
    order (quick) {
      if (!this.type.mutilpOrderPerRow && !this.type.mutilRowPerOrder && this.P.maxCount && (this.n > this.P.maxCount)) {
        return this.$modal.warn({
          content: '<div class="text-666" style="text-align: left; line-height: .3rem;text-indent: .15rem">该玩法一个方案最多投注量：<span class="text-danger">' + this.P.maxCount + '</span> 注',
          btn: ['确定'],
          target: this.$el.parentNode
        })
      } else if (!this.type.mutilpOrderPerRow && !this.type.mutilRowPerOrder && this.P.minCount && (this.n < this.P.minCount) && this.me.minOrderPop) {
        return this.$modal.question({
          content: '<div class="text-666" style="text-align: left; line-height: .3rem;text-indent: .15rem">该玩法一个方案投注量少于：<span class="text-danger">' + this.P.minCount + '</span> 注，视为单挑模式，最高奖金5万',
          btn: ['继续购买', '再来几注', '不再提醒'],
          target: this.$el.parentNode,
          O: this,
          ok () {
            // store.actions.setUser({minOrderPop: false})
            this.$emit(quick ? 'quickbook' : 'order')
          },
          cancel (i) {
            if (i === 2) {
              store.actions.setUser({minOrderPop: false})
              this.$emit(quick ? 'quickbook' : 'order')
            }
          }
        })
      }
      this.$emit(quick ? 'quickbook' : 'order')
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
  
  .times.my-center
    input
      text-align center
      padding 0 .05rem
</style>


<style lang="stylus" scoped>
  @import '../var.stylus'
  .el-row
    transition height .5s linear
    overflow hidden
    &.opacity-0 
      height 0
    &.opacity-1
      height .65rem
      
    width 100%
    // color #666
    background #fff
    &.fixed
      position absolute
      bottom 0
      margin: 0 auto;
      max-width: 9.3rem;
      left: 0;
      right: 0;
      z-index: 1;
      border-bottom-right-radius .05rem
      border-bottom-left-radius .05rem
      .left
        padding: 0.08rem 0px 0.07rem;
      .right
        line-height: .4rem; padding: 0.08rem 0px 0.07rem;
        & > .primary:not(.random)
          display none
        .buttons
          position: relative; top: -.08rem
        
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
      top -.02rem
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
    line-height .3rem
    text-align right
    .ds-button
      vertical-align middle
      margin-left 0.05rem
  
  .count
  .pay
    color DANGER
    font-weight bold
  .p
    padding 0 PW
    color BLUE
  
</style>
