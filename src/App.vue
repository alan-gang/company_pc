<template lang="jade">

  div#app

    // header
    dsHeader(:tabs="tabs" v-on:openTab="openTab" v-on:closeTab="closeTab")
    
    // pages
    transition(name="fade")
      keep-alive
        router-view.scroll-content(:pages="tabs" v-on:closeTab="closeTab" v-on:openTab="openTab" v-on:updatePage="updatePage")


    // footer
    dsFooter(:games="games")

    

</template>

<script>
import dsHeader from './components/Header'
import dsFooter from './components/Footer'
import base from './components/base'
export default {
  mixins: [base],
  data () {
    return {
      games: [
        {id: 1, name: '广东时时彩', opened: false, active: false, size: '', star: false, numbers: [5, 8, 5, 6, 8], NPER: '150730053', FNPER: '502', PNPER: '518', timeout: '', url: 'one'},
        {id: 2, name: '狮子头', opened: false, active: false, size: '', star: false, numbers: [5, 8, 5, 6, 8], NPER: '150730053', FNPER: '502', PNPER: '518', timeout: '', url: 'two'},
        {id: 3, name: '螺蛳粉', opened: false, active: false, size: '', star: false, numbers: [5, 8, 5, 6, 8], NPER: '150730053', FNPER: '502', PNPER: '518', timeout: '', url: 'three'},
        {id: 4, name: '双皮奶', opened: false, active: false, size: '', star: false, numbers: [5, 8, 5, 6, 8], NPER: '150730053', FNPER: '502', PNPER: '518', timeout: '', url: 'four'},
        {id: 5, name: '蚵仔煎', opened: false, active: false, size: '', star: false, numbers: [5, 8, 5, 6, 8], NPER: '150730053', FNPER: '502', PNPER: '518', timeout: '', url: 'five'}
      ]
    }
  },
  computed: {
    tabs () {
      return this.games.filter(game => game.opened)
    }
  },
  created () {
    this.setPages(this.games)
  },
  methods: {
    openTab (url) {
      if (this.$route.params.url === url) !this.openPage(url) && this.$router.push('/')
      else this.$router.push('/games/' + url)
    },
    closeTab (url) {
      this.updatePage(url, {opened: false})
      this.$nextTick(() => {
        if (this.tabs.length === 0) this.$router.push('/')
      })
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
  html
    height 100%
    font-size 100px
    overflow hidden
    min-height: 600px
    min-width: 800px
  
  body
    height 100%
    font-size .14rem
    margin 0
    
  #app
    header
      position absolute
      top 0
      right: 0
      left: 0
      height HH
    footer
      position absolute
      bottom 0
      left 0
      right 0
      height FH
      background #efefef
    .scroll-content
      position absolute
      left 0
      right 0
      top HH
      bottom FH
      overflow-x hidden
      overflow-y auto
      background #aaa
  
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-active 
    opacity: 0
</style>
