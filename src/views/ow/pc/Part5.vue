<template lang="jade">
  .ow-content
   

    h2 桌面式布局
    h4 桌面风格设计，操作简单，大奖一触即发
    
    .ow-icon-day-model

    .buttons
      .day.ow-icon-day-icon 
      .night.ow-icon-night-icon 
    
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
    background-color #fff
    .ow-icon-day-model
      max-width 12rem
      max-height 10rem
      width 90%
      height 65%
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
  
    .buttons
      div
        display inline-block
        width .6rem
        height .6rem
        margin .2rem
   
</style>



