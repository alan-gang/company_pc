<template lang="jade">
  section.menu.content-width
    el-popover(:ref="menu.url" v-for=" (menu, index) in menus" placement="top-start"  trigger="hover" v-bind:popper-class="'footer-popover menu ' + menu.url + ' ' + (menu.groups && menu.groups[0] ? true : false) " v-model="shows[index]" v-show="!menu.hide") 


          .icon-button.after-title(slot="reference" v-show="!menu.href && !menu.removed" v-on:mouseover="mouseover(menu)" @click="openChat(menu.url)" v-bind:mytitle=" menu.title ") {{ menu.title }}

          router-link.icon-button.after-title(:to="menu.href"   slot="reference" v-if="menu.href && !menu.removed" @click.native.stop="" v-bind:mytitle=" menu.title || menu.mytitle") {{ menu.title }}

          slot
            dl.submenu(v-if=" !menu.hideIcon && group.footer !== false && group.items.filter(function(x){return !x.removed})[0]" v-for="group in menu.groups" v-bind:class="[menu.url, group.url, {'with-icon': group.withIcon}]" v-bind:style="{ width: group.width }")
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
  .footer-popover
    transform: translateY(-0.12rem);
    radius(0)
    &.menu
      max-width auto
      transform: translateY(-0.12rem) translateX(-1.25rem)
      .popper__arrow
        transform: translateX(1.25rem)
      
    .submenu
    .submenu.game
      max-width 6.5rem
      width auto
      display block
      float none
      padding-left 1rem
      position relative
      dt
        position absolute
        left 0
        top .1rem
        padding  0
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
        width auto
        color #666
        margin: 0 0 0.1rem -0.1rem;
      .ds-button.card
      dd:not(.inner-submenu) .ds-button.card
        position relative
        radius(0)
        color #333
        background-color #fff
        margin 0 .1rem
        &:hover
          background-color #e8f6ff
          shadow(3px 3px 5px #aaa)
        &.sign:after
          display inline-block
          content '热'
          position absolute
          right -.1rem
          top -.1rem
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
          

</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  @import '../path.stylus'
  section.menu
    box-sizing border-box
    height FH
    padding-left 2.6rem
    background url(../assets/v2/logo.png) left center  no-repeat 
    .icon-button
      position relative
      display inline-block
      width FH
      height FH
      line-height FH
      color #fff
      vertical-align middle
      text-align center
      cursor pointer
      &:hover
        background-color rgba(0, 0, 0, .1)
      

    
</style>
