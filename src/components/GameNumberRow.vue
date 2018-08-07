<template lang="jade">
    el-row.row(:class="{pd25: isDice}" style="clear: both")
      el-col.title(:span="2" v-if="titleSpan > 0" v-bind:class="'span-' + titleSpan")
        span {{ row.title }}
      el-col(:span="24")
        el-row
          el-col.numbers(:span="24" v-bind:class="{'has-btn': row.buttons && !row.btnClass}")
            el-row
              // el-col.circle(:span="2" v-for=" (n, index) in numbers " v-bind:class="[{ hover: n.hover, selected: n.selected, signal: n.signal, 'has-after': n.after }, row.class || 'default', n.class]" @mouseover.native=" row.hover && hover(index) " @mouseleave.native=" row.noClick && leaveSelect(index) " @click.native=" !row.noClick && toggle(n) "  @keyup.tab.native.stop=" row.noClick && leaveSelect(index === 0 ? 0 : index - 1) && hover(index) ") 
              el-col.circle(:span="2" v-for=" (n, index) in numbers " v-bind:class="[{ hover: n.hover, selected: n.selected, signal: n.signal, 'has-after': n.after }, row.class || 'default', n.class]" @mouseover.native=" row.hover && hover(index) " @mouseleave.native=" row.hover && leave(index) " @click.native=" !row.noClick && toggle(n) "  @keyup.tab.native.stop=" row.hover && leave(index === 0 ? 0 : index - 1) && hover(index) " @keyup.enter.native.stop=" row.hover && leaveSelect(index)") 
                // 正常的显示
                span.after(v-if=" n.after ") {{ n.after }}
                span.the-number(v-if="showTitle" v-bind:class="{ selected: n.selected, circle: row.class === 'ds-icon-PK10' }") {{ n.title }}

                // 选码还得有输入框
                el-input-number.code-input.times.my-center.ds-icon-rmb-sign(v-bind:id=" index "   v-model=" n.times " v-if=" isCode " v-bind:max="10000" v-bind:step="1" @click.native.stop=" !row.noClick && !n.selected && toggle(n) " @change.native="ntimeChange(n) ")

                // 筛子
                Dices(v-if="isDice" v-bind:value="n.dots" v-bind:class=" { selected: n.selected} ")
                
                el-row(:span="24" v-if=" n.numbers ")
                  
                  el-col.circle.default(:span="2" v-for=" (nn, ii) in n.numbers " v-bind:class="[{ selected: n.selected }, nn.split(':')[1], n.class ]")
                    span.the-number.circle(v-bind:class="{ selected: n.selected}") {{ nn.split(':')[0] }}

                  // checkbox
                  span.ds-checkbox-label(style="margin: 0 0 0 .1rem" v-bind:class="{active: n.selected}" @click=" n.selected = !n.selected " v-if=" n.checkbox ")
                    .ds-checkbox( @click=" n.selected = !n.selected ")
                  // input
                  el-input-number.code-input.times.ds-icon-rmb-sign(v-bind:id=" index  "  v-model=" n.times "  v-if=" n.input " v-bind:max="10000" style="width: .7rem; margin: 0 0 0 .2rem; padding-left: .1rem" @click.native.stop=" !row.noClick && !n.selected && toggle(n) " @mouseleave.native="ntimeChange(n) ")




          el-col.action-buttons(:span="row.btnClass ? 24 : 7" v-if="row.buttons" v-bind:class="row.btnClass")
            .ds-button(v-for="(btn, index) in row.buttons" @click="btnStatus[btn.split(':')[0]] && click(btn)" v-bind:class="{selected: (btn.split(':')[0] !== '清') && (btnIndex === index), 'disabled': !btnStatus[btn.split(':')[0]] }") {{ btn.split(':')[0] }}

