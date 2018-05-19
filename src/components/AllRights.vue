<template lang="jade">
    .all-rights 
      DownLoad
      | 版权所有 COPYRIGHT © 2015 信游娱乐 ALL RIGHTS RESERVED
</template>
<script>
import DownLoad from 'components/DownLoad'
export default {
  components: {
    DownLoad
  }
}
</script>
<style lang="stylus">
  @import '../var.stylus'
  .all-rights
    position absolute
    bottom 0
    left 0
    right 0
    height ARH + 1rem
    line-height ARH
    margin 0
    // margin-top ARH
    text-align center
    color GREY
    font-size .12rem
</style>
