<template lang="jade">
  .tool-bar
    span.title {{ title }}
    el-button-group
      .el-button.ds-icon-volume(:class=" { off: !volume } " @click="v")
      el-button.my-star(v-bind:icon="starClass" @click.stop="like" v-if="menuid")
      .el-button(@click.stop="minus")
        .el-icon-minus
      .el-button(@click="full")
        .full
      el-button.close(icon="close" @click.stop="close")


</template>

<script>
export default {
  props: ['title', 'star', 'menuid', 'volume'],
  data () {
    return {
    }
  },
  computed: {
    starClass () {
      return 'star-' + (this.star ? 'on' : 'off')
    }
  },
  methods: {
    full () {
      this.$emit('full')
    },
    minus () {
      this.$emit('minus')
    },
    like () {
      this.$emit('star')
    },
    close () {
      this.$emit('close')
    },
    v () {
      this.$emit('volume')
    }
  },
  components: {
  }
}
</script>
<style lang="stylus">
  .dialog-page:not(.game-page) .tool-bar .ds-icon-volume
    display none
  .dialog-page.game-page .move-bar
     right 1.75rem
</style>

<style lang="stylus" scoped>
  @import '../var.stylus'
  bg = #d8d8d8
  bg-hover = #ececec
  bg-active = #e2e2e2
  .tool-bar
    user-select none
    height TH
    line-height TH 
    background-color bg
    font-size .12rem
    border-top-right-radius .05rem
    border-top-left-radius .05rem
    overflow hidden
    background-position .2rem center
  
  
  .title
    color #333
    font-weight bold
    padding-left .41rem
  
  .el-button-group
    float right
    height 100%
    .el-button
      font-size .12rem
      color GREY
      border none
      height 100%
      width TH
      padding 0
      radius(0)
      cursor default
      background-color transparent
      &:hover
        background-color bg-hover
      &:active
        background-color bg-active
      &:first-child
        font-size .16rem
      &.close
        &:hover
          background-color #f34
          color #fff
        &:active
          color #fff
          background-color #d40c1d

  
  .el-icon-minus
    position relative
    top .16rem
  .full
    display inline-block
    width .12rem
    height .08rem
    border .02rem solid GREY
    position relative
    top .12rem

</style>
