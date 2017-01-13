<template lang="jade">
  transition(appear=true name="zoom" )
    .group-page
      slot(name="cover")
      slot(name="movebar")
      slot(name="resize-x")
      slot(name="resize-y")
      slot(name="toolbar")
      .user-list.scroll-content
        h1 很多用户
      
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../var.stylus'
  .user-list
    top TH
</style>