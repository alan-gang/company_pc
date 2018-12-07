<template lang="jade">
  .activity-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.download-center
      .notice(style="margin: 0 0 .2rem 0")
        span.title 温馨提示：
        p.content
          | 如果遇到扫码失败或者被QQ、微信或支付宝屏蔽的情况，
          | 请复制下载链接
          span.text-blue(style="font-size: 14px")  http://x.xybets.com 
          | 至手机自带的浏览器中进行下载，给您带来的不便我们深感抱歉
      el-row(v-for="d in downloads" v-bind:class=" [ d.class ] ")
        el-col(:span="6" style="padding: .1rem .1rem 0 0")
          p.title.text-black {{ d.title }}
          p.intro.text-999 {{ d.intro }}
        el-col.title(:span="18")
          .buttons
            a(v-for="b in d.buttons" v-bind:href="b.download" target="_blank")
              .ds-button.tall.wide(:class="[ b.class ]") {{ b.title }}
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
            title: '信游娱乐',
            intro: '专注彩票游戏平台',
            class: 'ds-icon-download-logo',
            buttons: [
              {title: 'IOS下载', class: 'ds-icon-download-ios', style: {background: 'url(' + api.plat_ios + ') center top no-repeat', height: '1.96rem', textAlign: 'center', backgroundSize: 'cover'}},
              {title: 'Android下载', class: 'ds-icon-download-android', style: {background: 'url(' + api.plat_andr + ') center top no-repeat', height: '1.96rem', textAlign: 'center', backgroundSize: 'cover'}},
              {title: 'PC下载', class: 'ds-icon-download-windows primary', download: ''}
            ]
          },
          {
            title: '博盾验证器',
            intro: '保障用户帐户安全的神器',
            class: 'ds-icon-download-cbsafe',
            buttons: [
              {title: 'IOS下载', class: 'ds-icon-download-ios', style: {background: 'url(' + api.code_ios + ') center top no-repeat', height: '1.96rem', textAlign: 'center', backgroundSize: 'cover'}},
              {title: 'Android下载', class: 'ds-icon-download-android', style: {background: 'url(' + api.code_andr + ') center top no-repeat', height: '1.96rem', textAlign: 'center', backgroundSize: 'cover'}}
              // {title: 'PC下载', class: 'ds-icon-download-windows'}
            ]
          },
          {
            title: '客服系统',
            intro: '功能完善的客服聊天系统',
            class: 'ds-icon-download-chat',
            buttons: [
              {title: 'IOS下载', class: 'ds-icon-download-ios', style: {position: 'absolute', top: '-2rem', background: 'url(' + api.chat_ios + ') center top no-repeat', height: '1.96rem', textAlign: 'center', backgroundSize: 'cover'}}
              // {title: 'Android下载', class: 'ds-icon-download-android'}
              // {title: 'PC下载', class: 'ds-icon-download-windows'}
            ]
          }
        ]
      }
    },
    mounted () {
      if (this.platform === 'ds') {
        this.downloads[0].intro = '信誉品牌，值得您的拥有！'
        this.downloads[2].title = '易迅通'
        this.downloads[2].title = '最安全的客服聊天系统'
      }
      this.getWinClient()
    },
    methods: {
      // 二维码
      // http://192.168.169.161:8080/cagamesclient/help/download.do?method=getApp&type=plat_ios
      // plat_ios: '/help/download.do?method=getApp&type=plat_ios',
      // // http://192.168.169.161:8080/cagamesclient/help/download.do?method=getApp&type=plat_andr
      // plat_andr: '/help/download.do?method=getApp&type=plat_andr',
      // // http://192.168.169.161:8080/cagamesclient/help/download.do?method=getApp&type=code_ios
      // code_ios: '/help/download.do?method=getApp&type=code_ios',
      // // http://192.168.169.161:8080/cagamesclient/help/download.do?method=getApp&type=code_andr
      // code_andr: '/help/download.do?method=getApp&type=code_andr',
      // // http://192.168.169.161:8080/cagamesclient/help/download.do?method=getApp&type=chat_ios
      // chat_ios: '/help/download.do?method=getApp&type=chat_ios',
      // // win客户端下载
      // // http://192.168.169.161:8080/cagamesclient/help/download.do?method=getWinClient
      // getWinClient: '/help/download.do?method=getWinClient'
      getWinClient () {
        this.$http.get(api.getWinClient).then(({data}) => {
          // success
          if (data.success === 1) {
            this.downloads[0].buttons[2].download = data.cbClient
          } else {
          }
        }, (rep) => {
          // error
        })
      }
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
        position relative
        margin .1rem
        height .5rem
        width 1.68rem
        padding 0 0 0 .6rem
        text-align left
        line-height .5rem
        font-size .14rem
        .after
        .before
          padding-left .6rem
        &:hover
          .qr
            display block
    .notice
      font-size .12rem
      line-height .22rem
      margin 0 .2rem
      padding PWX
      background-color #fffde8
      border 1px solid #d5d09b
      radius()
      .content
        display inline-block
        margin 0
        // line-height .25rem
        vertical-align top
  
</style>

<style lang="stylus">
  @import '../../var.stylus'
  @import '../../path.stylus'
  #app.v2.cb
    .ds-icon-download-logo
      background url(../../assets/v2/mlogo.png) .3rem .3rem no-repeat
      &:hover
        background-color #fff
    


      
</style>
