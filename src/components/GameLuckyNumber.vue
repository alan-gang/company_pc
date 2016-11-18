<template lang="jade">
  h6.lucky-numbers
    span.NPER {{ NPER }} 
    | 期 &nbsp;
    span.number(v-for=" n in lucknumbers ") {{ n }}
    span.timeout &nbsp;开奖超时，请刷新
    span.right
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
  .lucky-numbers
    height LH
    line-height LH
    margin 0
    padding 0 .15rem
    background-color #777
    color #cecece
    .number
      display inline-block
      width .3rem
      height .3rem
      line-height .3rem
      text-align center
      font-size .16rem
      background-color RED
      border-radius 50%
      margin .07rem .035rem
    .timeout
      color yellow
  .right
    float right
  
</style>
