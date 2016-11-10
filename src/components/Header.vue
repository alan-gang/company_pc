<template lang="jade">
  header
    .tab(v-for=" tab in tabs" v-bind:class="{active: tab.active}" @click.self="openTab(tab.url)") 
      | {{ tab.name }}
      i.el-icon-close( @click.stop="closeTab(tab.url)")


   
</template>

<script>
export default {

  props: {
    tabs: Array
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    openTab (url) {
      this.$emit('openTab', url)
    },
    closeTab (url) {
      this.$emit('closeTab', url)
    }
  },
  components: {
  }

}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  header
    background-color #bbb
  .tab
    float left
    line-height: HH - .02rem
    padding 0 .15rem
    margin 0 .05rem
    background-color: #ddd
    border 1px solid #ccc
    border-radius .05rem
    color #666
    box-sizing border-box
    &.active
      background-color #55b
      color #fff 
    >i
      margin-left: .15rem
      cursor pointer
  
</style>
