<template lang="jade">
  .ow-content
   
    .ow-icon-layout

    h2 桌面式布局
    h4 桌面风格设计，操作简单，大奖一触即发
    
    
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../../var.stylus'
  
  .ow-content
    display inline-block
    color #5b6470
    height 100%
    width 100%
    position relative
    padding-top 1.5rem
    .ow-icon-layout
      max-width 15rem
      max-height 9rem
      width 90%
      height 100%
      margin 0 auto
      
      
    h2
      font-size .32rem
      margin .4rem 0
      
    h4
      font-size .2rem
      color #999
      margin PW
      opacity .8
      
    .ow-icon-pc
    .ow-icon-mobile
      width 100%
      height 4rem
      margin 8% 0 8% 0
  
    .button-group
      display inline-block
      radius(.2rem)
      overflow hidden
      margin .5rem 0
      border 1px solid #888
      color #666
      background-color #fff
      .button.on
        color #fff
   
</style>



