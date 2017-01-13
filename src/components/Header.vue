<template lang="jade">
  header.font-light
    .tab(v-for=" tab in tabs" v-bind:class="[{active: tab.active}, 'ds-icon-game-small']" @click.self="openTab(tab.id)") 
      | {{ tab.title }}
      i.el-icon-close( @click.stop="closeTab(tab.id)")
    
    el-popover(ref="collect" placement="bottom-end" offset="0" trigger="hover" v-model="show" v-bind:popper-class="'collect ' + (likedTabs.length > 0 ? true : false)")
      dl.submenu.font-white
        dd(v-for="i in likedTabs" v-bind:class="['ds-icon-game-small']") {{ i.title }}
          i.el-icon-delete2
    .tab.my-collect.el-icon-star-on(v-popover:collect="collect") 
      | 我的收藏
      
    

   
</template>

<script>
export default {

  props: {
    tabs: Array,
    likedTabs: Array
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
  },
  methods: {
    openTab (url) {
      this.$emit('open-tab', url)
    },
    closeTab (url) {
      this.$emit('close-tab', url)
    }
  },
  components: {
  }

}
</script>
<style lang="stylus">
  @import '../var.stylus'
  H = .3rem
  .el-popover.collect
    font-size .12rem
    transform translateX(.05rem) translateY(-.12rem)
    padding PW 0
    min-width 1.6rem
    radius(0)
    dd[class*=ds-icon-]
      padding 0 PW
      padding-left 2 * PW + .05rem
      background-position PW center
      line-height H
      cursor pointer
      &:hover
        color BLUE
      i
        color LIGHT
        float right
        line-height H
        cursor pointer
        &:hover
          color RED
</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  header
    font-size .12rem
    background-color rgba(255, 255, 255, .1)
  .tab
    float left
    min-width 1.6rem
    line-height: HH
    padding-left .3rem
    box-sizing border-box
    background-color rgba(0,0,0,.4)
    font-shadow()
    cursor pointer
    &[class*=ds-icon-]
      background-position .1rem center
    &:hover
      color WHITE
      background-color rgba(0,0,0,.6)
    &:active
    &.active
      background-color BLUE
      color WHITE 
    >i
      color LIGHT
      float right
      transform perspective(500px) translateZ(-150px)
      &:hover
        color WHITE
      line-height: HH
      font-size .1rem
      text-shadow none
      margin: 0 .1rem
  
  &.my-collect
    position absolute
    right 0
    &:before
      font-size .16rem
      line-height .16rem

  
</style>
