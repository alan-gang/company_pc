<template lang="jade">
  .tool-bar
    i.el-icon-menu &nbsp;{{ title }}
    el-button-group
      el-button(v-bind:icon="starClass" @click="like")
      el-button(icon="minus" @click="minus")
      .el-button(@click="full")
        .full
      el-button(icon="close" @click="close")


</template>

<script>
export default {
  props: {
    title: String,
    star: Boolean
  },
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
  .tool-bar
    height TH
    line-height TH 
    background-color #fff
  
  i.el-icon-menu 
    padding-left .15rem
  
  .el-button-group
    float right
    height 100%
    .el-button
      border none
      height 100%
  
  .full
    display inline-block
    width .15rem
    height .1rem
    border .02rem solid #777
    position relative
    top .05rem

</style>
