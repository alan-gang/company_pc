<template lang="jade">
  h1 {{ title }}
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        title: 'Hello'
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import './var.stylus'
</style>