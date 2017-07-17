<template lang="jade">
  el-row.amout-bar
    el-col.left(:span="8")
      .ds-button.primary.bold(@click="showFollow" v-if="!show") 追号
      span.follow(v-if="show")
        | 追号总期数 
        span.NPER {{ NPER }} 
        |  期&nbsp;&nbsp;&nbsp;追号总金额 
        span.PAY {{ ( PAY || 0).toFixed(3) }}



    el-col.right(:span="16")
      | 总计 
      span.count {{ n }} 
      | 注&nbsp;&nbsp;&nbsp;总计&nbsp;&nbsp;
      span.pay {{ pay.toFixed(3) }}
      |  元&nbsp;&nbsp;
      // el-checkbox(v-model="checked" checked) 使用优惠券
      
      

      

      el-popover(placement="top-start" trigger="hover" v-bind:popper-class="'popover-instruction font-white popover-pot'")
        span(slot="reference")
          .ds-checkbox-label(v-bind:class="{active: pot}" @click=" togglePot ").ds-icon-text-question
            .ds-checkbox
            | 奖池抽奖
          // .ds-button.danger.bold(@click="book") ? 奖池投注
        slot
          p(style="line-height: .25rem")
              span.label.font-gold 奖池投注：
              | 您将多花费一元来进行投注，多花费的一元将累加入到奖池，每次选择奖池投注您将多获得一次奖池抽奖机会
          p(style="line-height: .25rem")
              span.label.font-gold 奖池开奖：
              | 奖池将在每月最后一天下午8点开奖，届时将在使用奖池投注的用户中抽取出1、2、3等奖，奖池投注越多机会越大，奖金也更丰厚
      
      .ds-checkbox-label(v-bind:class="{active: checked}" @click="toggle")
        .ds-checkbox
        | 使用优惠券

      .ds-button.danger.bold(@click="book") 投注




</template>

<script>
export default {
  props: {
    show: Boolean,
    NPER: Number,
    PAY: Number,
    n: Number,
    pay: Number,
    // 优惠券
    checked: Boolean,
    pot: Boolean
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    showFollow () {
      this.$emit('showFollow')
    },
    toggle () {
      this.$emit('toggle-checked')
    },
    togglePot () {
      this.$emit('toggle-pot')
    },
    book () {
      this.$emit('book', this.pot)
    }
  },
  components: {
  }
}
</script>
<style lang="stylus">
  @import '../var.stylus'
  .popover-pot
    radius()

</style>

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
