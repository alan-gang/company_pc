<template lang="jade">
  .activity-page
    slot(name="cover")
    slot(name="movebar")
    slot(name="resize-x")
    slot(name="resize-y")
    slot(name="toolbar")
    .scroll-content.activity-center
      a.section
        h4 注册就送
        h5 全新的游戏体验
      a.section
        h4 注册就送
        h5 全新的游戏体验
      a.section
        h4 注册就送
        h5 全新的游戏体验
      a.section
        h4 注册就送
        h5 全新的游戏体验

    
</template>

<script>
  // import api from '../../http/api'
  export default {
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  .activity-center
    top TH
    padding PWX
    .section
      display inline-block
      // width 4.15rem
      width 50%
      // padding PW
      // border 1px solid #d4d4d4
      padding-top 1.5rem
      radius()
      cursor pointer
      &:hover
        background-color #fff
      
      h4,h5
        margin PW
  
</style>