<template lang="jade">
  el-row.amout-bar
    el-col.left(:span="10")
      el-button(@click="showFollow" v-bind:class="{ width0:  show}") 追号
      span.follow(v-if="show")
        | 追号总期数 
        span.NPER {{ NPER }}
        |  追号总金额 
        span.PAY {{ ( PAY || 0).toFixed(3) }}



    el-col.right(:span="14")
      | 总计 
      span.count {{ n }} 
      | 注 总计 
      span.pay {{ pay.toFixed(3) }}
      |  元 
      el-checkbox(v-model="checked" checked) 使用优惠券
      el-button(type="primary") 投注




</template>

<script>
export default {
  props: {
    show: Boolean,
    NPER: Number,
    PAY: Number,
    n: Number,
    pay: Number
  },
  data () {
    return {
      // 优惠券
      checked: true
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    showFollow () {
      this.$emit('showFollow')
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  .amout-bar
    position absolute
    bottom 0
  .el-row
    padding 0 PW
    width 100%
    color #666
    background-color #fff
    padding-top .1rem
    .el-row
      width 100%
  .el-col
    min-height GAH
  
  .el-button
    vertical-align middle
  .right
    text-align right
    .el-button
      margin-left PW
  
  .count
  .pay
  .NPER
  .PAY
    color BLUE
    font-weight bold
  .width0
    width 0
    opacity 0
    padding-left 0
    padding-right 0
  
</style>
