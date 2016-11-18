<template lang="jade">
  footer
    el-row(:gutter="50")
      el-col.menu(:span="12" )
        el-dropdown(menu-align="start")
          span.el-dropdown-link 首页
            // i.el-icon-caret-top.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(v-for=" page in pages") {{page.name}}

        el-dropdown(menu-align="start" )
          span.el-dropdown-link 游戏
            // i.el-icon-caret-top.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(v-for=" (page, index) in pages " @click.native="openPage(page.url)") {{page.name}}
        el-dropdown(menu-align="start")
          span.el-dropdown-link 个人
            // i.el-icon-caret-top.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(v-for=" page in pages ") {{page.name}}
        el-dropdown(menu-align="start")
          span.el-dropdown-link 代理
            // i.el-icon-caret-top.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(v-for=" page in pages ") {{page.name}}

        el-dropdown(menu-align="start")
          span.el-dropdown-link 报表
            // i.el-icon-caret-top.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(v-for=" page in pages ") {{page.name}}

        el-dropdown(menu-align="start")
          span.el-dropdown-link 契约
            // i.el-icon-caret-top.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(v-for=" page in pages ") {{page.name}}

        el-dropdown(menu-align="start")
          span.el-dropdown-link 帮助
            // i.el-icon-caret-top.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(v-for=" page in pages ") {{page.name}}

      el-col.info(:span="12") infos
    h3
      i.logo DS GAMING
</template>

<script>
export default {
  props: ['pages'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    openPage (url) {
      this.$emit('openPage', url)
    }
  },
  components: {
  }

}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  footer
    line-height FH
  .el-row
    // position absolute
    // left 0
    // right 0
    // top 0
    z-index 1
    // margin 0
  h3
    position absolute
    top 0
    left 0
    right 0
    text-align center
    margin 0
    z-index 0
  .menu
    text-align left
    >*{
      padding 0 .1rem
    }
    
  .info
    text-align right
  
</style>
