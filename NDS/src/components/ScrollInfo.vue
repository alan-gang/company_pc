<template lang="jade">
  .scroll-info.text-666
    .text-blue.text-bold 中奖公告：
    span(v-for=" (msg, ii) in msgs " v-show="ii === j")
      | {{ msg.cnName }} ({{ msg.issue }}) 期 
      span.userName.font-blue {{ msg.nickName }}
      |  喜中 
      span.money.font-danger {{ msg.amount }}
      |  元

   
</template>

<script>
import api from 'src/http/api'
export default {
  data () {
    return {
      msgs: []
    }
  },
  computed: {
  },
  methods: {
    // 10、中奖公告   ALL
    rewardNotices () {
      this.$http.get(api.rewardNotices).then(({data}) => {
        // success
        if (data.success) {
          this.msgs = data.rewardNotices || []
        }
      }, (rep) => {
        // error
      })
    }
  },
  components: {
  }

}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  .scroll-info
    height .32rem
    line-height .32rem
    padding 0 PW
    background #fff
    &.has-lefter
      padding 0 PW
      
  
</style>
