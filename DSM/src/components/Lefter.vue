<template lang="jade">
  .lefter.ds-gm-icon-logo
    Menus(:menus="menus").scroll-content
    Meinfo(:name="name" v-bind:money="money" v-bind:free="free" v-on:logout="logout")
</template>

<script>
import Menus from 'mycomponents/Menus'
import Meinfo from 'mycomponents/Meinfo'
export default {
  props: ['menus', 'name', 'money', 'free'],
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$emit('logout')
    }
  },
  components: {
    Menus,
    Meinfo
  }
}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  @import '../../../src/var.stylus'
  TH = 1rem
  .lefter
    background-color rgba(104,104,200, .15)
    .scroll-content
      top TH
      bottom BH
    
</style>
