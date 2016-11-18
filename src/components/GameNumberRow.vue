<template lang="jade">

    el-row
      el-col.title.grid-content.bg-purple-dark(:span="row.title.length > 3 ? 3 : 2")
        span {{ row.title }}
      el-col.numbers(:span="row.buttons ? 14: 20")
        el-row
          el-col.has-after(:span="2" v-for=" n in row.values || numbers " v-bind:class="{ selected: n.selected }" @click.native=" n.selected = !n.selected ") {{ n.title }}
            span.after 18 
      el-col.buttons(:span=" row.title.length > 3 ? 7 : 8 " v-if="row.buttons")
        el-button(v-for="btn in row.buttons" @click="click(btn)") {{ btn }}

</template>

<script>
  export default {
    props: ['row'],
    data () {
      return {
        numbers: []
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
      }
    },
    created () {
      this.numbers = (this.row.values || Array(this.row.max - this.row.min + 1).fill(0)).map((n, index) => {
        return (n = {
          selected: false,
          value: this.row.min + index,
          title: this.row.min + index
        })
      })
    },
    methods: {
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
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
    .el-row
      padding-left PW
      margin .05rem 0
      width 100%
      &:hover
        .title
          color #fff
          span
            background-color BLUE
            &:after
              border-left-color BLUE
          
      .el-row
        width 100%
    .el-col
      min-height GCH
      line-height GCH
    
    // 万位、
    .title
      // min-width 1rem
      font-weight bold
      color #333
      span
        position relative
        padding .1rem
        background-color #ccc
        &:after
          position absolute
          top 0
          left 100%
          content ''
          width 0 
          height 0 
          border-top .17rem solid transparent
          border-bottom .17rem solid transparent
          
          border-left .17rem solid #ccc
    // 数字区
    .numbers
      color #333
      font-weight bold
      .el-col
        position relative
        text-align center
        border-radius 50%
        font-size .2rem
        width GCH
        margin 0 .01rem
        cursor pointer
        &:hover
        &.selected
          color #fff
          .after
            color #fff
        
        &:hover
          background-color BLUE
        &.selected
          background-color RED
          
      .el-col.has-after
        line-height .6 * GCH
      .after
        position absolute
        bottom 0
        left 0
        right 0
        font-size .12rem
        color #666
        font-weight normal

    // 按钮区
    .buttons
      .el-button
        border none
        background-color transparent
        margin 0 .1rem 0 0
        
</style>