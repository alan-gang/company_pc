<template lang="jade">

    el-row.row
      el-col.title(:span="2" v-if="titleSpan > 0" v-bind:class="'span-' + titleSpan")
        span {{ row.title }}
      el-col(:span="24")
        el-row
          el-col.numbers(:span="24" v-bind:class="{'has-btn': row.buttons && !row.btnClass}")
            el-row
              el-col(:span="2" v-for=" n in numbers " v-bind:class="[{ selected: n.selected, signal: n.signal, 'has-after': after }, row.class || 'default', ]" @click.native=" toggle(n) ") 
                span.the-number(v-if="showTitle") {{ n.title }}
                Dices(v-if="isDice" v-bind:value="n.title" v-bind:class=" { selected: n.selected} ")

                span.after(v-if="after") 18

          el-col.action-buttons(:span="row.btnClass ? 24 : 7" v-if="row.buttons" v-bind:class="row.btnClass")
            .ds-button(v-for="(btn, index) in row.buttons" @click="click(btn)" v-bind:class="{selected: btnIndex === index}") {{ btn.split(':')[0] }}

</template>
<script>
  import { padStart, isPrime } from '../util/base'
  import Dices from './Dices'
  export default {
    props: ['row', 'titleSpan', 'gameid'],
    data () {
      return {
        // 显示遗漏号码
        after: false,
        numbers: [],
        btnIndex: -1,
        // max number length can be selected
        // sl: 2,
        // last selected number
        lsn: null,
        __unselectFromSelf: false
      }
    },
    computed: {
      callId () {
        return this.gameid + '|' + this.row.id.replace(/[\s,]+/g, '').split(':')[0]
      },
      // 选中号码的长度
      // length () {
      //   return this.numbers.filter(n => n.selected).length
      // },
      // 选号的号码集
      ns () {
        return this.numbers.filter(n => n.selected).map(n => {
          return (n = n.value)
        })
      },
      // 选号的号码title集
      nsTitle () {
        return this.numbers.filter(n => n.selected && typeof n.title === 'string').map(n => {
          return (n = n.title)
        })
      },
      // nsValue () {
      //   if (this.row.join) {
      //     return [this.ns.join(this.row.join)]
      //   }
      // },
      isDice () {
        return this.row.class ? this.row.class.indexOf('dice') !== -1 : false
      },
      showTitle () {
        return !this.isDice
      },
      // 根据玩法确定至多可以选择多少个号码
      sl () {
        return this.row.id.split(':')[1]
      }
    },
    watch: {
      ns () {
        this.row.ns = this.ns
        this.row.nsTitle = this.nsTitle.join(',')
        this.$emit('numbers-change')
        this.btnIndex = this.getBtnIndex()
      },
      row () {
        this.updateNumbers()
      }
      // call: {
      //   deep: true,
      //   handler () {
      //     if (this.call.fn && this.rowIndex !== this.call.rowIndex) {
      //       this[this.call.fn](this.call.args)
      //     }
      //   }
      // }
    },
    mounted () {
      this.updateNumbers()
    },
    methods: {
      updateNumbers () {
        this.numbers = this.row.values || Array(this.row.max - this.row.min + 1).fill(0).map((n, index) => {
          return (n = {
            selected: false,
            signal: false,
            value: this.row.min + index,
            title: !this.row.l ? (this.row.min + index) : padStart(this.row.min + index, this.row.l, '0')
          })
        })
      },
      click (btn) {
        switch (btn.split(':')[0]) {
          case '全':
            this.all(btn.split(':')[1])
            break
          case '大':
            this.big(btn.split(':')[1])
            break
          case '小':
            this.small(btn.split(':')[1])
            break
          case '奇':
            this.odd(btn.split(':')[1])
            break
          case '偶':
            this.even(btn.split(':')[1])
            break
          case '质':
            this.prime(btn.split(':')[1])
            break
          case '合':
            this.composite(btn.split(':')[1])
            break
          case '清':
            this.clear(btn.split(':')[1])
            break
        }
      },
      toggle (n) {
        n.selected = !n.selected
        if (this.sl && this.ns.length > parseInt(this.sl)) {
          this.lsn && this.lsn.selected && (this.lsn.selected = false)
        }
        this.lsn = n
        this.__unselectFromSelf = true
        this.$emit('select', {args: n.value})
      },
      // if i just addCLass signal
      select (n, i) {
        if (i) {
          n.signal = true
        } else if (!n.selected) {
          this.toggle(n)
        }
      },
      unSelect (n, i) {
        if (i) n.signal = false
        else n.selected = false
      },
      __unselectSelectedNumber (value) {
        console.log('i get recieve unSelect a ball', value)
        if (!this.__unselectFromSelf) {
          this.numbers.find(n => n.value === value && n.selected) && (this.numbers.find(n => n.value === value && n.selected).selected = false)
        }
        setTimeout(() => {
          this.__unselectFromSelf = false
        }, 0)
      },
      __clearSelectedNumbers () {
        this.clear()
      },
      all (signal) {
        this.numbers.forEach(n => this.select(n, signal))
      },
      small (signal) {
        this.numbers.forEach((n, i) => ((2 * i) < this.numbers.length ? this.select(n, signal) : this.unSelect(n, signal)))
      },
      big (signal) {
        this.numbers.forEach((n, i) => ((2 * i) >= this.numbers.length ? this.select(n, signal) : this.unSelect(n, signal)))
      },
      even (signal) {
        this.numbers.forEach((n, i) => ((n.value % 2) === 0 ? this.select(n, signal) : this.unSelect(n, signal)))
      },
      odd (signal) {
        this.numbers.forEach((n, i) => ((n.value % 2) !== 0 ? this.select(n, signal) : this.unSelect(n, signal)))
      },
      clear (signal) {
        this.numbers.forEach(n => this.unSelect(n, signal))
      },
      prime (signal) {
        this.numbers.forEach(n => isPrime(n.value) ? this.select(n, signal) : this.unSelect(n, signal))
      },
      composite (signal) {
        this.numbers.forEach(n => (n.value > 1) && !isPrime(n.value) ? this.select(n, signal) : this.unSelect(n, signal))
      },
      getBtnIndex () {
        if (!this.row.buttons) return -1
        if (this.ns.length === 0) return this.row.buttons.length - 1
        if (this.ns.length === this.numbers.length) return 0
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => 2 * n >= this.numbers.length)) return 1
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => 2 * n <= this.numbers.length)) return 2
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => (n % 2) !== 0)) return 3
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => (n % 2) === 0)) return 4
        if (this.ns.length === this.numbers.filter(n => isPrime(n.value)).length && this.ns.every(n => isPrime(n))) return 5
        if (this.ns.length === this.numbers.filter(n => (n.value > 1) && !isPrime(n.value)).length && this.ns.every(n => (n > 1) && !isPrime(n))) return 6
        return -1
      }
    },
    components: {
      Dices
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
    .el-row
      &.row
        padding 0 .2rem
        margin .05rem 0
      width 100%
      &:hover
        .title
          color WHITE
          span
            background-color BLUE
            box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
      .el-row
        width 100%
    .el-col
      min-height GCH
      line-height GCH

    
    // 万位、
    .title
      min-width .6rem
      font-size .14rem
      font-weight bold
      color #333
      position absolute
      & + .el-col
          padding-left .75rem
      &.span-3
        min-width .85rem
        & + .el-col
          padding-left .85rem
      &.span-4
        min-width 1.05rem
        & + .el-col
          padding-left 1.05rem
      // margin-right PW
      span
        position relative
        padding .065rem .1rem
        padding-right .15rem
        background-color #d9d9d9
        radius()
        border-top-right-radius .20rem 50%
        border-bottom-right-radius .20rem 50%
          
    // 数字区
    .numbers
      font-size .2rem
      color #333
      &.has-btn
        padding-right 2rem
      .el-col
        width GCH
        position relative
        text-align center
        radius()
        // transition background-color .05s linear
        
        // margin 0 .01rem
        cursor pointer
        &.default
          width GCH
          border-radius 50%
        &.signal
          background-color #ddd
        &.default:hover
        &.default.selected
          box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
          font-shadow()
          color #fff
          .after
            color #fff
        &.default:hover
          background-color BLUE
        &.default.selected
          background-color DANGER
        &.square
          radius()
          padding 0 .2rem
          width 1.1rem
          margin 0 .01rem
        // dice dice dice
        &.double-width
          width  2 * GCH
        &.third-width
          width  3 * GCH
        &.dice
          margin-right .1rem
          padding-bottom .25rem
          .the-number
            display none
          .after
            line-height .25rem
            
            
         
        // PK10
        &.ds-icon-PK10
          width 1.1rem
          font-size .18rem
          background-position center (.36rem - .27rem)
          margin-bottom PW
          line-height .37rem
          .after
            line-height .05rem
          .the-number
            position relative
            display inline-block
            width .35rem
            height .35rem
            background-color #fff
            border 1px solid #ccc
            radius(50%)
            shadow(0 0 0 2px #ededed)
          &:hover
            .the-number
              color #fff
              background-color BLUE
              font-shadow()
              border-color #0a7cc4
          &.selected
            .the-number
              color #fff
              background-color DANGER
              font-shadow()
              border-color #bd0615
              
        
          
          
      .el-col.has-after
        line-height .7 * GCH
      .after
        position absolute
        bottom 0
        left 0
        right 0
        line-height .225rem
        font-size .14rem
        font-weight normal
        color #666

    // 按钮区
    .action-buttons
      &:not(.block)
        right 0
        position absolute
        max-width 2.2rem
        text-align right
        
      .ds-button
        width .26rem
        line-height .26rem
        padding 0 
        margin 0 .05rem
        color #666
        box-shadow none
        text-shadow none
          
        &:hover
          color WHITE
          background-color BLUE
          shadow()
          font-shadow()
        &.selected
          color WHITE
          background-color DANGER
          shadow()
          font-shadow()
          
</style>
