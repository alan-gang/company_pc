<template lang="jade">
  el-menu(router=true @open="handleopen" @close="handleclose"  default-active="/me/2-1-1")
    el-submenu(v-for="(m, i) in menus" v-if="m.title" v-bind:index="m.class")
      template(slot="title")
        i(:class="[m.class + '-menu']")
        | {{ m.title }}
      el-menu-item-group(v-for="(g, ii) in m.groups")
        template(slot="title") {{ g.title }}
        el-menu-item(v-for="(item, iii) in g.items" v-bind:index=" '/' + m.url + '/' + item.id") {{ item.title }}

</template>

<script>
export default {
  props: ['menus'],
  methods: {
    handleopen () {
    },
    handleclose () {
    }
  }
}
</script>

<style lang="stylus">
</style>