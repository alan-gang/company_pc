<template lang="jade">

  div#app

    // header
    transition(name="slide-up")
      dsHeader(:tabs="tabs" v-bind:likedTabs="likedTabs" v-on:open-tab="openTab" v-on:close-tab="closeTab" v-if="state.hasHeader && tabs.length > 0")
    
    // pages
    // keep-alive
    router-view.scroll-content.page(:pages="tabs" v-on:close-tab="closeTab" v-on:open-tab="openTab" v-on:set-menus="setMenus" v-bind:class="{ 'has-header': state.hasHeader, 'has-footer': state.hasFooter }")

    // footer
    transition(name="slide-down")
      dsFooter(:menus="menus" v-bind:name="state.user.name" v-bind:money="state.user.money" v-bind:free="state.user.free" v-on:open-page="openTab" v-if="state.hasFooter" v-on:logout="logout")

</template>

<script>
import util from './util'
import dsHeader from './components/Header'
import dsFooter from './components/Footer'
import base from './components/base'
import store from './store'
import cookie from 'js-cookie'
import api from './http/api'
export default {
  mixins: [base],
  data () {
    return {
      maxPages: 10,
      state: store.state,
      tabs: [],
      menus: []
    }
  },
  computed: {
    likedTabs () {
      return this.state.pages.filter(t => t.liked)
    },
    ctabs () {
      return this.state.pages.filter(t => {
        return t.opened
      })
    },
    prev () {
      return this.tabs.sort((a, b) => a.prev < b.prev)[0] || {id: '/'}
    }
  },
  watch: {
    menus () {
      this.setPages(this._getPages())
    },
    // tabs () {
    //   return this..filter(p => {
    //     console.log(p.opened, 2)
    //     return p.opened
    //   })
    // }
    'ctabs': {
      // deep: true,
      immediate: true,
      handler () {
        this.ctabs.forEach(tab => {
          if (!this.tabs.find(t => t.id === tab.id)) this.tabs.push(tab)
        })
        this.tabs = this.tabs.filter(t => t.opened)
      }
    }
  },
  created () {
  },
  methods: {
    _getPages () {
      return this.menus.reduce((p, m) => {
        m.groups = m.groups || []
        return m.groups.reduce((p, g) => {
          g.items = g.items || []
          if (g.items.length >= 8) g.items = util.groupArray(g.items, 4)
          return g.items.reduce((p, i) => {
            i = Object.assign({}, {
              opened: false,
              active: false,
              // pre activated
              prev: false,
              star: false,
              size: '',
              url: g.url || '',
              class: g.class || ''
            }, i)
            p.push(i)
            return p
          }, p)
        }, p)
      }, [])
    },
    openTab (url) {
      if (this.$route.params.url === url) !this.openPage(url) && this.$router.push('/')
      else this.openAnotherPage(url)
    },
    openAnotherPage (url) {
      if (this.tabs.length < this.maxPages || this.tabs.filter(t => t.id === url)[0]) this.$router.push('/games/' + url)
      else console.log('max opened page size is: ', this.maxPages)
    },
    closeTab (url) {
      this.updatePage(url, {opened: false})
      this.$nextTick(() => {
        // after close open the pre one
        this.$router.push(this.prev.id)
        // if (this.tabs.length === 0) this.$router.push('/')
        // else this.$router.back()
      })
    },
    setMenus (menus) {
      this.menus = menus
    },
    logout () {
      this.$http.post(api.logout)
      this.setUser()
      cookie.remove('JSESSIONID')
      this.$router.push('/login')
    }
  },
  components: {
    dsHeader,
    dsFooter
  }
}
</script>

<style lang="stylus">
  @import './var.stylus'
  @import './main.stylus'
  
  html
    height 100%
    font-size 100px
    overflow hidden
    min-height 600px
    min-width 800px
    font-family Arial, Helvetica, sans-serif, "微软雅黑"
    user-select none
  
  body
    height 100%
    font-size .14rem
    margin 0
    background url(./assets/bg.jpg) center center no-repeat
    background-size cover
  
  body:fullscreen #app > * {
    background url(./assets/bg.jpg) center center no-repeat
  }
  body:-webkit-full-screen #app > * {
    background url(./assets/bg.jpg) center center no-repeat
  }
  body:-moz-full-screen #app > * {
    background url(./assets/bg.jpg) center center no-repeat
  }
    
  header
    position absolute
    top 0
    right: 0
    left: 0
    height HH
    z-index 1
    & + .scroll-content
      top HH
  footer
    position absolute
    bottom 0
    left 0
    right 0
    min-width 8.5rem
    z-index 1
  .scroll-content
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    overflow-x hidden
    overflow-y auto
    -webkit-overflow-scrolling touch
    // &.has-header
    //   top HH
    &.has-footer
      bottom FH
      @media(max-width: 1362px)
        bottom 2*FH 
    
      

// define transition common timming function and time
[class*=-enter]
[class*=-leave]
  transition all linear .2s // @static 2

.zoom-enter-active, .zoom-leave-active
    opacity 0
    transform perspective(500px) translateZ(-5000px)
.slide-enter, .slide-leave-active
  transform translateX(100%)
.slide-up-enter, .slide-up-leave-active
  transform translateY(-100%)
.slide-down-enter, .slide-down-leave-active
  transform translateY(100%)
.slide-left-enter, .slide-left-leave-active
  transform translateX(-100%)
.fade-enter, .fade-leave-active
  transform opacity .5s

// define for main page
.page
  &[class*=-leave]
    // transition-delay .5s
.back
  // define for main page when back 
  &>.page
    &[class*=-leave]
      transition-delay 0s
      z-index 1
    &[class*=-enter]
      transform none

</style>
