<template lang="jade">
  span.icon-cross
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  .icon-cross {
    width 15px
    height 15px
    display flex
    justify-content center
    align-items center
    position relative
    line() {
      width 100%
      position absolute
      content ''
      display inline-block
      border-top solid 0.02rem #ffffff
    }
    &::before {
      line()
      transform rotate(45deg)
    }
    &::after {
      line()
      transform rotate(-45deg)
    }
  }
</style>
