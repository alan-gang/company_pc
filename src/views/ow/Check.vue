<template lang="jade">
  .slide-page.scroll-content
    
    // .slide-header(ref="sh" style="min-height: 2rem; background-color: green")

    .slide-content
      .scroll-content.flex(ref="sc")
        .flex-content
          .ds-icon-ow-lock
          h5.white 信游安全验证系统
          .input-container
            input
            .ds-icon-ow-input-clear
          h6.light-white.ft18 此验证系统可帮您辨别假冒域名，让您放心享受游戏乐趣！

          .ds-ow-button.oval.tall.x-large.light 立即验证

    .slide-footer.scroll-content.white(ref="sf") Copyright © 2017 Changbo Entertainment Inc 
        br
        | All right reserved

</template>
<script>
  import common from './common'
  export default {
    mixins: [common]
  }
</script>
<style lang="stylus" scoped>
  @import './var.stylus'
  .slide-page
    bg-gradient(-135deg, #4892eb, #a97afc)
    h3
    .ft18
      margin-bottom .8rem
    .input-container
      position relative
      padding 0 .6rem 0 PW 
      margin .5rem 0 .3rem 0
      background-color #fff
      radius()
      input
        font-size .4rem
        color #666
        width 5rem
        height .6rem
        line-height .6rem
        border none
      .ds-icon-ow-input-clear
        position absolute
        right 0
        top 0
        bottom 0
        width .6rem
        cursor pointer
</style>