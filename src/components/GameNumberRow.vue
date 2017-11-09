<template lang="jade">

    el-row.row(:class="{pd25: isDice}")
      el-col.title(:span="2" v-if="titleSpan > 0" v-bind:class="'span-' + titleSpan")
        span {{ row.title }}
      el-col(:span="24")
        el-row
          el-col.numbers(:span="24" v-bind:class="{'has-btn': row.buttons && !row.btnClass}")
            el-row
              el-col.circle(:span="2" v-for=" n in numbers " v-bind:class="[{ selected: n.selected, signal: n.signal, 'has-after': n.after !== null }, row.class || 'default', n.class]" @mouseover.native=" isCode && hover($event) " @mouseleave.native=" isCode && leaveSelect(n) " @click.native=" !isCode && toggle(n) ") 
                // 正常的显示
                span.the-number(v-if="showTitle" v-bind:class="{ selected: n.selected, circle: row.class === 'ds-icon-PK10' }") {{ n.title }}
                span.after(v-if=" n.after !== null ") {{ n.after }}
                
                // 选码还得有输入框
                el-input-number.code-input.times.my-center(v-bind:id=" $index " v-model=" n.times " v-if=" isCode ")
                .code-input-value(v-if="isCode && n.selected") {{ n.times }}



                // 筛子
                Dices(v-if="isDice" v-bind:value="n.dots" v-bind:class=" { selected: n.selected} ")


          el-col.action-buttons(:span="row.btnClass ? 24 : 7" v-if="row.buttons" v-bind:class="row.btnClass")
            .ds-button(v-for="(btn, index) in row.buttons" @click="btnStatus[btn.split(':')[0]] && click(btn)" v-bind:class="{selected: btnIndex === index, 'disabled': !btnStatus[btn.split(':')[0]] }") {{ btn.split(':')[0] }}

