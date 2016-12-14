<template lang="jade">

    el-row.row
      el-col.title(:span="titleSpan")
        span {{ row.title }}
      el-col(:span="24 - titleSpan")
        el-row
          el-col.numbers(:span="17")
            el-row
              el-col.has-after(:span="2" v-for=" n in numbers " v-bind:class="{ selected: n.selected }" @click.native=" n.selected = !n.selected ") {{ n.title }}
                span.after 18 
          el-col.buttons(:span="7" v-if="row.buttons" )
            .ds-button(v-for="(btn, index) in row.buttons" @click="click(btn)" v-bind:class="{selected: btnIndex === index}") {{ btn }}

</template>

<script>
  export default {
    props: ['row', 'titleSpan'],
    data () {
      return {
        numbers: [],
        btnIndex: -1
      }
    },
    computed: {
      // 选中号码的长度
      // length () {
      //   return this.numbers.filter(n => n.selected).length
      // },
      // 选号的号码集
      ns () {
        return this.numbers.filter(n => n.selected).map(n => {
          return (n = n.value)
        })
      }
    },
    watch: {
      ns () {
        this.row.ns = this.ns
        this.$emit('numbers-change')
        this.btnIndex = this.getBtnIndex()
      },
      row () {
        this.updateNumbers()
      }
    },
    created () {
      this.updateNumbers()
    },
    methods: {
      updateNumbers () {
        this.numbers = this.row.values || Array(this.row.max - this.row.min + 1).fill(0).map((n, index) => {
          return (n = {
            selected: false,
            value: this.row.min + index,
            title: this.row.min + index
          })
        })
      },
      click (btn) {
        switch (btn) {
          case '全':
            this.all()
            break
          case '大':
            this.big()
            break
          case '小':
            this.small()
            break
          case '奇':
            this.odd()
            break
          case '偶':
            this.even()
            break
          case '清':
            this.clear()
            break
        }
      },
      all () {
        this.numbers.forEach(n => (n.selected = true))
      },
      small () {
        this.numbers.forEach((n, i) => ((2 * i) < this.numbers.length ? (n.selected = true) : (n.selected = false)))
      },
      even () {
        this.numbers.forEach((n, i) => ((i % 2) === 0 ? (n.selected = true) : (n.selected = false)))
      },
      big () {
        this.numbers.forEach((n, i) => ((2 * i) >= this.numbers.length ? (n.selected = true) : (n.selected = false)))
      },
      odd () {
        this.numbers.forEach((n, i) => ((i % 2) !== 0 ? (n.selected = true) : (n.selected = false)))
      },
      clear () {
        this.numbers.forEach(n => (n.selected = false))
      },
      getBtnIndex () {
        if (this.ns.length === 0) return 5
        if (this.ns.length === this.numbers.length) return 0
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => 2 * n >= this.numbers.length)) return 1
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => 2 * n < this.numbers.length)) return 2
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => (n % 2) !== 0)) return 3
        if (this.ns.length === this.numbers.length / 2 && this.ns.every(n => (n % 2) === 0)) return 4
        return -1
      }
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
      float left
      min-width .6rem
      font-size .16rem
      font-weight bold
      color #333
      &.el-col-3
        min-width .95rem
      // margin-right PW
      span
        position relative
        padding .065rem .1rem
        padding-right .17rem
        background-color #d9d9d9
        radius()
        border-top-right-radius .25rem 50%
        border-bottom-right-radius .25rem 50%
          
    // 数字区
    .numbers
      font-size .2rem
      color #333
      .el-col
        position relative
        text-align center
        border-radius 50%
        width GCH
        margin 0 .01rem
        cursor pointer
        &:hover
        &.selected
          box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
          font-shadow()
          color #fff
          .after
            color #fff
        &:hover
          background-color BLUE
        &.selected
          background-color DANGER
          
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
    .buttons
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