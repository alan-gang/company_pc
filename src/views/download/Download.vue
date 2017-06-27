<template lang="jade">
  .activity-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.download-center
      el-row(v-for="d in downloads" v-bind:class=" [ d.class ] ")
        el-col(:span="6" style="padding: .1rem .1rem 0 0")
          p.title.text-black {{ d.title }}
          p.intro.text-999 {{ d.intro }}
        el-col.title(:span="18")
          .buttons
            .ds-button.tall.wide(:class="[ b.class ]" v-for="b in d.buttons") {{ b.title }}
              .before
              .after {{ b.title }}
              .qr(:style="b.style" v-if="b.style")




    
</template>
<script>
  import api from '../../http/api'
  export default {
    data () {
      return {
        downloads: [
          {
            title: '畅博平台',
            intro: '专注彩票游戏平台',
            class: 'ds-icon-download-logo',
            buttons: [
              {title: 'IOS下载', class: 'ds-icon-download-ios', style: {background: 'url(' + api.createCBqr + ') center top no-repeat', height: '1.96rem', textAlign: 'center', backgroundSize: 'cover'}},
              {title: 'Android下载', class: 'ds-icon-download-android'},
              {title: 'PC下载', class: 'ds-icon-download-windows primary'}
            ]
          },
          {
            title: '畅博安全验证器',
            intro: '保障用户帐户安全的神器',
            class: 'ds-icon-download-cbsafe',
            buttons: [
              {title: 'IOS下载', class: 'ds-icon-download-ios'},
              {title: 'Android下载', class: 'ds-icon-download-android'}
              // {title: 'PC下载', class: 'ds-icon-download-windows'}
            ]
          },
          {
            title: '客服系统',
            intro: '功能完善的客服聊天系统',
            class: 'ds-icon-download-chat',
            buttons: [
              {title: 'IOS下载', class: 'ds-icon-download-ios'}
              // {title: 'Android下载', class: 'ds-icon-download-android'}
              // {title: 'PC下载', class: 'ds-icon-download-windows'}
            ]
          }
        ]
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>


<style lang="stylus">
  
  #app.night
    .dialog-page
      .download-center
        .el-row:hover
          background-color #444
          

</style>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .qr
    position absolute
    top 100%
    left 0 
    width 100%
    height 1rem
    display none
    z-index 10
  .download-center
    top TH
    padding .1rem .3rem
    .el-row
      margin .15rem 0
      padding .3rem  1.15rem 
      padding-right .6rem
      radius()
      &:hover
        background-color #fff
        shadow(0 0 10px rgba(0, 0, 0, .2))
      .title
        font-size .18rem
      .ds-button
        margin .1rem
        padding-left .7rem
        .after
        .before
          padding-left .6rem
        &:hover
          .qr
            display block
      
          
      
    
</style>