</template>
<script>
  import { padStart, isPrime } from '../util/base'
  import Dices from './Dices'
  import { getNumberOfAnimal } from '../util/Number'
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
        defaultTimes: 0,
        codeClass:
          ',0:danger,1:danger,2:danger,7:danger,8:danger,12:danger,13:danger,15:blue,18:danger,19:danger,23:danger,24:danger,29:danger,30:danger,34:danger,35:danger,40:danger,45:danger,46:danger,3:blue,4:blue,9:blue,10:blue,14:blue,20:blue,25:blue,26:blue,31:blue,36:blue,37:blue,41:blue,42:blue,47:blue,48:blue,5:green,6:green,11:green,16:green,17:green,21:green,22:green,27:green,28:green,32:green,33:green,38:green,39:green,43:green,44:green,49:green,'
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
      // 选号的号码倍数集
      nsTimes () {
        return this.numbers.filter(n => n.selected && n.times > 0).map(n => {
          return (n = n.times)
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
      isNA () {
        return this.row.class ? this.row.class.indexOf('number-array') !== -1 : false
      },
      showTitle () {
        return !this.isDice && !this.isNA
      },
      // 根据玩法确定至多可以选择多少个号码
      sl () {
        return parseInt(this.row.id.split(':')[1])
      },
      btnStatus () {
        let o = {}
        let a = ['全:1', '大:0.5', '小:0.5', '奇:0.5', '偶:0.5', '质', '合', '清', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪', '金', '木', '水', '火', '土']
        a.forEach(n => {
          o[n.split(':')[0]] = !this.sl ? true : (this.numbers.length * (parseFloat(n.split(':')[1]) || 0)) < this.sl
        })
        return o
      },
      EVEN () {
        return this.numbers.length % 2 === 0 ? 0 : 1
      }
    },
    watch: {
      nsTimes () {
        this.row.ns = this.ns
        this.row.nsTitle = this.nsTitle.join(',')
        this.row.nsTimes = this.nsTimes.join(',')
        this.$emit('numbers-change')
        this.btnIndex = this.getBtnIndex()
      },
      ns () {
        this.row.ns = this.ns
        this.row.nsTitle = this.nsTitle.join(',')
        this.row.nsTimes = this.nsTimes.join(',')
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
      ntimeChange (n) {
        n.times = Math.ceil(n.times)
      },
      __setDefaultTimes (n) {
        this.defaultTimes = n || 0
      },
      leave (index) {
        let n = this.numbers[index]
        n.hover = false
        if (n.selected && n.times <= 0) n.selected = false
        return true
      },
      hover (index) {
        let n = this.numbers[index] || this.numbers[0]
        if (n.hover) return true
        if (!n) return
        n.hover = true
        if (!n.selected) n.times = this.defaultTimes
        setTimeout(() => {
          this.$el.querySelector('[id="' + index + '"]') && this.$el.querySelector('[id="' + index + '"]').querySelector('input').focus()
        }, 0)
        return true
      },
      // 暂时只对码生效
      leaveSelect (index) {
        let n = this.numbers[index]
        this.numbers[index].hover = false
        if ((n.times > 0 && !n.selected) || (n.times <= 0 && n.selected)) {
          this.toggle(n)
        }
        return true
      },
      __updateNumberRow () {
        this.updateNumbers()
      },
      updateNumbers () {
        this.numbers = this.row.values || Array(this.row.max - this.row.min + 1).fill(0).map((n, index) => {
          return (n = {
            selected: false,
            signal: false,
            value: this.row.min + index,
            title: !this.row.l ? (this.row.min + index) : padStart(this.row.min + index, this.row.l, '0'),
            // 单个号码样式
            class: this.isCode && this.codeClass.match(new RegExp(',' + (this.row.min + index) + '' + ':\\w+,', 'g')) ? this.codeClass.match(new RegExp(',' + (this.row.min + index) + '' + ':\\w+', 'g'))[0].split(':')[1] : '',
            // 单个号码的倍数
            times: this.row.times,
            // 赔率
            after: this.row.afters ? this.row.afters[index] : null,
            hover: false
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
          case '鼠':
          case '牛':
          case '虎':
          case '兔':
          case '龙':
          case '蛇':
          case '马':
          case '羊':
          case '猴':
          case '鸡':
          case '狗':
          case '猪':
          case '金':
          case '木':
          case '水':
          case '火':
          case '土':
            this.clear() && getNumberOfAnimal(btn.split(':')[0]).forEach(n => this.select(this.numbers[n - 1]))
        }
      },
      toggle (n) {
        if (!n) return false
        n.selected = !n.selected
        // 加上号码的倍数
        if (n.times !== undefined) {
          n.times = Math.ceil(n.times)
          if (n.selected && !n.times) n.times = this.defaultTimes || 2
          if (!n.selected) n.times = 0
        }
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
        // 清除号码的倍数
        if (n.times) n.times = 0
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
      __random ({continuee, rowIndex, timeout}) {
        if (!continuee) this.clear()
        // if every rows length equal 1, jump to random select row by row
        if (!continuee && this.numbers.length === 1) return false
        if (rowIndex === undefined || this.rowIndex === rowIndex) {
          // if (this.numbers.length === 1) {
          //   // if all rows length === 1 tigger one by on if N still  === 0
          //   if
          // } else {
          setTimeout(() => {
            this.toggle(this.numbers[parseInt(Math.random() * this.numbers.length)])
          }, timeout || (50 * Math.min(this.rowIndex, 8)))
          // }
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
        return true
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
        if (this.ns.length === Math.ceil(this.numbers.length / 2) && this.ns.every(n => (2 * n + 1) >= this.numbers.length)) return 1
        if (this.ns.length === Math.floor(this.numbers.length / 2) && this.ns.every(n => (2 * n + 1) <= this.numbers.length)) return 2
        if (this.ns.length === Math.ceil(this.numbers.length / 2) && this.ns.every(n => (n % 2) !== 0)) return 3
        if (this.ns.length === Math.floor(this.numbers.length / 2) && this.ns.every(n => (n % 2) === 0)) return 4
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

<style lang="stylus">
  .number-array.selected .code-input
    input
      color #b30000
  .code-input.times.my-center 
    input
      padding 0 .15rem
      font-size .2rem
      color #ff0
  .el-col.circle:not(.hover) .code-input.times.my-center 
    input
      font-size .16rem
  // .selected:not(:hover)
  .el-col.circle
    .code-input
      opacity 1
      box-shadow none
      input
        box-shadow none
        border none
        background-color rgba(0,0,0,0)
          
        
        
</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
    .el-row
      &.half-row
        width 50%
        display inline-block
        margin 0 !important
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
            color BLUE
            // background-color BLUE
            // box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
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
        font-size .16rem
        color #999
        // background-color #d9d9d9
        // radius()
        // border-top-right-radius .20rem 50%
        // border-bottom-right-radius .20rem 50%
          
    // 数字区
    .numbers
      font-size .2rem
      color #333
      &.has-btn
        padding-right 2rem
      .el-col
        overflow
        line-height GCH
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
          // box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
          font-shadow()
          color #fff
          .after
            color #fff
        &.default:hover
          // background-color BLUE
          background-color rgba(241, 125, 11, .5)
        &.default.selected
          background-color BLUE
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
        &.width1-8.code
          width  1.8 * GCH
          height 1.8 * GCH
        &.code
          &.danger
            &:not(.default-color):not(.selected)
              color DANGER
            // &:hover
            // &.hover
            &.selected
              background-color DANGER
              // color DANGER
              
          &.blue
            color BLUE
            // &:hover
            // &.hover
            &.selected
              background-color BLUE
          &.green
            color CODEGREEN
            // &:hover
            // &.hover
            &.selected
              background-color CODEGREEN
            
          radius(50%)
          height  2 * GCH
          line-height 1.5 * GCH
          transition all linear .2s
          
          .code-input
            width 100%
            position absolute
            top .65 * GCH
            left 0
            z-index 1
            opacity 0
            transition all linear .2s
          .after
            bottom 0.5 * GCH

          // &:hover
          &.hover
            // opacity .5
            .code-input
              background-color rgba(0,0,0,.2) 
              
          
          &.hover
            // color #fff
            line-height GCH
            .after
              bottom 0.2 * GCH
              // color #fff
              // opacity .6
            .code-input
              opacity 1
              
          &.selected    
            color #fff
            line-height .9 * GCH
            &:not(.has-after)
              line-height 2GCH
            .after
              bottom 0.2 * GCH
              color #fff
              opacity .6
            .code-input
              opacity 1
          
          // &.selected:not(.hover)
          //   line-height 2 * GCH
          //   .code-input
          //     top .2 * GCH
        
        &.number-array
          width 100%
          color #fff
          padding-left .5rem
          
          .el-row
            text-align left
            margin .1rem 0
          .after
            top .18rem
            bottom auto
            left 0
            right auto
            color DANGER
            font-size .2rem
          .el-col.o0
            opacity 0
          .el-col.danger
            // background-color DANGER
            background-color inherit
            border 1px solid DANGER
            color DANGER
            &.selected
              color #fff
              background-color DANGER
              border none
          .el-col.green
            // background-color CODEGREEN
            background-color inherit
            border 1px solid CODEGREEN
            color CODEGREEN
            &.selected
              color #fff
              background-color CODEGREEN
              border none
              
          .el-col.blue
            // background-color BLUE
            background-color inherit
            border 1px solid BLUE
            color BLUE
            &.selected
              color #fff
              background-color BLUE
              border none
          
          .small-circle
            margin 0 2px
            font-size .14rem
            min-height .32rem
            width .32rem
            height .32rem
            line-height .32rem
            
          .code-input
            border-bottom 1px solid #ccc
            &:hover
              background-color #fff
              
          

          
          
          
            
            
         
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
        width .3rem
        line-height .3rem
        padding 0 
        // margin 0 .05rem
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
    .circle:not(.dice):not(.square):not(.ds-icon-PK10):not(.number-array)
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
    .dices
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