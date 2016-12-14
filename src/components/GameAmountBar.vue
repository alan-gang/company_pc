<template lang="jade">
  el-row.amout-bar
    el-col.left(:span="10")
      .ds-button.primary.bold(@click="showFollow" v-if="!show") 追号
      span.follow(v-if="show")
        | 追号总期数 
        span.NPER {{ NPER }} 
        |  期&nbsp;&nbsp;&nbsp;追号总金额 
        span.PAY {{ ( PAY || 0).toFixed(2) }}



    el-col.right(:span="14")
      | 总计 
      span.count {{ n }} 
      | 注&nbsp;&nbsp;&nbsp;总计&nbsp;&nbsp;
      span.pay {{ pay.toFixed(2) }}
      |  元&nbsp;&nbsp;
      // el-checkbox(v-model="checked" checked) 使用优惠券
      
      .ds-checkbox-label(v-bind:class="{active: checked}" @click="checked = !checked")
        .ds-checkbox
        | 使用优惠券
      .ds-button.danger.bold 投注




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
    border-bottom-right-radius .05rem
    border-bottom-left-radius .05rem
  .el-row
    padding 0 PWX
    width 100%
    color #333
    background-color #fff
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
    color DANGER
    font-weight bold
  
  .danger
    margin-left PW
  .width0
    width 0
    height 0
    opacity 0
    padding-left 0
    padding-right 0
  
</style>
