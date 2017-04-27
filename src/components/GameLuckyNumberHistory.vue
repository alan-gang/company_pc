<template lang="jade">
  .game-luck-number-history.scroll-content(:class=" {empty: allLuckyNumbers.length === 0} ")
    <!-- 开奖信息 -->
    GameLuckyNumber(v-for="l in allLuckyNumbers.slice(1)" v-bind:game-type="gameType" v-bind:gameid = "gameid" v-bind:lucknumbers="l.code.split(',')" v-bind:NPER="l.issue" v-bind:onlyNumber="true")

</template>

<script>
import GameLuckyNumber from './GameLuckyNumber'
// import api from '../http/api'
export default {
  props: {
    gameid: Number,
    gameType: String,
    allLuckyNumbers: Array
  },
  data () {
    return {
      // data: []
    }
  },
  computed: {
  },
  mounted () {
    // this.__recentlyCode()
  },
  methods: {
    // 获得所有分页奖期信息
    // __recentlyCode () {
    //   this.$http.post(api.recentlyCode, {gameid: this.gameid, pageNum: 1, size: 30}).then(({data}) => {
    //     // success
    //     if (data.success > 0) {
    //       this.data = (data.items || []).slice(1)
    //     }
    //   }, (rep) => {
    //     // error
    //   })
    // }
  },
  components: {
    GameLuckyNumber
  }
}
</script>

<style lang="stylus" scoped>
  @import '../var.stylus'
  s = TH + LH
  .game-luck-number-history
    top TH + LH
    height 0
    transition all linear .2s
    max-width 9.3rem
    margin 0 auto
    overflow hidden
    z-index 1999
    &.show
      height "calc(100% - %s)" % s
      overflow auto
    &.empty
      display none
    
  
</style>
