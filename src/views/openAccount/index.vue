<template lang="jade">

.open-account
  slot(name="cover")
  slot(name="movebar")
  slot(name="resize-x")
  slot(name="resize-y")
  slot(name="toolbar")
  AddUser.scroll-content(v-if=" I === 0 ")
  AD.scroll-content(v-if=" I === 1 ")
  link_admin.scroll-content(v-if=" I === 2 ")

</template>

<script>
import AddUser from './AddUser'
import AD from './AD'
import link_admin from './link_admin.vue'
export default {
  components: {
    AddUser,
    AD,
    link_admin
  },
  name: 'open-account',
  props: [],
  data () {
    return {
      I: 0
    }
  },
  methods: {
    __setOpenAccountI (i) {
      this.I = i
    }
  }
}
</script>

<style lang="stylus">
// 建议不添加scoped， 所有样式最多嵌套2层
</style>
