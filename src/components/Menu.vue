<template lang="jade">
  section.menu.content-width
    el-popover(:ref="menu.url" v-for=" (menu, index) in menus" placement="top-start"  trigger="hover" v-bind:popper-class="'footer-popover menu ' + menu.url + ' ' + (menu.groups && menu.groups[0] || menu.info ? true : false) " v-model="shows[index]" v-show="!menu.hide") 


          .icon-button.after-title(slot="reference" v-show="!menu.href && !menu.removed" v-on:mouseover="mouseover(menu)" @click="openChat(menu.url)" v-bind:mytitle=" menu.title ") {{ menu.title }}
            .el-icon--right.el-icon-arrow-down(style="font-size: 10px; color: rgba(255,255,255,.5)")
            

          router-link.icon-button.after-title(:to="menu.href"   slot="reference" v-if="menu.href && !menu.removed" @click.native.stop="" v-bind:mytitle=" menu.title || menu.mytitle") {{ menu.title }}


          slot
            .info(v-if=" menu.big " v-bind:class=" [ menu.info.class ] ")
              h3 {{ menu.info.title }}
              h4 {{ menu.info.descrb }}
              .ds-button.primary(@click="open(menu.info)") 点击进入

            dl.submenu(v-if=" !menu.hideIcon && group.footer !== false && group.items.filter(function(x){return !x.removed})[0]" v-for="group in menu.groups" v-bind:class="[menu.url, group.url, {notitile: !group.title, 'with-icon': group.withIcon}]" v-bind:style="{ width: group.width }")
              dt
                span.title(v-if="group.title && group.items.filter(function(x){return !x.removed})[0]")  {{ group.title }}

              dd(v-for="item in group.items"  @click="open(item, index)" v-if="item.title && !item.removed && !item.hide") 

                .ds-button.card(style="position: relative; " v-bind:class="[item.class]") {{ item.title }} 
                
                // .game-title(style="position: absolute;  width: 100%; font-size: .14rem; color: #9897b2" v-if=" menu.url === 'game' ") 
                  span.text-gold {{ item.pretitle }}
                  | {{ item.title }}

</template>

<script>
// import store from '../store'
// import api from '../http/api'
export default {
  props: ['menus'],
  data () {
    return {
      // Me: store.state.user,
      shows: {}
    }
  },
  watch: {
  },
  mounted () {
    this.initShows()
  },
  methods: {
    initShows () {
      this.shows = this.menus.reduce((p, m, i) => {
        p[i] = false
        return p
      }, {})
    },
    mouseover (menu) {
      if (menu.url === 'game') {
        menu.hideIconOnHover = menu.hideIcon
        this.__setCall({
          fn: '__guideStep'
        })
      }
    },
    openChat (url) {
      if (url === 'chat') {
        window.accessAngular.open()
      }
    },
    __openThirdPart (item) {
      this.open(item)
    },
    open (item, index) {
      this.__setCall({
        fn: '__closeGuide'
      })
      // this.$nextTick(() => {
      //   this.shows[index] = false
      //   this.openPage(item.id)
      // })
      if (item.id) {
        if (item.fn) {
          return this.__setCall({fn: '__openWindowWithPost', args: item.fn})
          // return this.openWindowWithPost(this.formData[item.fn] || {})
        } else {
          setTimeout(() => {
            this.shows[index] = false
            this.openPage(item.id)
          }, 0)
        }
      }
    },
    openPage (url) {
      this.$emit('open-page', url)
    }
  }
}
</script>

<style lang="stylus">
  @import '../var.stylus'
 
body.cb.v2
  .footer-popover
    padding PW
    transform: translateY(-0.12rem);
    radius(0)
    &.menu
      max-width auto
      transform: translateY(-0.12rem) translateX(-1.25rem)
      .popper__arrow
        transform: translateX(1.25rem)
      
      
    .submenu.me
    .submenu.help
      max-width 4.2rem
    .submenu
    .submenu.game
      // margin .1rem 0
      margin-top .1rem
      margin-bottom .1rem
      &.SSC
        margin-top 0
        margin-bottom 0
      max-width 5.5rem
      margin-right 0
      width auto
      display block
      float none
      padding-left 1.2rem
      position relative
      dt
        position absolute
        left 0
        top .1rem
        padding  0
        font-size .14rem
        span:after
          display none
        .title
          background none
          color #333
          shadow(none)
          text-shadow none
          font-weight bold
      dd
        display inline-block
        float none
        background none
        height auto
        width 1.35rem
        height .3rem
        color #666
        margin: 0 0 0.05rem -0.02rem;
        font-size .14rem
        transform none
      .ds-button.card
      dd:not(.inner-submenu) .ds-button.card
        position relative
        radius(0)
        color #333
        background-color #fff
        margin 0 .03rem
        width 1.3rem
        height .3rem
        &:hover
          background-color #e8f6ff
          // shadow(3px 3px 5px #aaa)
        &.sign:after
          display inline-block
          content '热'
          position absolute
          right .02rem
          top .06rem
          left auto !important
          bottom auto !important
          color #fff
          width .2rem
          height .2rem
          line-height .2rem
          background DANGER
          radius(50%)
        &.sign.new:after
          content '新'
          background BLUE
    .submenu.game
      dt
        display none

      background url(../assets/v2/nav_icon_qt.png) 0 center no-repeat
    
      &.SSC
        background url(../assets/v2/nav_icon_ssc.png) 0 center no-repeat
        & + .SSC
          background none
      &.G115
        background url(../assets/v2/nav_icon_115.png) 0 center no-repeat

      &.K3
        background url(../assets/v2/nav_icon_ks.png) 0 center no-repeat

      &.VR
        background url(../assets/v2/nav_icon_vr.png) 0 center no-repeat

  
  .footer-popover
    .info
      padding 2*PW
      padding-left 2rem
      text-align right
      line-height .45rem
      h4
        color #999
    
    .ds-icon-game-bg1
      background url(../assets/v2/001.png) .2rem center no-repeat
    .ds-icon-game-bg2
      background url(../assets/v2/003.png) .2rem center no-repeat
    .ds-icon-game-bg3
      background url(../assets/v2/002.png) .2rem center no-repeat
</style>

<style lang="stylus">
  .new-header .menu .icon-button
    padding 0 .1rem !important
</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  @import '../path.stylus'
  section.menu
    box-sizing border-box
    height FH
    // padding-left 3.8rem
    text-align right
    background url(../assets/v2/logo.png) left center  no-repeat 

    .icon-button
      position relative
      display inline-block
      padding 0 .2rem

      height FH
      line-height FH
      color #fff
      vertical-align middle
      text-align center
      cursor pointer
      &:hover
        background-color rgba(0, 0, 0, .1)
      
  #app.cb.v2 .new-header section.menu
    display inline
    background none
    .icon-button
      height .36rem
      line-height .36rem

    
</style>
