<template lang="jade">
  .login
    Logo
    router-view.part(v-on:update-user="setUser")
    DownLoad
    AllRights

</template>

<script>
import base from 'components/base'
import AllRights from 'components/AllRights'
import DownLoad from 'components/DownLoad'
import Logo from 'components/Logo'
export default {
  name: 'Login',
  mixins: [base],
  data () {
    return {
      // hasHeader: false,
      // hasFooter: false,
      notice: ''
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    Logo,
    DownLoad,
    AllRights
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../var.stylus'
  .login
    top 0
    bottom 0
    z-index 1
    font-shadow()
    .logo
      margin-top .85rem
    .part
      margin 0 auto
      margin-bottom .3rem
    .login-form
    .try-form
      max-width 3.5rem
      min-width 3.5rem
      
    .forget-form
      max-width 6rem
      min-width 6rem
    .all-rights
      @media screen and (max-height: 800px)
        position relative
      
    
</style>



