<template lang="jade">
  h6.game-info
    i.el-icon-menu &nbsp;{{ CNPER }}
    | &nbsp;期&nbsp;
    i.el-icon-time {{ showTime }}
    el-button-group
      el-button ？{{ title }}
      el-button 走势图
    el-button-group.right
      el-button 投注记录
      el-button 追号记录
</template>

<script>
import util from '../util'
export default {
  props: {
    NPER: Number,
    CNPER: Number,
    timeout: Number,
    title: String
  },
  data () {
    return {
      // 默认倒计时
      defautTime: 60 * 5,
      time: 0
    }
  },
  computed: {
    showTime () {
      return util.timeFormat(this.time)
    }
  },
  created () {
    this.time = this.timeout
    setInterval(() => {
      if (this.time === 0 || !this.time) {
        this.time = this.defautTime
      } else {
        this.time--
      }
    }, 1000)
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  .game-info
    line-height GH
    height GH
    margin 0
    padding 0 PW
    color #666
  .el-icon-menu
    font-size .3rem
  .el-icon-time
    color pink
    font-size .3rem
    &:before
      margin-right .1rem
  .el-button-group
    position relative
    top .05rem
  .el-button
    line-height .1rem
    background-color transparent
    margin-left .1rem
    font-size .12rem
  
  .right
    float right
    top .2rem
    .el-button
      border none
    
</style>
