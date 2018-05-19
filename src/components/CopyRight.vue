<template lang="jade">
  .new-footer
    div.t
      el-row.content-width.bt-logo
        span.ll.text-666 技术支持：
        span.rr 创优科技
    el-row.content-width.b
      el-col.l.text-666(:span="14")
        | 信游娱乐郑重提示：本平台已获得 菲律宾PAGCOR博彩牌照，请放心购彩。
        br
        | 购彩有风险，下注需谨慎，绝不向未满18岁的青少年出售彩票
        br
        | ©2018-2019 信游娱乐 版权所有 all right reserved
        br
        br
        | 建议使用分辨率：
        span.text-999 1920x1080
        br
        | 建议使用浏览器为： 
        br  

      el-col.r(:span="10")
        div(style="opacity: 0") ....
       
        
        

</template>

<style lang="stylus">
  @import '../var.stylus'
  @import '../path.stylus'
  .t
    height .68rem
    background-color #232227
  .bt-logo
    height .68rem
    background url(../assets/v2/logo_bt.png) left center no-repeat
    text-align right
    line-height .68rem
    .rr
      color #ccc
  .b
    padding .25rem 0
  .new-footer
    // padding PW
    background-color #27262b
    color #ccc
    font-size .12rem
    line-height 2
    .l
      // padding-top .4rem
      // background url(../assets/accredited.png) no-repeat
      // padding-bottom .2rem
      p
        padding-bottom .1rem
        font-size 18px
        font-style italic
        
      background url(../assets/browser.png) 1.15rem 1.18rem no-repeat
    .r
      min-height 1.6rem
      background url(../assets/v2/logo_bt03.png) right top no-repeat
      
</style>
