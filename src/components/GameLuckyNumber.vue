<template lang="jade">
  el-row.lucky-numbers
    el-col.left(:span="20")
      span.NPER {{ NPER }} 
      | 期 &nbsp;
      span.number(v-for=" n in lucknumbers ") {{ n }}
      span.timeout &nbsp;开奖超时，请刷新
    el-col.right(:span="4")
      | 已开
      span.PNPER {{ PNPER }}
      | 期，剩余
      span.FNPER {{ FNPER }}
      | 期
</template>

<script>
export default {
  props: {
    NPER: Number,
    FNPER: Number,
    PNPER: Number,
    lucknumbers: Array
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  W = .42rem
  .lucky-numbers
    line-height LH
    margin 0
    padding 0 .1rem 0 .2rem
    font-size .12rem
    font-weight normal
    color #ddd
    background-color #666
    cursor default
    .number
      position relative
      top .03rem
      display inline-block
      width W
      height W
      line-height W
      margin 0 .04rem
      font-size .2rem
      text-align center
      color WHITE
      background-color RED
      radius(50%)
      box-shadow .02rem .02rem .02rem rgba(0,0,0,.2)
    .timeout
      color GOLD
  .left
    min-width 4.5rem
  .right
    text-align right
    min-width 1.28rem
  
</style>