</template>
<script>
  import { padStart, isPrime } from '../util/base'
  import Dices from './Dices'
  export default {
    props: ['row', 'rowIndex', 'titleSpan', 'gameid'],
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
        __unselectFromSelf: false,
        // 不同的码有不同的色彩
        codeClass: {
          '1,2,7,8,12,13,15,18,23,24,29,30,34,35,40,45,46,': 'danger',
          '3,4,9,10,14,20,25,26,31,36,37,41,42,47,48,': 'blue',
          '5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49,': 'green'
        }
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
      isCode () {
        return this.row.class ? this.row.class.indexOf('code') !== -1 : false
      },
      showTitle () {
        return !this.isDice
      },
      // 根据玩法确定至多可以选择多少个号码
      sl () {
        return parseInt(this.row.id.split(':')[1])
      },
      btnStatus () {
        let o = {}
        let a = ['全:1', '大:0.5', '小:0.5', '奇:0.5', '偶:0.5', '质', '合', '清']
        a.forEach(n => {
          o[n.split(':')[0]] = !this.sl ? true : (this.numbers.length * (parseFloat(n.split(':')[1]) || 0)) < this.sl
        })
        return o
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
      hover (e) {
      },
      // 暂时只对码生效
      leaveSelect (n, e) {
        if ((n.times > 0 && !n.selected) || (n.times < 0 && n.selected)) {
          this.toggle(n)
        }
      },
      updateNumbers () {
        this.numbers = this.row.values || Array(this.row.max - this.row.min + 1).fill(0).map((n, index) => {
          return (n = {
            selected: false,
            signal: false,
            value: this.row.min + index,
            title: !this.row.l ? (this.row.min + index) : padStart(this.row.min + index, this.row.l, '0'),
            // 单个号码样式
            class: this.isCode ? this.codeClass[this.row.min + index + ''] : '',
            // 单个号码的倍数
            times: 0,
            // 赔率
            after: this.row.afters ? this.row.afters[index] : null
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
        // block8/3 console.log('i get recieve unSelect a ball', value)
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
      // 随机选择一个号码
      __random ({continuee, rowIndex}) {
        if (!continuee) this.clear()
        if (rowIndex === undefined || this.rowIndex === rowIndex) {
          setTimeout(() => {
            this.toggle(this.numbers[parseInt(Math.random() * this.numbers.length)])
          }, 50 * this.rowIndex)
        }
      },
      small (signal) {
        this.numbers.forEach((n, i) => ((2 * i + 1) < this.numbers.length ? this.select(n, signal) : this.unSelect(n, signal)))
      },
      big (signal) {
        this.numbers.forEach((n, i) => ((2 * i + 1) >= this.numbers.length ? this.select(n, signal) : this.unSelect(n, signal)))
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
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => (2 * n + 1) >= this.numbers.length)) return 1
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => (2 * n + 1) < this.numbers.length)) return 2
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
        &.pd25
          padding-bottom .25rem
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
        // &:not(.dice)
        //   border 1px solid currentColor
        &.selected
          transition background-color .5s linear
        
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
          .the-number
            display none
          .after
            line-height .25rem
        &.code
          radius(50%)
          height  2 * GCH
          line-height 1.5 * GCH
          transition all linear .2s
          .code-input-value
          .code-input
            width 100%
            position absolute
            bottom 30%
            left 0
            z-index 1
            opacity 0
            transition all linear .2s
            input
              text-align center
          .after
            bottom 0.5 * GCH
          &:hover
            line-height GCH
            .after
              bottom 0.2 * GCH
            .code-input
              opacity 1
            .code-input-value
              display none
          
          
            
            
         
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
              transition all .5s linear
              color #fff
              background-color DANGER
              font-shadow()
              border-color #bd0615
              
        
          
          
      .el-col.has-after:not(.code)
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
        transition all linear .2s

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
        &.disabled
          opacity .5
    
    // https://codepen.io/giana/pen/yYBpVY
    .circle:not(.dice):not(.square):not(.ds-icon-PK10)
      &::before,
      &::after
        top: 0;
        left: 0;
        box-sizing: border-box;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        color #aaa
      &::before
        border: 2px solid transparent; // We're animating border-color again
        transition:
          border-top-color 0.15s linear 0.30s, // Stagger border appearances
          border-right-color 0.15s linear 0.20s,
          border-bottom-color 0.15s linear 0.10s;
      &.selected:before
      // &:hover::before
        color #fff
        border-top-color: currentColor; // Show borders
        border-right-color: currentColor;
        border-bottom-color: currentColor;

        transition:
          border-top-color 0.15s linear, // Stagger border appearances
          border-right-color 0.15s linear 0.10s,
          border-bottom-color 0.15s linear 0.20s;

      &::after
        border: 0 solid transparent; // Makes border thinner at the edges? I forgot what I was doing
        transition:
          transform 0.4s linear 0s,
          border-color 0s linear 0.4s,
          border-width 0s linear 0.4s; // Solid edge post-rotation
          
      &.selected:after
      // &:hover::after
        color #fff
        border-top: 2px solid currentColor; // Shows border
        border-left-width: 2px; // Solid edges, invisible borders
        border-right-width: 2px; // Solid edges, invisible borders
        transform: rotate(270deg); // Rotate around circle
        transition:
          transform 0.4s linear 0s,
          border-left-width 0s linear 0.35s; // Solid edge post-rotation
    
    .square
      // box-shadow: inset 0 0 0 2px #f45e61;
      transition: color 0.25s
      &::before,
      &::after {
        box-sizing: inherit;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border: 2px solid transparent;
        width: 0;
        height: 0;
        radius()
        color #aaa
      }
      &::before {
        top: 0;
        left: 0;
        border-top-color: transparent; // Make borders visible
        border-right-color: transparent;
        transition:
          border-color 0.5s ease-out 0.5s, // Wait for ::before to finish before showing border
          width 0.25s ease-out 0.75s, // Width expands first
          height 0.25s ease-out 0.5s; // And then height
      }

      // And this the bottom & left borders (expands left, then up)
      &::after {
        bottom: 0;
        right: 0;
        border-top-color: transparent; // Make borders visible
        border-right-color: transparent;
        transition:
          border-color 0.5s ease-out, // Wait for ::before to finish before showing border
          width 0.25s ease-out 0.25s, // Width expands first
          height 0.25s ease-out; // And then height
      }
      
      &:hover {
        color: currentColor;
      }
       // Hover styles
      &.selected::before,
      &.selected::after {
        width: 100%;
        height: 100%;
        color #fff
      }

      &.selected::before {
        border-top-color: currentColor; // Make borders visible
        border-right-color: currentColor;
        transition:
          width 0.25s ease-out, // Width expands first
          height 0.25s ease-out 0.25s; // And then height
      }

      &.selected::after {
        border-bottom-color: currentColor; // Make borders visible
        border-left-color: currentColor;
        transition:
          border-color 0s ease-out 0.5s, // Wait for ::before to finish before showing border
          width 0.25s ease-out 0.5s, // And then exanding width
          height 0.25s ease-out 0.75s; // And finally height
      }
      
</style>

<style lang="stylus">
@import '../var.stylus'
    .dices:not(.has-3)  
      .dice
        transition: color 0.25s
        color #666
      &.selected .dice
        color #fff
      // box-shadow: inset 0 0 0 2px #f45e61;
      .dice::before,
      .dice::after {
        box-sizing: inherit;
        content: '';
        position: absolute;
        box-sizing: border-box;
        border: 2px solid transparent;
        width: 0;
        height: 0;
        radius(.1rem)
        z-index 1
        color #ccc
      }
      .dice::before {
        top: 0;
        left: 0;
        border-top-color: transparent; // Make borders visible
        border-right-color: transparent;
        transition:
          border-color 0.5s ease-out 0.5s, // Wait for ::before to finish before showing border
          width 0.25s ease-out 0.75s, // Width expands first
          height 0.25s ease-out 0.5s; // And then height
      }

      // And this the bottom & left borders (expands left, then up)
      .dice::after {
        bottom: 0;
        right: 0;
        border-top-color: transparent; // Make borders visible
        border-right-color: transparent;
        transition:
          border-color 0.5s ease-out , // Wait for ::before to finish before showing border
          width 0.25s ease-out 0.25s, // Width expands first
          height 0.25s ease-out; // And then height
      }
      
       // Hover styles
      &.selected .dice::before,
      &.selected .dice::after {
        width: 100%;
        height: 100%;
        color #fff
      }

      &.selected .dice::before {
        border-top-color: currentColor; // Make borders visible
        border-right-color: currentColor;
        transition:
          width 0.25s ease-out, // Width expands first
          height 0.25s ease-out 0.25s; // And then height
      }

      &.selected .dice::after {
        border-bottom-color: currentColor; // Make borders visible
        border-left-color: currentColor;
        transition:
          border-color 0s ease-out 0.5s, // Wait for ::before to finish before showing border
          width 0.25s ease-out 0.5s, // And then exanding width
          height 0.25s ease-out 0.75s; // And finally height
      }
</style>