<template lang="jade">
    .page
      slot(name="cover")
      // slot(name="movebar")
      slot(name="resize-x")
      slot(name="resize-y")
      {{ page }}


</template>

<script>
import base from 'components/base'

export default {
  mixins: [base],
  props: ['page'],
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>


</style>



