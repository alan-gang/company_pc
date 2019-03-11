<template lang="jade">
  el-menu(router=true @open="handleopen" @close="handleclose"  default-active=" '/me/2-1-1' " unique-opened ref="M" v-if="menus[0]")

    el-submenu(v-for="(m, i) in menus" v-if="(m.title && m.url && menus.length > 1 || m.url === 'help') && !m.removed" v-bind:index="m.url")
      template(slot="title")
        i(:class="[m.class + '-menu']")
        | {{ m.stitle || m.title }}
      el-menu-item-group(v-for="(g, ii) in m.groups" v-if="g.items.filter(function(x){return !x.removed})[0]")
        template(slot="title") {{ g.title }}
        el-menu-item(style="margin: .05rem 0" v-for="(item, iii) in g.items" v-bind:class="[ item.class, {'is-active': defaultUrl === ('/' + m.url + '/' + item.id), 'notis-active': defaultUrl !== ('/' + m.url + '/' + item.id)} ]" v-bind:index=" '/' + m.url + '/' + item.id" v-if="!item.removed && item.id && !item.hide") {{ item.title }}

    div(v-for="(m, i) in menus"  v-if="menus.length < 2 && m.url !== 'help' " v-bind:class=" [ menus[0].url ] ")
      .ds-button.full(style="display: none" v-bind:class="[ m.url + '-myicon' ]") {{ m.title }}
      el-menu-item-group(v-for="(g, ii) in m.groups" v-if="g.items.filter(function(x){return !x.removed})[0]")
          template(slot="title") {{ g.title }}
          el-menu-item.ds-button.full( v-for="(item, iii) in g.items" v-bind:index=" !item.fn ? '/' + m.url + '/' + item.id : '' " v-bind:class="[ item.class, {'is-active': defaultUrl === ('/' + m.url + '/' + item.id), 'notis-active': defaultUrl !== ('/' + m.url + '/' + item.id)} ]" @click=" item.fn && openTab(item) " v-if="!item.removed && item.id && !item.hide" style="font-size: .12rem;") {{ item.title }}{{  item.subTitle}}

</template>

<script>
export default {
  props: ['menus'],
  data () {
    return {
      defaultUrl: ''
    }
  },
  methods: {
    handleopen () {
    },
    handleclose () {
    },
    openTab (item) {
      // let fn = (this.pages.find(p => p.id === id && p.fn) || {}).fn
      if (item.fn) return this.__setCall({fn: '__openWindowWithPost', args: item.fn})
      this.$emit('open-tab', item)
    }
  },
  computed: {
  },
  watch: {
    '$route' ({path}) {
      // console.log(path, '...', this.defaultUrl)
      let b = this.defaultUrl
      this.defaultUrl = path
      setTimeout(() => {
        this.$refs.M.closeMenu(b.split('/')[1])
        this.$refs.M.openMenu(path.split('/')[1])
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