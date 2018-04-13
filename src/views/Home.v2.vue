<template lang="jade">
  section.home
    
    CopyRight


    Guide(v-if="me.guide")
    
    keep-alive
      transition(name="fade" appear=true)
        router-view.scroll-content.page(:pages="pages" v-bind:prehref="prehref" v-bind:loop="loop" v-bind:maxPages="maxPages" v-bind:transition="transition" v-bind:free="free" v-bind:money="money" v-on:close-tab="closeTab" v-on:open-tab="openTab" )


</template>

<script>
import base from 'components/base'
// import api from '../http/api'
import store from '../store'
import Guide from './Guide'
import Pages from './Pages'
import CopyRight from 'components/CopyRight'
export default {
  name: 'Home',
  mixins: [base],
  props: ['menus', 'pages', 'prehref', 'loop', 'maxPages', 'transition', 'free', 'money'],
  data () {
    return {
      me: store.state.user
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    openTab (url) {
      this.$emit('open-tab', url)
    },
    closeTab (url) {
      this.$emit('close-tab', url)
    }
  },
  components: {
    Guide,
    Pages,
    CopyRight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  
    
</style>



