<template lang="jade">
  .order-and-follow
    slot(name="toolbar")
    .scroll-content
      .form-filters.t_c
        .ds-button-group
          .ds-button.x-small.text-button(:class=" { selected: type === 0 } " @click=" type = 0 " ) 投注记录
          .ds-button.x-small.text-button(:class=" { selected: type === 1 } " @click=" type = 1 " ) 追号记录
      
      Order.pip(v-if="type === 0" v-bind:menus="menus" v-bind:useSource="2")
      Follow.pip(v-if="type === 1" v-bind:menus="menus" v-bind:useSource="2")

</template>

<script>
  import Order from './Order'
  import Follow from './Follow'
  export default {
    components: {
      Order,
      Follow
    },
    name: 'order-and-follow',
    props: ['menus'],
    data () {
      return {
        type: 0
      }
    }
  }
</script>

<style lang="stylus">
  .order-and-follow
    .pip > .scroll-content
      position relative
    
</style>
