<template lang="jade">
  section.ow
    // header
    transition(name="slide-up" appear=true)
      owHeader
    
    // pages
    // keep-alive
    transition(name="slide")
      router-view.scroll-content

    // footer
    transition(name="slide-down" appear=true)
      owFooter
</template>

<script>
import base from 'components/base'
import owHeader from 'components/ow/owHeader'
import owFooter from 'components/ow/owFooter'
export default {
  name: 'Ow',
  mixins: [base],
  data () {
    return {
      hasHeader: false,
      hasFooter: false
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
  },
  methods: {
  },
  components: {
    owHeader,
    owFooter
  }
}
</script>

<style lang="stylus">

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../../var.stylus'
  section.ow
    background #fff
</style>



