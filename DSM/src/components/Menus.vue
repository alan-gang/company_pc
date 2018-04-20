<template lang="jade">
  el-menu(router=true @open="handleopen" @close="handleclose"  default-active=" '/me/2-1-1' ")

    el-submenu(v-for="(m, i) in menus" v-if="m.title && menus.length > 2" v-bind:index="m.class")
      template(slot="title")
        i(:class="[m.class + '-menu']")
        | {{ m.title }}
      el-menu-item-group(v-for="(g, ii) in m.groups" v-if="g.items.filter(function(x){return !x.removed})[0]")
        template(slot="title") {{ g.title }}
        el-menu-item(v-for="(item, iii) in g.items" v-bind:index=" '/' + m.url + '/' + item.id" v-if="!item.removed && item.id") {{ item.title }}

    div(v-for="(m, i) in menus"  v-if="menus.length < 3" v-bind:class=" [ menus[0].url ] ")
      .ds-button.full(style="display: none" v-bind:class="[ m.url + '-myicon' ]") {{ m.title }}
      el-menu-item-group(v-for="(g, ii) in m.groups" v-if="g.items.filter(function(x){return !x.removed})[0]")
          template(slot="title") {{ g.title }}
          el-menu-item.ds-button.full(v-for="(item, iii) in g.items" v-bind:index=" !item.fn ? '/' + m.url + '/' + item.id : '' " v-bind:class="[ item.class, {'is-active': defaultUrl === ('/' + m.url + '/' + item.id), 'notis-active': defaultUrl !== ('/' + m.url + '/' + item.id)} ]" @click=" item.fn && openTab(item) " v-if="!item.removed && item.id") {{ item.title }}

</template>

<script>
export default {
  props: ['menus'],
  methods: {
    handleopen () {
    },
    handleclose () {
    },
    defaultUrl: '',
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
      this.defaultUrl = path
    }
  }
}
</script>

<style lang="stylus" scoped>

  .el-menu-item.ds-button.full
    background none

</style>