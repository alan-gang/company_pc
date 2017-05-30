<template lang="jade">
  .ow-content
    h2 多屏幕畅玩
    h4 支持桌面端及移动端，完美适配市面绝大多数机型，让您随时随地，想玩就玩！
    .ow-icon-pc
    .button-group
      .button.on 电脑版
      .button 手机版
   
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../../var.stylus'
  
  .ow-content
    display inline-block
    color #5b6470
    width 100%
    height 100%
    color #fff
    bg-gradient(90deg, #a97afc, #4892eb)
    h2
      margin-top 10%
      font-size .36rem
    h4
      font-size .2rem
      margin PW
    .ow-icon-pc
      width 100%
      height 50%
      margin 8% 0
    .button-group
      display inline-block
      radius(.2rem)
      overflow hidden
      margin .2rem 0
      border 1px solid #888
      .button
        display inline-block
        padding 0 .2rem
        line-height .3rem
        background-color rgba(222,222,222, .2)
        &.on
          background-color #37d679
            

      
        
    
   
</style>



