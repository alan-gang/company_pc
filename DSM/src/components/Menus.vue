<template lang="jade">
  el-menu(router=true @open="handleopen" @close="handleclose"  v-bind:default-active="defaultUrl" v-bind:defaultOpeneds="defaultSubMenus"  unique-opened ref="M" v-if="menus[0]")
    template(v-if="menus.length > 1")
      el-submenu(v-for="(m, i) in menus" v-if="(m.title && m.url && menus.length > 1 || m.url === 'help') && !m.removed" v-bind:index="m.url")
        template(slot="title")
          i(:class="[m.class + '-menu']")
          | {{ m.stitle || m.title }}
        el-menu-item-group(v-for="(g, ii) in m.groups" v-if="g.items.filter(function(x){return !x.removed})[0]")
          template(slot="title") {{ g.title }}
          el-menu-item(style="margin: .05rem 0" v-for="(item, iii) in g.items" v-bind:class="[ item.class, {'is-active': defaultUrl === ('/' + m.url + '/' + item.id), 'notis-active': defaultUrl !== ('/' + m.url + '/' + item.id)} ]" v-bind:index=" '/' + m.url + '/' + item.id" v-if="!item.removed && item.id && !item.hide" ) {{ item.title }}
    template(v-else)
      div(v-for="(m, i) in menus"  v-if="menus.length < 2 && m.url !== 'help' " v-bind:class=" [ menus[0].url ] ")
        template(v-for="(g, ii) in m.groups")
          el-submenu(v-bind:index="g.url" v-if="g.items.length > 0" popper-class="game-menu" v-bind:ref="'subMenu'+(ii + 1)")
            .ds-button.full(style="display: none" v-bind:class="[ m.url + '-myicon' ]" v-bind:index="g.url") {{ m.title }}
            template(slot="title")
              i(:class="g.class")
              span{{ g.title }}
            el-menu-item-group(v-if="g.items.filter(function(x){return !x.removed})[0]")
                //- template(slot="title") {{ g.title }}
                el-menu-item.ds-button.full( v-for="(item, iii) in g.items" v-bind:index=" !item.fn ? '/' + m.url + '/' + item.id : '' "  v-bind:class="[ item.class, {'is-active': defaultUrl === ('/' + m.url + '/' + item.id), 'notis-active': defaultUrl !== ('/' + m.url + '/' + item.id)} ]" @click=" item.fn && openTab(item) " v-if="!item.removed && item.id && !item.hide" style="font-size: .12rem;") {{ item.title }}
</template>

<script>
export default {
  props: ['menus'],
  data () {
    return {
      defaultUrl: '/me/2-1-1',
      defaultMenuItem: '',
      defaultSubMenus: ['SSC']
    }
  },
  methods: {
    handleopen () {
    },
    handleclose () {
    },
    openTab (item) {
      // let fn = (this.pages.find(p => p.id === id && p.fn) || {}).fn
      this.defaultUrl = ''
      if (item.fn) return this.__setCall({fn: '__openWindowWithPost', args: item.fn})
      this.$emit('open-tab', item)
    },
    getUrlNameByMenuId (menuId) {
      let name = ''
      this.menus.forEach((menu, i) => {
        menu.groups.forEach((group, j) => {
          group.items.forEach((item, k) => {
            if (menuId === item.id) {
              // 彩票
              if (menu.url === 'game') {
                name = group.url
              } else {
                // 非彩票
                name = menu.url || group.url || group.innerurl || item.url
              }
              return
            }
          })
        })
      })
      return name
    }
  },
  computed: {
  },
  watch: {
    '$route' ({path}) {
      let b = this.defaultUrl
      this.defaultUrl = path
      if (!this.$route.params.url) {
        return
      }
      setTimeout(() => {
        let url = this.getUrlNameByMenuId(this.$route.params.url)
        this.defaultSubMenus = url ? [url] : this.defaultSubMenus
        // this.$refs.M && this.$refs.M.closeMenu && this.$refs.M.closeMenu(b.split('/')[1])
        // this.$refs.M && this.$refs.M.openMenu && this.$refs.M.openMenu(path.split('/')[1])
        // this.$forceUpdate()
      }, 300)
    }
  },
  mounted () {
    // console.log(this.$refs.M)
  },
  beforeDestroy () {
  }
}
</script>

<style lang="stylus" scoped>

  .el-menu-item.ds-button.full
    background none
</style>

<style lang="stylus">
  .el-menu 
    .el-submenu[popper-class="game-menu"]
      .el-submenu__title
        height 46px
        line-height 46px
        background linear-gradient(to bottom, #5d5d5d, #525252, #484848)
        color #fff
        for n, i in ssc g115 k3 other kl
          .icon-menu-{n}
            width 28px
            height 24px
            display inline-block
            background url('../assets/icon-'+n+'.png') no-repeat
            background-size 100%
      .el-icon-arrow-down:before
        width 10px
        height 6px
        display inline-block
        content ''
        background url('../assets/icon_leftnav_down.png') no-repeat
        background-size 100%
</style>
