<template lang="jade">
  .tool-bar
    span.title {{ title }}
    el-button-group
      el-button(v-bind:icon="starClass" @click="like")
      .el-button(@click="minus")
        .el-icon-minus
      .el-button(@click="full")
        .full
      el-button(icon="close" @click="close")


</template>

<script>
export default {
  props: ['title', 'star'],
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
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  bg = #d8d8d8
  bg-hover = #ececec
  bg-active = #e2e2e2
  .tool-bar
    height TH
    line-height TH 
    background-color bg
    font-size .12rem
    border-top-right-radius .05rem
    border-top-left-radius .05rem
    overflow hidden
    background-position .2rem center
  .dialog-page.active
    .tool-bar
      background-color WHITE
  
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
      background-color transparent
      &:hover
        background-color bg-hover
      &:active
        background-color bg-active
      &:first-child
        font-size .16rem

  
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
