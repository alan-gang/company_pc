<template lang="jade">
  header
    el-row.content-width
      el-col.l(:span="10")
    

      el-col.r(:span="14")
   

</template>

<script>
import store from '../store'
export default {
  data () {
    return {
      Me: store.state.user
    }
  } 
}
</script>

<style lang="stylus">
  @import '../var.stylus'
  @import '../path.stylus'
  header

</style>
