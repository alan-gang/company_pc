<template lang="jade">
  .new-footer
    el-row.content-width
      el-col.l(:span="14")
        | ©2018-2019 畅博娱乐 版权所有 all right reserved
        br
        | 畅博娱乐郑重提示：本平台已获得 菲律宾PAGCOR博彩牌照，请放心购彩。
        br
        | 购彩有风险，下注需谨慎，绝不向未满18岁的青少年出售彩票

      el-col.r(:span="10")
        p 畅博娱乐     技术支持
        建议使用分辨率：1920x1080
        br
        建议使用浏览器为：   
        

</template>

<style lang="stylus">
  @import '../var.stylus'
  @import '../path.stylus'
  .new-footer
    padding PW
    background-color rgba(0,0,0, .5)
    color #ccc
    line-height 2
    .l
      padding-top .4rem
      background url(../assets/accredited.png) no-repeat
    .r
      // padding-bottom .2rem
      p
        padding-bottom .1rem
        font-size 18px
        font-style italic
      background url(../assets/browser.png) 1.3rem .75rem no-repeat
</style>
