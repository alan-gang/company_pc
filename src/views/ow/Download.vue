<template lang="jade">
  .slide-page.scroll-content
    .slide-header.white.flex(ref="sh")
      .flex-content
        h3 多屏幕畅玩体验
        h6 support multi-screen experience
        img(src="./assets/anywhere.png")
    .slide-content
      .scroll-content.flex(ref="sc")
        .flex-content
          .card
            .icon.ds-icon-ow-download-windows
            .ds-ow-button.oval.grey-border 客户端下载
          .card
            .icon.ds-icon-ow-download-iphone
            .ds-ow-button.oval.grey-border Iphone下载
          .card
            .icon.ds-icon-ow-download-android
            .ds-ow-button.oval.grey-border Andriod下载

    .slide-footer.scroll-content(ref="sf") Copyright © 2017 Changbo Entertainment Inc 
        br
        | All right reserved        
</template>

<script>
import common from './common'
export default {
  mixins: [common]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import './var.stylus'
  .slide-page
    .slide-header
      .flex-content
        padding-top .8rem
      bg-gradient(90deg, #1a9ff3, #8f84ff)
      img
        position relative
        left -10%
        margin .8rem 0 .3rem

      
        
</style>



