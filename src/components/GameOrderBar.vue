<template lang="jade">
  el-row
    el-col.left(:span="15")
      el-button(icon="minus" size="mini" @click.native="setTimes(-1)")
      el-button {{ times }}
      el-button(icon="plus" size="mini" @click.native="setTimes(1)")
      | &nbsp;倍
      el-button-group
        el-button(v-for=" (c, index) in currencies " @click="cIndex = index" v-bind:class="{selected: index === cIndex}") {{c.title}}

      el-select(v-model="p")
        el-option(v-for="i in points" v-bind:label="i" v-bind:value="i")


    el-col.right(:span="9")
      | 已选 
      span.count {{ n }} 
      | 注 共 
      span.pay {{ pay }}
      |  元
      el-button(:disabled="!canOrder" type="primary" @click.native="order") 选号




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
      p: '1700-10%'
    }
  },
  computed: {
  },
  watch: {
    cIndex () {
      this.$emit('set-currency', this.currencies[this.cIndex])
    },
    p () {
      this.$emit('set-point', this.p)
    }
  },
  created () {
    this.p = this.point
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

<style lang="stylus" scoped>
  @import '../var.stylus'
  .el-row
    padding 0 PW
    width 100%
    color #666
    background-color #fff
    padding-top .1rem
    &.fixed
      position absolute
      bottom 0
    .el-row
      width 100%
  .el-col
    min-height GOH
    // line-height GOH
  
  .el-button
  .el-button-group
    vertical-align bottom
    
  .el-button-group
    margin 0 PW
    .selected
      background-color BLUE
      color #fff
    
  .el-select
    display inline-block
    width 1.2rem
  .right
    text-align right
    .el-button
      vertical-align middle
      margin-left PW
  
  .count
  .pay
    color BLUE
    font-weight bold
</style>
